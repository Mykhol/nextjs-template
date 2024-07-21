import { HTMLAttributes } from "react";
import {
  Avatar as AvatarBase,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { UserDto } from "@/domain/User/models/User";
import { User } from "lucide-react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user?: UserDto;
}

export function Avatar({ user }: AvatarProps) {
  return (
    <AvatarBase className={"bg-white"}>
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </AvatarBase>
  );
}
