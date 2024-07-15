"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { UserDto } from "@/domain/Auth/User";
import { useAppQuery } from "@/lib/request/useRequest";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

const columnHelper = createColumnHelper<UserDto>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    size: 100,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    size: 100,
  }),
  columnHelper.accessor("role.name", {
    header: "Role",
    size: 100,
  }),
];

export function UserTable() {
  const [filters, setFilters] = useState<{ searchTerm?: string }>({});

  const { data: userQuery, isLoading } = useAppQuery<UserDto[]>(
    "/api/v1/users",
    filters,
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <Input
          value={filters.searchTerm}
          autoFocus={true}
          placeholder="Search name or email"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
          }
          className="w-[400px]"
        />
        <DataTable columns={columns} data={userQuery || []} />
      </div>
    </>
  );
}
