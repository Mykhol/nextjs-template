import { AuthService } from "@/domain/Auth/Auth.service";
import { UserRepository } from "@/domain/Auth/User.repository";

/**
 * Class to build application serivces
 */
export class ServiceFactory {
  static buildAuthService() {
    return new AuthService(new UserRepository());
  }
}
