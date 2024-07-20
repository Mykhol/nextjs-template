import { NextRequest, NextResponse } from "next/server";
import { ServiceFactory } from "@/lib/ServiceFactory";
import { auth } from "@/lib/auth/Auth";

export interface ProtectedRouteOptions {
  request: NextRequest;
}

export async function protectedRoute(
  options: ProtectedRouteOptions,
): Promise<NextResponse> {
  const session = await auth();

  console.log(session);

  //
  // const authenticationService = ServiceFactory.buildAuthenticationService();
  //
  // const user = authenticationService.validateSession();

  return new NextResponse("Success", { status: 200 });
}
