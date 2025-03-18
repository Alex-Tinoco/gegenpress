import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CheckToken } from "./lib/auth/jwt";
import { JwtPayload } from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Get tokens from cookies
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  let valid = false;
  let payload: JwtPayload | undefined;

  // If tokens exist, verify them
  if (accessToken && refreshToken) {
    const check = CheckToken(res, accessToken, refreshToken);
    valid = check.valid;
    payload = check.payload;
  }

  // Home page should always be accessible
  if (pathname === "/") {
    return NextResponse.next();
  }

  // If logged in, don't allow access to the login page
  if (pathname === "/auth" && valid) {
    // Redirect to home page if already logged in
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // If not logged in, redirect to login page
  if (pathname !== "/auth" && !valid) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|icons).*)", // Match all paths except API routes and static files
  ],
};
