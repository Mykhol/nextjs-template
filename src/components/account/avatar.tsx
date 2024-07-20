import { AvatarFallback } from "@radix-ui/react-avatar";

import { HTMLAttributes } from "react";
import { Avatar as AvatarBase, AvatarImage } from "../ui/avatar";
import { UserDto } from "@/domain/User/models/User";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user?: UserDto;
}

export function Avatar({ user }: AvatarProps) {
  return (
    <AvatarBase>
      {user?.image && <AvatarImage src={user?.image} />}
      <AvatarFallback>{user?.name?.at(0)}</AvatarFallback>
    </AvatarBase>
  );
}
