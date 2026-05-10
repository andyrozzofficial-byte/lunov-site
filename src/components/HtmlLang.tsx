"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";

export function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    const seg = pathname.split("/").filter(Boolean)[0];
    document.documentElement.lang = isLocale(seg) ? seg : defaultLocale;
  }, [pathname]);

  return null;
}
