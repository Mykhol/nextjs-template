import { Role, RoleDto } from "@/domain/Auth/models/Role";

/**
 * Serializable object used to pass user data around the application
 */
export type UserDto = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
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
  public image: string | null;
  public role: {
    id: string;
    name: string;
  } | null;

  constructor(userDto: UserDto) {
    this.id = userDto.id;
    this.name = userDto.name;
    this.email = userDto.email;
    this.image = userDto.image;
    this.role = userDto.role;
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
      role: this.role,
      image: this.image,
    };
  }
}
