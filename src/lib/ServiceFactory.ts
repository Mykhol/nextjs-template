import { AuthenticationService } from "@/domain/Auth/Authentication.service";
import { UserRepository } from "@/domain/User/User.repository";
import { AuthorisationService } from "@/domain/Auth/Authorisation.service";
import { UserService } from "@/domain/User/User.service";

/**
 * Class to build application services
 */
export class ServiceFactory {
  static buildAuthenticationService() {
    return new AuthenticationService(new UserRepository());
  }

  static buildAuthorisationService() {
    return new AuthorisationService();
  }

  static buildUserService() {
    return new UserService(new UserRepository());
  }
}
