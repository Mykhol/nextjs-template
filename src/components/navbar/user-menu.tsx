"use client";

import { HTMLAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "./avatar";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

interface UserMenuProps extends HTMLAttributes<HTMLDivElement> {
  user?: User;
}

export async function UserMenu({ user, className }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <Avatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4">
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
