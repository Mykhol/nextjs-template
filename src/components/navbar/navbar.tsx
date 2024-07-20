import { HTMLAttributes, Suspense } from "react";
import { UserMenu } from "./user-menu";
import { auth } from "@/lib/auth/Auth";
import { redirect } from "next/navigation";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export async function Navbar({ className }: NavbarProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="p-4 w-full flex">
      <UserMenu user={session.user} className="ml-auto" />
    </div>
  );
}
