import { PrismaRepository } from "@/lib/PrismaRepository";
import { GetUserOptions, IUserRepository } from "./UserRepository.interface";
import { UserDto } from "./User";

export class UserRepository
  extends PrismaRepository
  implements IUserRepository
{
  /**
   * Finds users in the application
   * @returns UserDto[]
   */
  async getUsers(options?: GetUserOptions): Promise<UserDto[]> {
    return await this.client.user.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: options?.where.id,
        name: options?.where.name,
      },
      orderBy: {
        name: options?.order.name,
      },
    });
  }
}
