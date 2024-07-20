import { AuthenticationService } from "@/domain/Auth/Authentication.service";
import { UserRepository } from "@/domain/User/User.repository";
import { AuthorisationService } from "@/domain/Auth/Authorisation.service";
import { UserService } from "@/domain/User/User.service";
import { RoleRepository } from "@/domain/Auth/Role.repository";

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
    return new UserService(new UserRepository());
  }
}
