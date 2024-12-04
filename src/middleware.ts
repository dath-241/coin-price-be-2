import { NextResponse, type NextRequest } from "next/server";

// const publicPaths = ["/", "/login"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/user", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
