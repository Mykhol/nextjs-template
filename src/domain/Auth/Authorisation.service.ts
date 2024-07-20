import { IUserRepository } from "@/domain/User/UserRepository.interface";
import { IRoleRepository } from "@/domain/Auth/RoleRepository.interface";

/**
 * Handles the authorisation of users within the platform
 */
export class AuthorisationService {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
  ) {}

  async validateUser(userId: string, permissionKey: string): Promise<boolean> {
    const user = await this.userRepository.getUser({ where: { id: userId } });

    if (!user.role) {
      return false;
    }

    const role = await this.roleRepository.getRole(user.role?.id);

    if (role.hasPermission(permissionKey)) {
      return true;
    }

    return false;
  }
}
