import { ServiceFactory } from "@/lib/DependencyInjection";
import { NextResponse } from "next/server";

export async function GET() {
  const authService = ServiceFactory.buildAuthService();

  const users = await authService.getAllUsers();

  return NextResponse.json({ data: users });
}
