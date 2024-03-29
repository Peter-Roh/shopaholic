import { type NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {
  const { isBot } = userAgent(req);

  if (req.nextUrl.pathname.startsWith("/error")) {
    return NextResponse.next();
  }

  if (isBot) {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  // 로그인되지 않은 경우 redirect
  if (
    !req.cookies.get("shopaholic")?.value &&
    !req.nextUrl.pathname.startsWith("/login")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 로그인된 경우 접근 금지 페이지
  if (
    req.cookies.get("shopaholic")?.value &&
    req.nextUrl.pathname.startsWith("/login")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
