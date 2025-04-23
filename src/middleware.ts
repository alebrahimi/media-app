import { headers } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

import { auth } from '@/lib/auth';

import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from './routes';

export async function middleware(request: NextRequest) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   const isApiAuth = request.nextUrl.pathname.startsWith(apiAuthPrefix);

   const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

   const isAuthRoute = () => {
      return authRoutes.some((path) => request.nextUrl.pathname.startsWith(path));
   };

   if (isApiAuth) {
      return NextResponse.next();
   }

   if (isAuthRoute()) {
      if (session) {
         return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
      }
      return NextResponse.next();
   }

   if (!session && !isPublicRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
   }

   return NextResponse.next();
}

export const config = {
   runtime: 'nodejs',
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * Feel free to modify this pattern to include more paths.
       */
      // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
   ],
};
