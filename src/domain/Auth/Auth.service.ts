import { User } from "./User";
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
  async getAllUsers(): Promise<User[]> {
    const userDtos = await this.userRepository.getUsers();
    return userDtos.map((userDto) => new User(userDto));
  }
}
