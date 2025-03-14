import { Payload } from "@models/authmodel";
import { verify } from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const pagesWithoutLogin: string[] = ["/login", "/register"];

  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);

  //Get tokens from cookies
  //if token is not valid, redirect to login page
  //if token is valid, set token in const
  //Set payload data in const */

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|icons).*)", // Match all paths except API routes and static files
  ],
};
