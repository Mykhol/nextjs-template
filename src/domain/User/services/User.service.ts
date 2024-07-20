import { IUserRepository } from "@/domain/User/interfaces/UserRepository.interface";
import { UserDto } from "@/domain/User/models/User";
import { IRoleRepository } from "@/domain/Auth/interfaces/RoleRepository.interface";
import { RoleDto } from "@/domain/Auth/models/Role";

export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
  ) {}

  async getRole(userId: string): Promise<RoleDto | null> {
    const user = await this.getUser(userId);

    return user.role?.id
      ? await this.roleRepository
          .getRole(user.role.id)
          .then((role) => role.toDto())
      : null;
  }

  async getUser(userId: string): Promise<UserDto> {
    return await this.userRepository.getUser({ where: { id: userId } });
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
