import { auth } from "@/lib/auth/Auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Image from "next/image";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (session) redirect("/admin");

  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex h-full items-center justify-center py-12">
        {children}
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="/splash.jpg"
          alt="Image"
          fill
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
