import { Order, Where } from "../../Repository";
import { User, UserDto } from "../models/User";
import { SessionDto } from "@/domain/Auth/models/Session";

/**
 * Options for searching for users
 */
export interface GetUserOptions {
  where?: {
    id?: Where<string>;
    name?: Where<string>;
    email?: Where<string>;
    OR?: (
      | { id?: Where<string> }
      | { name?: Where<string> }
      | { email?: Where<string> }
    )[];
  };
  order?: {
    name?: Order;
  };
  skip?: number;
  take?: number;
}

export interface CreateUserOptions {
  email: string;
  name?: string;
  password?: string;
}

export interface IUserRepository {
  getUsers(options?: GetUserOptions): Promise<User[]>;
  getSession(sessionToken: string): Promise<SessionDto | null>;
  getUser(options: GetUserOptions): Promise<User>;
  // createUser(options: CreateUserOptions): Promise<UserDto>;
}
