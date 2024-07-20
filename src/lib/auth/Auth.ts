import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { ServiceFactory } from "../ServiceFactory";
import prisma from "../prisma/Prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/api/auth/onboard",
    error: "/auth/sign-in",
  },
  callbacks: {
    async session(params) {
      const userService = ServiceFactory.buildUserService();

      const user = await userService.getUser(params.user.id);
      const role = await userService.getRole(user.id);

      return { ...params.session, user: user, role: role } satisfies Session;
    },
  },
  providers: [
    Google,
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Email",
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     email: {},
    //     password: {},
    //     signUp: {},
    //   },
    //   async authorize(credentials, req) {
    //     // Does user exist?
    //     if (!credentials.email || !credentials.password) {
    //       console.log("No cred");
    //       throw Error("Something went wrong");
    //     }
    //     const authService = ServiceFactory.buildAuthService();

    //     const hashedPassword = await authService.hashPassword(
    //       credentials.password as string,
    //     );

    //     console.log(credentials.signUp);
    //     if (credentials.signUp) {
    //       console.log("No user, creating noe");
    //       const creatdUser = await authService.createUser({
    //         email: credentials.email as string,
    //         password: hashedPassword,
    //       });

    //       return creatdUser;
    //     }

    //     const user = await authService.getUserByEmail(
    //       credentials.email as string,
    //     );

    //     if (!user) {
    //       console.log("No user");
    //       return null;
    //     }

    //     if (!user?.password) {
    //       console.log("No password");
    //       return null;
    //     }

    //     const isValid = await authService.validatePassword(
    //       user.password,
    //       hashedPassword,
    //     );

    //     if (isValid) {
    //       console.log("Not valid");
    //       return user;
    //     } else {
    //       console.log("Valid");
    //       return null;
    //     }
    //   },
    // }),
  ],
});
