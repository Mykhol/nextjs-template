import { ServiceFactory } from "@/lib/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";
import { protectedRoute } from "@/lib/auth/ProtectedRoute";
import { PERMISSION_KEY } from "@/domain/Auth/Permission.keys";

export async function GET(request: NextRequest) {
  return await protectedRoute({
    request: request,
    permissionKey: PERMISSION_KEY.admin.users.view,
    callback: async () => {
      // Setup services
      const userService = ServiceFactory.buildUserService();

      // Fetch and parse params
      const params = request.nextUrl.searchParams;
      const searchTerm = params.get("searchTerm");

      // Fetch the users
      const users = await userService.getUsersPaginated(10, 0, {
        searchTerm: searchTerm || undefined,
      });

      return NextResponse.json({ data: users });
    },
  });
}
