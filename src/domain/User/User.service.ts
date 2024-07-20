import { IUserRepository } from "@/domain/User/UserRepository.interface";
import { UserDto } from "@/domain/User/User";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Returns all the applications users
   *
   * @returns UserDto[]
   */
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userRepository.getUsers();
  }

  /**
   * Returns a paginated view of all the applications users
   * @param pageSize
   * @param page
   * @param options
   * @returns UseDtor[]
   */
  async getUsersPaginated(
    pageSize: number,
    page: number,
    options?: { searchTerm?: string },
  ): Promise<UserDto[]> {
    return await this.userRepository.getUsers({
      where: {
        OR: options?.searchTerm
          ? [
              {
                name: {
                  contains: options.searchTerm,
                },
              },
              {
                email: {
                  contains: options.searchTerm,
                },
              },
            ]
          : undefined,
      },
      take: pageSize,
      skip: pageSize * page,
    });
  }
}
