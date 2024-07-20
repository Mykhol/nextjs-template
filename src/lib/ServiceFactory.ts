import { AuthenticationService } from "@/domain/Auth/services/Authentication.service";
import { UserRepository } from "@/domain/User/repositories/User.repository";
import { AuthorisationService } from "@/domain/Auth/services/Authorisation.service";
import { UserService } from "@/domain/User/services/User.service";
import { RoleRepository } from "@/domain/Auth/repositories/Role.repository";

/**
 * Class to build application services
 */
export class ServiceFactory {
  static buildAuthenticationService(): AuthenticationService {
    return new AuthenticationService(new UserRepository());
  }

  static buildAuthorisationService(): AuthorisationService {
    return new AuthorisationService(new UserRepository(), new RoleRepository());
  }

  static buildUserService(): UserService {
    return new UserService(new UserRepository(), new RoleRepository());
  }
}
