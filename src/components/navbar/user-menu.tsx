"use client";

import { HTMLAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../account/avatar";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

interface UserMenuProps extends HTMLAttributes<HTMLDivElement> {
  user?: User;
}

export function UserMenu({ user, className }: UserMenuProps) {
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
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-2" size={18} /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
