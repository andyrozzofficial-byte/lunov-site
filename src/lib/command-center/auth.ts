import type { NextRequest } from "next/server";

function decodeBasicAuth(header: string): { user: string; pass: string } | null {
  if (!header.startsWith("Basic ")) return null;

  try {
    const decoded = atob(header.slice(6));
    const colon = decoded.indexOf(":");
    if (colon === -1) return null;
    return {
      user: decoded.slice(0, colon),
      pass: decoded.slice(colon + 1),
    };
  } catch {
    return null;
  }
}

export function isCommandCenterAuthConfigured(): boolean {
  return Boolean(
    process.env.COMMAND_CENTER_USERNAME?.trim() &&
      process.env.COMMAND_CENTER_PASSWORD?.trim(),
  );
}

export function isCommandCenterAuthorized(request: NextRequest): boolean {
  const expectedUser = process.env.COMMAND_CENTER_USERNAME?.trim();
  const expectedPass = process.env.COMMAND_CENTER_PASSWORD?.trim();

  if (!expectedUser || !expectedPass) {
    return false;
  }

  const auth = request.headers.get("authorization");
  if (!auth) return false;

  const credentials = decodeBasicAuth(auth);
  if (!credentials) return false;

  return credentials.user === expectedUser && credentials.pass === expectedPass;
}

export function shouldProtectCommandCenter(): boolean {
  if (isCommandCenterAuthConfigured()) return true;
  return process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
}
