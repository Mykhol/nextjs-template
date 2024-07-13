import { User, UserDto } from "./User";
import { IUserRepository } from "./UserRepository.interface";

/**
 * Manage users within the application
 */
export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Returns all of the applications users
   *
   * @returns User[]
   */
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userRepository.getUsers();
  }

  /**
   * Returns a paginated view of all the applications users
   * @param pageSize
   * @param page
   * @returns User[]
   */
  async getUsersPaginated(pageSize: number, page: number): Promise<UserDto[]> {
    return await this.userRepository.getUsers({
      take: pageSize,
      skip: pageSize * page,
    });
  }
}
