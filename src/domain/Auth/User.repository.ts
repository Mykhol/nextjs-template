import { PrismaRepository } from "@/lib/prisma/PrismaRepository";
import { UserDto } from "./User";
import { GetUserOptions, IUserRepository } from "./UserRepository.interface";

export class UserRepository
  extends PrismaRepository
  implements IUserRepository
{
  private makePrismaOptions(options?: GetUserOptions) {
    return {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      where: {
        id: options?.where?.id,
        name: options?.where?.name,
        OR: options?.where?.OR,
      },
      orderBy: {
        name: options?.order?.name,
      },
      skip: options?.skip,
      take: options?.take,
    };
  }

  /**
   * Finds users in the application
   * @returns UserDto[]
   */
  async getUsers(options?: GetUserOptions): Promise<UserDto[]> {
    return await this.client.user.findMany(this.makePrismaOptions(options));
  }

  async getUser(options: GetUserOptions): Promise<UserDto> {
    return await this.client.user.findFirstOrThrow(
      this.makePrismaOptions(options),
    );
  }
}
