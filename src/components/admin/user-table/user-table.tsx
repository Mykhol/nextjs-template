"use client";

import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDto } from "@/domain/Auth/User";
import { useAppQuery } from "@/lib/request/useRequest";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<UserDto>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("role.name", {
    header: "Role",
  }),
];

export function UserTable() {
  const { data: userQuery, isLoading } =
    useAppQuery<UserDto[]>("/api/v1/users");

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        userQuery && <DataTable columns={columns} data={userQuery} />
      )}
    </>
  );
}
