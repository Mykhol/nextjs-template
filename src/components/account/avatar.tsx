import { AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import { HTMLAttributes } from "react";
import { Avatar as AvatarBase, AvatarImage } from "../ui/avatar";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user?: User;
}

export function Avatar({ user }: AvatarProps) {
  return (
    <AvatarBase>
      {user?.image && <AvatarImage src={user?.image} />}
      <AvatarFallback>{user?.name?.at(0)}</AvatarFallback>
    </AvatarBase>
  );
}
