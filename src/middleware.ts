import { NextResponse, type NextRequest } from "next/server";

// const publicPaths = ["/", "/login"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Check for token in cookies

  // const token = request.cookies.get("token");
  // if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
