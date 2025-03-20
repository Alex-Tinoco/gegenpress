import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { accessTokenVerification, deleteAuthCookies, refreshAccessToken, setTokenCookies, signAccessToken } from "./lib/auth/jwtfunctions";

export async function middleware(req: NextRequest, res: NextResponse) {
  const secretKey = process.env.JWT_SECRET_KEY!;
  const pathname = req.nextUrl.pathname;

  // Get tokens from cookies
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  let payload = null;
  let validAccess = false;

  if (accessToken || refreshToken) {
    try {
     if (accessToken) {
      try {
        payload = await accessTokenVerification(accessToken);
        console.log("Access token verified");
        validAccess = true;
      } catch (err) {
        console.log("Access token verification failed")
      }
    }
    if (!validAccess && refreshToken) {
      try {
        payload = await refreshAccessToken(res,refreshToken);
        console.log("Refreshed access token");
      } catch (err) {
        console.log("Refresh token verification failed")
      }
    }
    } catch (err) {
    console.error("Failed to verify tokens", err);
    }
  }

  // Handle route behavior based on token verification
  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname === "/auth" && payload) {
    // Redirect to home page if already logged in
    console.log('Already logged in, redirecting to home page.');
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname !== "/auth" && !payload) {
    // Redirect to login page if not logged in
    console.log('Not logged in, redirecting to login page.');
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|lib|_next/static|favicon.ico|icons|places_images).*)", // Match all paths except API routes and static files
  ],
}
