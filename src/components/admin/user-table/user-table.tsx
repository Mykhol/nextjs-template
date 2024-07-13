"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDto } from "@/domain/Auth/User";
import { useAppQuery } from "@/lib/request/useRequest";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

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
        {isLoading ? (
          <Skeleton />
        ) : (
          userQuery && <DataTable columns={columns} data={userQuery} />
        )}
      </div>
    </>
  );
}
