import { Permission } from "@/domain/Auth/models/Permission";

export type RoleDto = {
  id: string;
  name: string;
  permissions: Permission[];
};

export class Role {
  private id: string;
  private name: string;
  private permissions: Permission[];

  constructor(dto: RoleDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.permissions = dto.permissions;
  }

  hasPermission(permissionKey: string): boolean {
    return !!this.permissions.find(
      (permission) => permission.key === permissionKey,
    );
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permissions,
    } satisfies RoleDto;
  }
}
