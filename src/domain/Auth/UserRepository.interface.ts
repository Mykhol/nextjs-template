import { Or } from "@prisma/client/runtime/library";
import { UserDto } from "./User";
import { Order, Where } from "@/lib/Repository";

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
