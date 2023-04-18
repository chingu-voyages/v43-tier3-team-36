/* eslint-disable consistent-return */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Check out issue https://github.com/vercel/next.js/issues/38934
  if (request.url.includes('_next')) return;

  const hasServerCookie = request.cookies.has('connect.sid');
  const isNonAuthPage = request.nextUrl.pathname === '/login'
    || request.nextUrl.pathname === '/signup';

  // if (!hasServerCookie && !isNonAuthPage) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  if (hasServerCookie && isNonAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}
