import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/api/auth/signin", request.url));
}

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id*"],
};
