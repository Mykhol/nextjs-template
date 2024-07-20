import { Role } from "@/domain/Auth/Role";

export interface IRoleRepository {
  getRole(roleId: string): Promise<Role>;
}
