import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Role } from "@/domain/Auth/models/Role";

export function useRole() {
  const [role, setRole] = useState<Role | null>(null);

  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      setRole(session.data.role ? new Role(session.data.role) : null);
    }
  }, [session]);

  return {
    role,
  };
}
