/**
 * Serializable object used to pass user data around the application
 */
export type UserDto = {
  id: string;
  name: string | null;
};

/**
 * User of the application
 */
export class User {
  public id: string;
  public name: string | null;

  constructor(userDto: UserDto) {
    (this.id = userDto.id), (this.name = userDto.name);
  }

  /**
   * Returns the current user as a Dto object
   * @returns The user as as a UserDto object
   */
  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
