import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Google client ID or secret.");
    }

    if (!token.refreshToken) {
      throw new Error("Missing a refresh token.");
    }

    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      idToken: refreshedTokens.id_token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
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
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: "openid email profile",
        },
      },
    }),
  ],
  session: {
    maxAge: 1 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      // Persist the user to the token right after signin
      if (account && user) {
        token.user = user;

        if (account.id_token) {
          //Google signin
          // Create the user on the backend
          token.idToken = account.id_token;
          token.accessToken = account.access_token;

          token.accessTokenExpires = account.expires_at
            ? account.expires_at * 1000 // Convert to milliseconds
            : undefined;
          token.refreshToken = account.refresh_token;

          const { email, name } = user;

          const response = await fetch(`${BASE_URL}/users`, {
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

      // Check if the token has expired, and refresh it if necessary
      if (token.accessTokenExpires && Date.now() >= token.accessTokenExpires) {
        token = await refreshAccessToken(token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
});
