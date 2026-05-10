import { About } from "@/components/lunov/About";
import { Cta } from "@/components/lunov/Cta";
import { Footer } from "@/components/lunov/Footer";
import { Header } from "@/components/lunov/Header";
import { Hero } from "@/components/lunov/Hero";
import { Process } from "@/components/lunov/Process";
import { Projects } from "@/components/lunov/Projects";
import { Reveal } from "@/components/lunov/Reveal";
import { Services } from "@/components/lunov/Services";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getDictionary(locale);

  return (
    <>
      <Header locale={locale} messages={messages} />
      <main className="lunov-main-stack overflow-x-hidden">
        <Hero locale={locale} messages={messages} />
        <Reveal delayMs={0}>
          <Services copy={messages.services} />
        </Reveal>
        <Reveal delayMs={55}>
          <Projects locale={locale} copy={messages.projects} />
        </Reveal>
        <Reveal delayMs={105}>
          <About copy={messages.about} />
        </Reveal>
        <Reveal delayMs={145}>
          <Process copy={messages.process} />
        </Reveal>
        <Reveal delayMs={185}>
          <Cta copy={messages.cta} />
        </Reveal>
      </main>
      <Reveal delayMs={50}>
        <Footer locale={locale} messages={messages} />
      </Reveal>
    </>
  );
}
