import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { deleteAuthCookies } from "./lib/auth/jwtfunctions";

export async function middleware(req: NextRequest, res: NextResponse) {
  const secretKey = process.env.JWT_SECRET_KEY!;
  const pathname = req.nextUrl.pathname;
  console.log("middleware called");

  // Get tokens from cookies
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  let payload;

  // If access token exists, verify it
  if (accessToken) {
    try {
      const { payload: accessTokenPayload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secretKey),
      );
      payload = accessTokenPayload;
    } catch (error) {
      console.error("Access token verification failed", error);

      if (refreshToken) {
        try {
          const { payload: refreshTokenPayload } = await jwtVerify(
            refreshToken,
            new TextEncoder().encode(secretKey),
          );
          payload = refreshTokenPayload;
        } catch (err) {
          console.error("Refresh token verification failed", err);
        }
      } else {
        deleteAuthCookies(res);
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    }
  }

  // Handle route behavior based on token verification
  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname === "/auth" && payload) {
    // Redirect to home page if already logged in
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname !== "/auth" && !payload) {
    // Redirect to login page if not logged in
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|lib|_next/static|favicon.ico|icons|places_images).*)", // Match all paths except API routes and static files
  ],
};
