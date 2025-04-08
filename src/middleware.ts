import { NextRequest, NextResponse } from "next/server";
import {
  accessTokenVerification,
  refreshAccessToken,
} from "@/lib/jwtfunctions";
import path from "path";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  // Get tokens from cookies
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  let payload: Object | undefined = undefined;
  let response = NextResponse.next(); // Create response object first

  if (accessToken || refreshToken) {
    if (accessToken) {
      payload = await accessTokenVerification(accessToken);
      if (payload) {
        console.log("Access token verified");
      } else {
        // Try refresh token if access token failed
        if (refreshToken) {
          payload = await refreshAccessToken(response, refreshToken);
          if (payload) {
            console.log("Refreshed access token");
          } else {
            console.log("Refresh token verification failed");
          }
        }
      }
    } else if (refreshToken) {
      // Only have refresh token
      payload = await refreshAccessToken(response, refreshToken);
      if (payload) {
        console.log("Refreshed access token");
      } else {
        console.log("Refresh token verification failed");
      }
    }
  }

  const redirect = (url?: string, payload?: Object) => {
    let finalResponse: NextResponse;

    if (url) {
      finalResponse = NextResponse.redirect(new URL(url, req.url));
    } else {
      finalResponse = response;
    }

    if (payload) {
      finalResponse.cookies.set("payload", JSON.stringify(payload), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return finalResponse;
  };

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (/^\/book\/[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/admin" && payload) {
    console.log(pathname, payload);
    if (payload && (payload as any)["role"] === "admin") {
      return NextResponse.next();
    } else {
      return redirect("/", payload);
    }
  }

  if (pathname === "/auth" && payload) {
    console.log("Already logged in, redirecting to home page.");
    return redirect("/", payload);
  }

  if (pathname !== "/auth" && !payload) {
    // Redirect to login page if not logged in
    console.log("Not logged in, redirecting to login page.");
    return redirect("/auth");
  }

  return redirect(undefined, payload);
}

export const config = {
  matcher: [
    "/((?!api|lib|_next/static|favicon.ico|icons|backgrounds|places).*)",
  ],
};
