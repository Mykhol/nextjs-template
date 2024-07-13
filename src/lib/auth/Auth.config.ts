import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  debug: true,
  providers: [Google],
  pages: {
    signIn: "/auth/sign-in",
  },
} satisfies NextAuthConfig;
