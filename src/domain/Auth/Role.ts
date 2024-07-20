import { Permission } from "@/domain/Auth/Permission";

export type RoleDto = {
  id: string;
  name: string;
  permissions: Permission[];
};

export class Role {
  private id: string;
  private name: string;
  private permissions: Permission[];

  constructor(dto: { id: string; name: string; permissions: Permission[] }) {
    this.id = dto.id;
    this.name = dto.name;
    this.permissions = dto.permissions;
  }

  hasPermission(permissionKey: string): boolean {
    return !!this.permissions.find(
      (permission) => permission.key === permissionKey,
    );
  }
}
