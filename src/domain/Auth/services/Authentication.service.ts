import prisma from "@/lib/prisma/Prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { UserDto } from "../../User/models/User";
import { IUserRepository } from "../../User/interfaces/UserRepository.interface";

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

/**
 * Handles the authentication of users within the platform
 */
export class AuthenticationService {
  constructor(private userRepository: IUserRepository) {}

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.userRepository.getUser({ where: { email: email } });

    if (!user) {
      console.log("No user found");
      return null;
    }

    console.log(user);

    const storedPassword = await this.userRepository.getPassword(user.id);

    if (!storedPassword) {
      console.log("No password found");
      return null;
    }

    const validatedPassword = await this.validatePassword(
      password,
      storedPassword,
    );

    console.log("Valid password ", validatedPassword);

    if (validatedPassword) {
      return user;
    } else {
      return null;
    }
  }

  async validateSession(sessionToken: string): Promise<UserDto> {
    const session = await this.userRepository.getSession(sessionToken);

    if (!session) {
      throw new AuthenticationError("Could not authenticate user");
    }

    if (session.expires > new Date()) {
      throw new AuthenticationError("The users session is expired");
    }

    return await this.userRepository.getUser({
      where: { id: session.userId },
    });
  }

  /**
   * Hashes the provided password
   * @param password
   * @returns
   */
  async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  /**
   * Validates a password with the comparing hash
   * @param password
   * @param hash
   * @returns
   */
  async validatePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * Creates a user in the database
   * @param newUser
   * @returns
   */
  async createUser(newUser: {
    name?: string;
    email: string;
    password?: string;
  }): Promise<UserDto> {
    const adapter = PrismaAdapter(prisma);

    return await this.userRepository.createUser(newUser);
  }
}
