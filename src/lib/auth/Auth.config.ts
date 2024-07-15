import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  debug: true,
  providers: [
    Google,
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Email",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // Does user exist?

        // If not - create user, create verification token, send email

        console.log("creds: ", credentials);

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/api/auth/onboard",
    error: "/auth/sign-in",
  },
} satisfies NextAuthConfig;
