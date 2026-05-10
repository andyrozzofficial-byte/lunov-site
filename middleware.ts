import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = new Set(["sv", "en"]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/sv", request.url));
  }

  const first = pathname.split("/").filter(Boolean)[0];
  if (first && !locales.has(first)) {
    return NextResponse.redirect(new URL("/sv", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
