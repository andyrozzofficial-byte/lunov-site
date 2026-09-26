import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  isCommandCenterAuthorized,
  isCommandCenterAuthConfigured,
  shouldProtectCommandCenter,
} from "@/lib/command-center/auth";

const locales = new Set(["sv", "en"]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/command-center")) {
    if (shouldProtectCommandCenter()) {
      if (!isCommandCenterAuthConfigured()) {
        return new NextResponse(
          "Command Center authentication is not configured.",
          { status: 503 },
        );
      }

      if (!isCommandCenterAuthorized(request)) {
        return new NextResponse("Authentication required", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="LUNOV Command Center", charset="UTF-8"',
          },
        });
      }
    }

    return NextResponse.next();
  }

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
