import { GetUserOptions, IUserRepository } from "./UserRepository.interface";
import { UserDto } from "./User";
import { PrismaRepository } from "@/lib/prisma/PrismaRepository";

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
        email: true,
        role: true,
      },
      where: {
        id: options?.where?.id,
        name: options?.where?.name,
      },
      orderBy: {
        name: options?.order?.name,
      },
      skip: options?.skip,
      take: options?.take,
    });
  }
}
