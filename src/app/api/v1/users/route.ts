import { ServiceFactory } from "@/lib/DependencyInjection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authService = ServiceFactory.buildAuthService();

  const params = request.nextUrl.searchParams;

  const term = params.get("searchTerm");

  const users = await authService.getUsersPaginated(10, 0, term || undefined);

  return NextResponse.json({ data: users });
}
