import NextAuth from "next-auth";

// Extend the user and session interfaces
declare module "next-auth" {
  interface User {
    user: { id: string; name: string; email: string; role: string };
    token: string;
  }

  interface Session {
    user: User;
  }
}

// Extend the JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
