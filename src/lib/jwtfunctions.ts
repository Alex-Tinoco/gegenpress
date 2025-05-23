import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT, JWTPayload } from "jose";
import cookie from "cookie";
import { NextApiResponse } from "next";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

// Access Token Creation
export async function signAccessToken(payload: JWTPayload): Promise<string> {
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30m");

  return await jwt.sign(secretKey);
}

// Refresh Token Creation
export async function signRefreshToken(payload: JWTPayload): Promise<string> {
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15d");

  return await jwt.sign(secretKey);
}

// Verify Token
export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

// Set Tokens in Cookies (for both API and middleware)
export function setTokenCookies(
  res: NextApiResponse | NextResponse,
  accessToken?: string,
  refreshToken?: string,
) {
  if ("setHeader" in res) {
    // For API routes (NextApiResponse)
    const cookies: string[] = [];

    if (accessToken) {
      cookies.push(
        cookie.serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60,
        }),
      );
    }

    if (refreshToken) {
      cookies.push(
        cookie.serialize("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 15, // 15 days
        }),
      );
    }

    res.setHeader("Set-Cookie", cookies);
  } else {
    // For middleware (NextResponse)
    if (accessToken) {
      res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 30 * 60,
        sameSite: "strict",
      });
    }

    if (refreshToken) {
      res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 15,
        sameSite: "strict",
      });
    }
  }
}

// Delete Auth Cookies
export function deleteAuthCookies(res: NextApiResponse | NextResponse) {
  if ("setHeader" in res) {
    // For API routes (NextApiResponse)
    res.setHeader("Set-Cookie", [
      cookie.serialize("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        path: "/",
      }),
      cookie.serialize("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        path: "/",
      }),
      cookie.serialize("payload", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        path: "/",
      }),
    ]);
  } else {
    // For middleware (NextResponse)
    res.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    res.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    res.cookies.set("payload", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });
  }
}

export async function accessTokenVerification(accessToken: string) {
  try {
    const { payload: accessTokenPayload } = await jwtVerify(
      accessToken,
      secretKey,
    );
    return accessTokenPayload;
  } catch (error) {
    throw new Error("Access token verification failed");
  }
}

export async function refreshAccessToken(
  res: NextResponse,
  refreshToken: string,
) {
  try {
    const { payload: refreshTokenPayload } = await jwtVerify(
      refreshToken,
      secretKey,
    );
    const accessToken = await signAccessToken(refreshTokenPayload);
    setTokenCookies(res, accessToken, undefined);
    return refreshTokenPayload;
  } catch (error) {
    console.error("Access token verification failed", error);
  }
}

export function expiredTokenLogOut(req: NextRequest, res: NextResponse) {
  deleteAuthCookies(res);
  console.log("Refresh token expired, redirecting to login page.");
  return NextResponse.redirect(new URL("/auth", req.url));
}
