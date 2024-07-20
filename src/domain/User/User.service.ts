import { IUserRepository } from "@/domain/User/UserRepository.interface";
import { UserDto } from "@/domain/User/User";
import { IRoleRepository } from "@/domain/Auth/RoleRepository.interface";

export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
  ) {}

  async getUser(userId: string): Promise<UserDto> {
    const user = await this.userRepository.getUser({ where: { id: userId } });

    const role = user.role
      ? await this.roleRepository
          .getRole(user.role.id)
          .then((role) => role.toDto())
      : null;

    return {
      ...user,
      role: role,
    };
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
