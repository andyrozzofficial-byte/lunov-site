import { HtmlLang } from "@/components/HtmlLang";
import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const lunovDisplay = Syne({
  variable: "--font-lunov-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
});

const lunovBody = DM_Sans({
  variable: "--font-lunov-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "LUNOV",
    template: "%s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      suppressHydrationWarning
      className={`${lunovDisplay.variable} ${lunovBody.variable} h-full`}
    >
      <body className="relative isolate min-h-full bg-black font-sans text-white antialiased">
        <HtmlLang />
        <div
          className="lunov-grain lunov-grain-animate pointer-events-none fixed inset-0 z-[1] mix-blend-overlay"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(ellipse_100%_70%_at_50%_-18%,rgba(212,255,63,0.035),transparent_52%),radial-gradient(ellipse_70%_50%_at_100%_60%,rgba(255,255,255,0.025),transparent_55%)]"
          aria-hidden
        />
        <div className="relative z-[3]">{children}</div>
      </body>
    </html>
  );
}
