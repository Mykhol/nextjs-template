import { User, UserDto } from "./User";
import { IUserRepository } from "./UserRepository.interface";
import bcrypt from "bcrypt";

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
  async getUsersPaginated(
    pageSize: number,
    page: number,
    searchTerm?: string,
  ): Promise<UserDto[]> {
    return await this.userRepository.getUsers({
      where: {
        OR: searchTerm
          ? [
              {
                name: {
                  contains: searchTerm,
                },
              },
              {
                email: {
                  contains: searchTerm,
                },
              },
            ]
          : undefined,
      },
      take: pageSize,
      skip: pageSize * page,
    });
  }

  /**
   * Attemps to find a user by the supplied email
   * @param email
   * @returns
   */
  async getUserByEmail(email: string): Promise<UserDto | null> {
    try {
      return await this.userRepository.getUser({
        where: {
          email: email,
        },
      });
    } catch (e) {
      console.log("Could not find user with the email: ", email);
      return null;
    }
  }

  /**
   * Hashes the provided password
   * @param password
   * @returns
   */
  async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassowrd = bcrypt.hashSync(password, salt);
    return hashedPassowrd;
  }

  /**
   * Validates a password with the comparing hash
   * @param password
   * @param hash
   * @returns
   */
  async validatePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
