import { NextRequest, NextResponse } from "next/server";

/**
 * Handles requests from newly signed up users
 * @param request
 * @returns
 */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/hello", request.nextUrl.origin));
}
