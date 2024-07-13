import { Order, Where } from "../Repository";
import { UserDto } from "./User";

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

export interface IUserRepository {
  getUsers(options?: GetUserOptions): Promise<UserDto[]>;
}
