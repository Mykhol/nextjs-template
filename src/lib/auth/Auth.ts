import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { ServiceFactory } from "../ServiceFactory";
import prisma from "../prisma/Prisma";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth((req) => ({
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/api/auth/onboard",
    error: "/auth/sign-in",
  },
  callbacks: {
    async signIn(params) {
      console.log(params);
      console.log("Request signIn ", req);

      const user = params.user;

      if (user.id) {
        const adapter = PrismaAdapter(prisma);
        const session =
          adapter.createSession &&
          (await adapter.createSession({
            userId: user.id,
            expires: new Date(new Date().valueOf() + 60 * 60 * 1000 * 24 * 30),
            sessionToken: randomUUID(),
          }));

        console.log("session ", session);

        if (!session) {
          return false;
        }

        cookies().set("authjs.session-token", session.sessionToken, {
          httpOnly: true,
        });

        return "/account";
      }

      return true;
    },
    async session(params) {
      const userService = ServiceFactory.buildUserService();

      const user = await userService.getUser(params.user.id);
      const role = await userService.getRole(user.id);

      return { ...params.session, user: user, role: role } satisfies Session;
    },
  },
  providers: [
    Google,
    CredentialsProvider({
      id: "creds",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Email",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
        signUp: {},
      },
      async authorize(credentials, req) {
        // Does user exist?
        if (!credentials.email || !credentials.password) {
          console.log("No cred");
          throw Error("Something went wrong");
        }
        const authService = ServiceFactory.buildAuthenticationService();

        const hashedPassword = await authService.hashPassword(
          credentials.password as strin,
        );

        console.log("signup: ", credentials.signUp);
        // If this is a signup, create the new user
        if (credentials.signUp) {
          console.log("No user, creating noe");
          return await authService.createUser({
            email: credentials.email as string,
            password: hashedPassword,
          });
        }

        try {
          // If this is not a sign up, validate the credentials
          const user = await authService.validateCredentials(
            credentials.email as string,
            credentials.password as strin,
          );

          console.log("user ", user);

          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
}));
