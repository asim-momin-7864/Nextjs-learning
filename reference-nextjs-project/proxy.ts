import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

// Proxy to protect routes that require authentication
export async function proxy(request: NextRequest) {
  // We use the new proxy.ts convention in Next.js 16 for request interception.
  const path = request.nextUrl.pathname;

  // Define public routes
  const isPublicRoute = path === '/' || path === '/login' || path === '/register';

  // Get the session from cookies
  const sessionCookie = request.cookies.get('session')?.value;
  let session = null;

  if (sessionCookie) {
    session = await decrypt(sessionCookie);
  }

  // Redirect to login if user is not authenticated and trying to access a protected route
  if (!isPublicRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Redirect to dashboard (notes) if user is authenticated and trying to access login/register
  if ((path === '/login' || path === '/register') && session?.userId) {
    return NextResponse.redirect(new URL('/notes', request.nextUrl));
  }

  return NextResponse.next();
}

// Ensure proxy is only invoked for specific paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
