import { Order, Where } from "@/lib/Repository";
import { UserDto } from "./User";

/**
 * Options for searching for users
 */
export interface GetUserOptions {
  where: {
    id?: Where<string>;
    name?: Where<string>;
  };
  order: {
    name?: Order;
  };
}

export interface IUserRepository {
  getUsers(options?: GetUserOptions): Promise<UserDto[]>;
}
