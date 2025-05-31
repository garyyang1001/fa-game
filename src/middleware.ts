import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Protect /api/games routes (except GET)
        if (req.nextUrl.pathname.startsWith("/api/games") && 
            req.method !== "GET") {
          return !!token;
        }
        
        // Protect /create route
        if (req.nextUrl.pathname.startsWith("/create")) {
          return !!token;
        }
        
        // Allow all other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/api/games/:path*",
    "/create/:path*",
  ],
};