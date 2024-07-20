import { Role } from "@/domain/Auth/models/Role";

export interface IRoleRepository {
  getRole(roleId: string): Promise<Role>;
}
