import { PrismaRepository } from "@/lib/prisma/PrismaRepository";
import { IRoleRepository } from "@/domain/Auth/RoleRepository.interface";
import { Role } from "@/domain/Auth/Role";

export class RoleRepository
  extends PrismaRepository
  implements IRoleRepository
{
  async getRole(roleId: string) {
    const role = await this.client.role.findFirstOrThrow({
      where: { id: roleId },
      include: {
        RolePermission: {
          include: {
            permission: true,
          },
        },
      },
    });

    const permissions =
      role?.RolePermission.map((permission) => permission.permission) || [];

    return new Role({
      id: role.id,
      name: role.name,
      permissions: permissions,
    });
  }
}
