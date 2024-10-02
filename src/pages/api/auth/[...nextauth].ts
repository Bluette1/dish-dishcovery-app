// pages/api/auth/[...nextauth].ts
import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

interface Session extends DefaultSession {
  user: User;
}

const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not ok", responseData);
    }

    return responseData;
  } catch (error) {
    console.error("Error logging in user", error);
    return null;
  }
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        try {
          const user: User | null = await login(email, password);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: "openid email profile",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      // Persist the user to the token right after signin
      if (account && user) {
        token.user = user;

        if (account.id_token) {
          //Google signin
          // Create the user on the backend
          token.id_token = account.id_token;
          token.accessToken = account.access_token;
          const { email, name } = user;

          const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name }),
          });

          const responseData = await response.json();

          if (!response.ok) {
            throw new Error("Network response was not ok", responseData);
          }

          //Override user with this user data
          token.user = { user: responseData, token: account.id_token };
          try {
          } catch (error) {
            console.error("Error creating new user", error);
          }
        }
      }
      if (trigger === "update" && session) {
        token.user = session.user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
  },
});
