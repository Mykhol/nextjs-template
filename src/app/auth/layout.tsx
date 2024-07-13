import { auth } from "@/lib/auth/Auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (session) redirect("/admin");

  return children;
}
