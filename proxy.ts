import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "cm_admin_session";
const COOKIE_SECRET = process.env.ADMIN_COOKIE_SECRET ?? "codemode_super_secret_key_2024";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let login page and auth API through
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get(ADMIN_COOKIE);
    if (!session || session.value !== COOKIE_SECRET) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
