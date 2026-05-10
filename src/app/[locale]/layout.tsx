import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "sv" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  const ogTitle = "LUNOV — Premium digitala upplevelser och system";
  const ogDescription = "Vi formar webb, appar, dashboards och infrastruktur för moderna team.";
  const ogImage = "/og-image.png";

  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "LUNOV",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        sv: "/sv",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return children;
}
