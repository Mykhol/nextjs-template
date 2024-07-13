import { NextRequest, NextResponse } from "next/server";

export interface ProtectedRouteOptions {
  request: NextRequest;
}

export async function protectedRoute(
  options: ProtectedRouteOptions,
): Promise<NextResponse> {
  return new NextResponse("Success", { status: 200 });
}
