/**
 * Serializable object used to pass user data around the application
 */
export type UserDto = {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  role: {
    id: string;
    name: string;
  } | null;
};

/**
 * User of the application
 */
export class User {
  public id: string;
  public name: string | null;
  public email: string | null;
  public password: string | null;
  public role: {
    id: string;
    name: string;
  } | null;

  constructor(userDto: UserDto) {
    this.id = userDto.id;
    this.name = userDto.name;
    this.email = userDto.email;
    this.role = userDto.role;
    this.password = userDto.password;
  }

  /**
   * Returns the current user as a Dto object
   * @returns The user as as a UserDto object
   */
  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    };
  }
}
