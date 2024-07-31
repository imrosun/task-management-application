// // app/_middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get('authToken'); // Retrieve token from cookies

//   // Define paths that don't require authentication
//   const publicPaths = ['/signin', '/signup'];

//   // Redirect to login if the user is not authenticated and trying to access a protected route
//   if (!token && !publicPaths.includes(pathname)) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }
