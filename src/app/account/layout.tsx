import { ReactNode } from "react";
import { auth } from "@/lib/auth/Auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) redirect("/auth/sign-in");

  return children;
}
