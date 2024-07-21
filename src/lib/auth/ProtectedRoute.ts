import { NextRequest, NextResponse } from "next/server";
import { ServiceFactory } from "@/lib/ServiceFactory";
import { auth } from "@/lib/auth/Auth";

export interface ProtectedRouteOptions {
  request: NextRequest;
  permissionKey?: string;
  callback: () => Promise<NextResponse<unknown>>;
}

export async function protectedRoute(
  options: ProtectedRouteOptions,
): Promise<NextResponse> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new NextResponse("Something went wrong", { status: 403 });
  }

  if (options.permissionKey) {
    const authorisationService = ServiceFactory.buildAuthorisationService();

    const validated = await authorisationService.validateUser(
      session.user.id,
      options.permissionKey,
    );

    if (!validated) {
      return new NextResponse("Insufficient permissions", { status: 403 });
    }
  }

  try {
    return await options.callback();
  } catch (e) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
