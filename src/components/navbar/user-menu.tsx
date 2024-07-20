"use client";

import { HTMLAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../account/avatar";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Settings, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { PERMISSION_KEY } from "@/domain/Auth/Permission.keys";
import { User, UserDto } from "@/domain/User/models/User";
import { Role } from "@/domain/Auth/models/Role";
import { useRole } from "@/hooks/useRole";

interface UserMenuProps extends HTMLAttributes<HTMLDivElement> {
  user: UserDto;
}

export function UserMenu({ user, className }: UserMenuProps) {
  const { role } = useRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <Avatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4 p-4 min-w-[200px]">
        <DropdownMenuGroup>{user?.name}</DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={"/account"}>
            <Settings className="mr-2" size={18} /> Account
          </Link>
        </DropdownMenuItem>
        {role?.hasPermission(PERMISSION_KEY.admin.dashboard.view) && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={"/admin"}>
              <ShieldAlert className="mr-2" size={18} /> Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-2" size={18} /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
