import { Order, Where } from "../Repository";
import { UserDto } from "./User";
import { SessionDto } from "@/domain/Auth/Session";

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
  getUsers(options?: GetUserOptions): Promise<UserDto[]>;
  getSession(sessionToken: string): Promise<SessionDto | null>;
  getUser(options: GetUserOptions): Promise<UserDto>;
  // createUser(options: CreateUserOptions): Promise<UserDto>;
}
