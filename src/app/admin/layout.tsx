import { auth } from "@/lib/auth/Auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/auth/sign-in");
  // TODO: Add logic to only allow "admins" to view this screen

  return children;
}
