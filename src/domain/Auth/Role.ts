import { PermissionDto } from "@/domain/Auth/PermissionDto";

export type RoleDto = {
  id: string;
  name: string;
  permissions: PermissionDto[];
};

export class Role {
  private id: string;
  private name: string;
  private permissions: PermissionDto[];

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
}
