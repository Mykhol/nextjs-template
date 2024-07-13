import { DataTable } from "@/components/ui/data-table";
import { UserDto } from "@/domain/Auth/User";
import { ServiceFactory } from "@/lib/DependencyInjection";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<UserDto>();

const columns = [
  columnHelper.accessor("id", {}),
  columnHelper.accessor("name", {}),
];

export async function UserTable() {
  const userService = ServiceFactory.buildAuthService();
  const users = await userService.getAllUsers();

  return <DataTable columns={columns} data={users} />;
}
