import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiResponse } from "next";
import cookie from "cookie";

const secretKey = process.env.JWT_SECRET_KEY!;

// Access Token Creation
export function signAccessToken(payload: object): string {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Refresh Token Creation
export function signRefreshToken(payload: object): string {
  return jwt.sign(payload, secretKey, { expiresIn: "15d" });
}

// Set Token In Cookies
export function setTokenCookies(
  res: NextApiResponse,
  accessToken: string,
  refreshToken?: string,
) {
  const cookies: string[] = [
    cookie.serialize("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    }),
  ];

  if (refreshToken) {
    cookies.push(
      cookie.serialize("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 15,
      }),
    );
  }

  res.setHeader("Set-Cookie", cookies);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, secretKey) as JwtPayload;
}

export function deleteTokenCookie(res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    }),
  );
}
