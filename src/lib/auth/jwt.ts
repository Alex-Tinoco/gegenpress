import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiResponse } from "next";
import cookie from "cookie";
import { NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET_KEY!;

// Access Token Creation
export function signAccessToken(payload: object): string {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Refresh Token Creation
export function signRefreshToken(payload: object): string {
  return jwt.sign(payload, secretKey, { expiresIn: "15d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secretKey) as JwtPayload;
}

// Set Token In Cookies
export function setTokenCookies(
  res: NextApiResponse | NextResponse,
  accessToken?: string,
  refreshToken?: string,
) {
  if (res instanceof NextResponse) {
    // Middleware (NextResponse)
    if (accessToken) {
      res.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });
    }
    if (refreshToken) {
      res.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 15, // 15 days
      });
    }
  } else {
    // API Route (NextApiResponse)
    const cookies: string[] = [];

    if (accessToken) {
      cookies.push(
        cookie.serialize("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60, // 1 hour
        }),
      );
    }
    if (refreshToken) {
      cookies.push(
        cookie.serialize("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 15, // 15 days
        }),
      );
    }
    res.setHeader("Set-Cookie", cookies);
  }
}

export function deleteAuthCookies(res: NextApiResponse) {
  res.setHeader("Set-Cookie", [
    cookie.serialize("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    }),
    cookie.serialize("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    }),
  ]);
}

export function CheckToken(
  res: NextResponse,
  accessToken: string,
  refreshToken: string,
): { valid: boolean; payload?: JwtPayload } {
  let valid: boolean = false;
  let payload: JwtPayload | undefined;

  try {
    payload = verifyToken(accessToken);
    valid = true;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.log("Access token expired.");
    }
    try {
      // Attempt to refresh with the refresh token
      const refreshTokenVerification = verifyToken(refreshToken);
      const newAccessToken = signAccessToken(refreshTokenVerification);
      setTokenCookies(res, newAccessToken);
      payload = refreshTokenVerification; // Set the payload for refresh token
      valid = true;
    } catch (err: any) {
      console.log("Refresh token failed:", err);
    }
  }

  return { valid, payload };
}
