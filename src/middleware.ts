import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|favicon.ico|icons).*)', // Match all paths except API routes and static files
  ],
};