import { PrismaRepository } from "@/lib/prisma/PrismaRepository";
import { UserDto } from "./User";
import {
  CreateUserOptions,
  GetUserOptions,
  IUserRepository,
} from "./UserRepository.interface";

export class UserRepository
  extends PrismaRepository
  implements IUserRepository
{
  /**
   * Returns the options required for selecting fields from the prisma model
   * @returns
   */
  private makePrismaSelectOptions() {
    return {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
    };
  }

  /**
   * Returns the common prisma options, required
   * @param options
   * @returns
   */
  private makePrismaOptions(options?: GetUserOptions) {
    return {
      select: this.makePrismaSelectOptions(),
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

  async getSession(sessionToken: string) {
    return this.client.session.findUnique({where: { sessionToken: sessionToken }, select: { userId: true, sessionToken: true, expires: true}})
  }

  /**
   * Finds users in the application
   * @param options
   * @returns UserDto[]
   */
  async getUsers(options?: GetUserOptions): Promise<UserDto[]> {
    return this.client.user.findMany(this.makePrismaOptions(options));
  }

  /**
   * Gets a single user in the application
   * @param options
   * @returns
   */
  async getUser(options: GetUserOptions): Promise<UserDto> {
    return this.client.user.findFirstOrThrow(
      this.makePrismaOptions(options),
    );
  }

  async createUser(options: CreateUserOptions) {
    return this.client.user.create({
      data: options,
      select: this.makePrismaSelectOptions(),
    });
  }
}
