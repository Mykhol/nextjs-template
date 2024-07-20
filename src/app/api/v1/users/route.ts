import { ServiceFactory } from "@/lib/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
}
