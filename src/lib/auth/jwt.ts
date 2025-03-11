import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY!;

export function signToken(payload: object): string {
  return jwt.sign(payload, secretKey, { expiresIn: '1m' });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secretKey) as JwtPayload;
}


import { NextApiResponse } from 'next';
import cookie from 'cookie';

export function setTokenCookie(res: NextApiResponse, token: string, memory: boolean) {
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    ...(memory && { maxAge: 60 * 60 * 24 * 30 }),
  }));
}

export function deleteTokenCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
  }));
}