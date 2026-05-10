import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const lunovDisplay = Syne({
  variable: "--font-lunov-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const lunovBody = DM_Sans({
  variable: "--font-lunov-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUNOV — Digital Studio",
  description:
    "Web design, development, and systems for brands that expect performance. LUNOV Digital Studio builds fast, refined digital experiences.",
  openGraph: {
    title: "LUNOV — Digital Studio",
    description:
      "Digital experiences built to perform. Web, design, and systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lunovDisplay.variable} ${lunovBody.variable} h-full`}
    >
      <body className="min-h-full bg-black font-sans antialiased text-white">
        {children}
      </body>
    </html>
  );
}
