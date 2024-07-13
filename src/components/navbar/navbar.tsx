import { HTMLAttributes, Suspense } from "react";
import { UserMenu } from "./user-menu";
import { auth } from "@/lib/auth/Auth";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export async function Navbar({ className }: NavbarProps) {
  const session = await auth();

  return (
    <div className="p-4 w-full flex">
      <UserMenu user={session?.user} className="ml-auto" />
    </div>
  );
}
