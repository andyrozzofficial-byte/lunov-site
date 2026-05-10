import type { Locale } from "./config";
import type { Messages } from "./types";

const sv: Messages = {
  meta: {
    title: "LUNOV — Premium digitala upplevelser och system",
    description:
      "Skandinaviskt studio: webb, appar, AI-system, automation och realtidsdata — plattformar för kreatörer, bolag och kultur.",
    ogDescription:
      "Vi formar webb, appar, dashboards och infrastruktur med precision och lugn.",
  },
  brand: { subtitle: "Skandinaviskt digitalt studio" },
  nav: {
    home: "Hem",
    services: "Tjänster",
    projects: "Projekt",
    about: "Om oss",
    contact: "Kontakt",
  },
  header: {
    cta: "Kontakta oss",
    menuOpen: "Öppna meny",
    menuClose: "Stäng meny",
    switchToEn: "Byt till engelska",
    switchToSv: "Byt till svenska",
  },
  hero: {
    eyebrow: "Webb · appar · AI · automation",
    titleBefore: "Premium digitala upplevelser",
    titleAccent: "och system.",
    body:
      "Vi designar och bygger webb, appar och digitala plattformar — från AI-drivna flöden till automation och realtidsdashboardar. Skandinavisk design möter stabil teknik och genomtänkta användarupplevelser.",
    ctaPrimary: "Vad vi gör",
    ctaSecondary: "Utvalt arbete",
    trust:
      "Samarbetar med produktteam, byråer och bolag som kräver stabila leveranser.",
  },
  heroMockup: {
    fileMeta: "NMIX_master_v4.wav · 48 kHz · 24-bit",
    toolbarTabs: ["Session", "Mätare", "Leverans"],
    monitoring: "Övervakning",
    bufferOk: "Buffer OK",
    console: "Console",
    arm: "ARM",
    integrated: "Integrerad",
    truePeak: "True peak",
    crest: "Crest",
    ingestQueue: "Uppladdningskö",
    queueRows: [
      { name: "vocals_stem.wav", state: "Analyserar" },
      { name: "reference_mix.wav", state: "Klar" },
    ],
    phase: "Fas",
    waveform: "Vågform",
    waveformMeta: "−18 FS · clip-säker",
    spectrum: "Spektrum",
    spectrumMeta: "FFT · snitt",
    stereoField: "Stereofält",
    offlineBounce: "Offline-export",
    bounceProgress: "Pass 2 / 4",
    bounceMeta: "dither på",
    statusLine: "Limiter-kedja vilande · latenser nominala",
    build: "build 4.2",
  },
  services: {
    eyebrow: "Vad vi gör",
    heading: "Kreativ teknik i hela stacken",
    intro:
      "Från publika sajter till interna konsoler — samma precision i typografi, interaction och drift.",
    items: [
      {
        title: "Webb & produktgränssnitt",
        description:
          "Flaggskeppswebbar och narrativa produktupplevelser — snabba, tillgängliga och byggda för att överleva lanseringsveckan.",
      },
      {
        title: "Appar & realtidsytor",
        description:
          "Klienter och live-dashboards — tydliga tillstånd, robust strömning och läsbar UX när data rör sig.",
      },
      {
        title: "AI-stödda arbetsflöden",
        description:
          "Funktioner som bygger på era data: assistans i granskning, köer och automation som förstärker operatörer.",
      },
      {
        title: "Infrastruktur & automation",
        description:
          "Uppladdning, register, boknings- och admintjänster, observability — pipelinen som håller kreativa SaaS-lösningar förutsägbara.",
      },
    ],
  },
  projects: {
    eyebrow: "Utvalt",
    heading: "System vi har format",
    cta: "Prata scope",
    items: [
      {
        title: "Mastrify",
        description:
          "AI-masteringplattform med analys, referensmatchning och automatiserade masteringflöden.",
        meterLabel: "LUFS int",
        meterValue: "−14.0",
        imageAlt: "Förhandsvisning av Mastrify — AI-masteringgränssnitt",
      },
      {
        title: "Söder Entertainment",
        description:
          "Kommersiell webb för event och underhållning — bokningsfokuserad UX och responsiv design.",
        meterLabel: "Bokning",
        meterValue: "Live",
        imageAlt: "Förhandsvisning av Söder Entertainment — webbplats",
      },
      {
        title: "AI Music Registry",
        description:
          "Rättighetsregister och AI-träningsinfrastruktur för ägarskap, fingeravtryck och licensiering.",
        meterLabel: "Register",
        meterValue: "OK",
        imageAlt: "Förhandsvisning av AI Music Registry — kontrollpanel",
      },
    ],
  },
  about: {
    eyebrow: "Om oss",
    heading: "Ett kompakt studio för produkter folk bor i.",
    body:
      "LUNOV är medvetet litet: designers och ingenjörer som sitter nära ert team. Vi levererar ytor och den automation, telemetri och API-struktur som gör dem ärliga — från kampanjsajt till intern booking eller leveransmotor.",
    stats: {
      delivery: { label: "Leverans", value: "I etapper" },
      focus: { label: "Fokus", value: "Detaljstyrd" },
      surface: { label: "Yta", value: "Webb & native" },
    },
  },
  process: {
    eyebrow: "Process",
    heading: "Från riktning till trafik i produktion.",
    steps: [
      {
        title: "Inriktning & karta",
        description:
          "Intressenter, integrationer och krav — dokumenterat innan UI så dashboards, uppladdning och AI-delar delar samma sanning.",
      },
      {
        title: "Design & prototyper",
        description:
          "Flöden för webb och appar, admin och kund — testade tidigt mot verkliga edge cases och belastning.",
      },
      {
        title: "Bygg & koppla",
        description:
          "API:er, auth, realtid, batch och telemetri — prestanda och tillgänglighet som del av scope, inte tillägg.",
      },
      {
        title: "Lansering & förfining",
        description:
          "Utrullning med observability ni kan agera på, playbooks för automation och iteration utifrån riktiga signaler.",
      },
    ],
  },
  cta: {
    eyebrow: "Nästa steg",
    heading: "Låt oss sätta scope.",
    body:
      "Berätta om upplevelsen eller systemet — SaaS-konsol, bokning, register, AI-flöde eller realtidsdashboard — plus integrationer och tidslinje. Vi återkommer med tydlig plan.",
    button: "Kontakta oss",
  },
  footer: {
    blurb:
      "Premium webb, appar och backends — med automation och analyslager som står stadigt när lasten ökar.",
    navigation: "Navigation",
    services: "Tjänster",
    follow: "Följ oss",
    socialAria: "Kommande kanaler — platshållare",
    closing: "Lugn ton. Seriös pipeline.",
    copyright: "LUNOV Studio",
  },
};

const en: Messages = {
  meta: {
    title: "LUNOV — Premium digital experiences & systems",
    description:
      "Scandinavian studio for websites, apps, AI systems, automation and realtime data — platforms for creators, teams and culture.",
    ogDescription:
      "We shape web, apps, dashboards and infrastructure with precision and restraint.",
  },
  brand: { subtitle: "Scandinavian digital studio" },
  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
  header: {
    cta: "Get in touch",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchToEn: "Switch to English",
    switchToSv: "Switch to Swedish",
  },
  hero: {
    eyebrow: "Web · apps · AI · automation",
    titleBefore: "Premium digital experiences",
    titleAccent: "& systems.",
    body:
      "We design and build web platforms, apps and digital systems — from AI-powered workflows to automation and real-time dashboards. Scandinavian design meets stable technology and thoughtful user experiences.",
    ctaPrimary: "What we build",
    ctaSecondary: "Selected work",
    trust:
      "Trusted by product teams, agencies and operators shipping serious software.",
  },
  heroMockup: {
    fileMeta: "NMIX_master_v4.wav · 48 kHz · 24-bit",
    toolbarTabs: ["Session", "Meters", "Delivery"],
    monitoring: "Monitoring",
    bufferOk: "Buffer OK",
    console: "Console",
    arm: "ARM",
    integrated: "Integrated",
    truePeak: "True peak",
    crest: "Crest",
    ingestQueue: "Ingest queue",
    queueRows: [
      { name: "vocals_stem.wav", state: "Analyzing" },
      { name: "reference_mix.wav", state: "Ready" },
    ],
    phase: "Phase",
    waveform: "Waveform",
    waveformMeta: "−18 FS · clip-safe",
    spectrum: "Spectrum",
    spectrumMeta: "FFT · avg",
    stereoField: "Stereo field",
    offlineBounce: "Offline bounce",
    bounceProgress: "Pass 2 / 4",
    bounceMeta: "dither on",
    statusLine: "Limiting chain idle · latencies nominal",
    build: "build 4.2",
  },
  services: {
    eyebrow: "What we do",
    heading: "Creative technology end to end",
    intro:
      "From public sites to internal consoles — the same precision in typography, interaction and operations.",
    items: [
      {
        title: "Websites & product UI",
        description:
          "Flagship web and narrative product surfaces — fast, accessible and engineered to survive launch week.",
      },
      {
        title: "Apps & realtime surfaces",
        description:
          "Clients and live dashboards — clear state, resilient streaming and legible UX when data moves fast.",
      },
      {
        title: "AI-assisted workflows",
        description:
          "Features grounded in your data: assistive review queues and automation that amplifies operators.",
      },
      {
        title: "Infrastructure & automation",
        description:
          "Upload pipelines, registries, booking and admin services, observability — the backbone that keeps creative SaaS predictable.",
      },
    ],
  },
  projects: {
    eyebrow: "Selected",
    heading: "Systems we have shaped",
    cta: "Discuss scope",
    items: [
      {
        title: "Mastrify",
        description:
          "AI mastering platform with analysis, reference matching and automated mastering workflows.",
        meterLabel: "LUFS int",
        meterValue: "−14.0",
        imageAlt: "Mastrify AI mastering platform screenshot preview",
      },
      {
        title: "Söder Entertainment",
        description:
          "Commercial event and entertainment website — booking-focused UX and responsive design.",
        meterLabel: "Booking",
        meterValue: "Live",
        imageAlt: "Söder Entertainment website screenshot preview",
      },
      {
        title: "AI Music Registry",
        description:
          "Rights registry and AI training infrastructure for music ownership, fingerprinting and licensing.",
        meterLabel: "Registry",
        meterValue: "OK",
        imageAlt: "AI Music Registry dashboard screenshot preview",
      },
    ],
  },
  about: {
    eyebrow: "About",
    heading: "A compact studio for products people live in.",
    body:
      "LUNOV stays intentionally small: designers and engineers embedded with your team. We ship interfaces alongside the automation, telemetry and API shape that keep them honest — from campaign sites to internal booking or delivery engines.",
    stats: {
      delivery: { label: "Delivery", value: "Phased" },
      focus: { label: "Focus", value: "Detail-led" },
      surface: { label: "Surface", value: "Web & native" },
    },
  },
  process: {
    eyebrow: "Process",
    heading: "From alignment to production traffic.",
    steps: [
      {
        title: "Alignment & map",
        description:
          "Stakeholders, integrations and constraints — captured before UI so dashboards, uploads and AI touchpoints share one source of truth.",
      },
      {
        title: "Design & prototypes",
        description:
          "Flows for web and apps, admin and client views — validated early against realistic edge cases and load.",
      },
      {
        title: "Build & integrate",
        description:
          "APIs, auth, realtime, batch jobs and telemetry — performance and accessibility treated as scope, not polish.",
      },
      {
        title: "Launch & refine",
        description:
          "Rollouts with actionable observability, automation playbooks and iteration rhythm driven by real signals.",
      },
    ],
  },
  cta: {
    eyebrow: "Next step",
    heading: "Let’s define scope.",
    body:
      "Tell us about the experience or system — SaaS console, booking stack, registry, AI flow or realtime dashboard — plus integrations and timeline. We reply with a clear proposal.",
    button: "Get in touch",
  },
  footer: {
    blurb:
      "Premium websites, apps and backends — plus automation and analytics that stay composed under load.",
    navigation: "Navigation",
    services: "Services",
    follow: "Follow",
    socialAria: "Placeholder social channels",
    closing: "Calm interfaces. Serious pipelines.",
    copyright: "LUNOV Studio",
  },
};

const dictionaries: Record<Locale, Messages> = {
  sv,
  en,
};

export function getDictionary(locale: Locale): Messages {
  return dictionaries[locale];
}
