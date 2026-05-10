import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/types";
import { SparkleIcon } from "./icons";

type FooterProps = {
  locale: Locale;
  messages: Messages;
};

function SocialInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-3.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
    </svg>
  );
}

function SocialYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2c.2 1 .4 2.8.4 4.8s-.2 3.8-.4 4.8c-.2 1.4-1.5 2.5-2.9 2.7-2.6.3-8.4.3-11 0-1.4-.2-2.7-1.3-2.9-2.7-.2-1-.4-2.8-.4-4.8s.2-3.8.4-4.8C5 5.8 6.3 4.7 7.7 4.5c2.6-.3 8.4-.3 11 0 1.4.2 2.7 1.3 2.9 2.7ZM10 9.5v5l4.5-2.5L10 9.5Z" />
    </svg>
  );
}

function SocialLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 8.5v11H3.2V8.5h3.3ZM4.85 3.8a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM20.8 12.4c0-3.6-1.9-5.3-4.5-5.3-1.3 0-2.3.6-2.8 1.3l-.2-1.1h-3.1v11h3.4v-6.2c0-1.5.6-2.5 1.9-2.5 1 0 1.6.7 1.6 2.1v6.6h3.7v-6.9Z" />
    </svg>
  );
}

const socialIcons = [
  { Icon: SocialInstagram, label: "Instagram" },
  { Icon: SocialYoutube, label: "YouTube" },
  { Icon: SocialLinkedin, label: "LinkedIn" },
] as const;

export function Footer({ locale, messages }: FooterProps) {
  const prefix = `/${locale}`;
  const { footer, nav, services } = messages;

  const navLinks = [
    { href: `${prefix}#home`, label: nav.home },
    { href: `${prefix}#services`, label: nav.services },
    { href: `${prefix}#projects`, label: nav.projects },
    { href: `${prefix}#about`, label: nav.about },
    { href: `${prefix}#contact`, label: nav.contact },
  ] as const;

  const serviceLinks = services.items.map((item) => ({
    href: `${prefix}#services`,
    label: item.title,
  }));

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.055] bg-gradient-to-b from-black via-black to-[#050508] px-[clamp(1rem,4vw,2rem)] pb-12 pt-[clamp(4rem,10vw,5.25rem)] sm:px-6 sm:pb-14 sm:pt-[clamp(4.5rem,9vw,5.5rem)] lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 lunov-divider-top opacity-90" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-80" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-10">
          <div className="lg:col-span-4">
            <Link
              href={`${prefix}#home`}
              className="inline-flex items-start gap-1.5 outline-none transition-[opacity,transform] duration-[620ms] ease-[cubic-bezier(0.16,1,0.32,1)] hover:opacity-95 motion-safe:hover:-translate-y-px"
            >
              <div className="leading-none">
                <span className="font-display flex items-center gap-1 text-[clamp(1.05rem,3vw,1.125rem)] font-bold tracking-[0.2em] text-white">
                  LUNO
                  <span className="relative inline-flex">
                    V
                    <SparkleIcon className="absolute -right-3 top-0 size-3 text-lime drop-shadow-[0_0_12px_rgba(212,255,63,0.25)] sm:size-3.5" />
                  </span>
                </span>
                <span className="mt-1.5 block max-w-[16rem] text-[9px] font-medium uppercase tracking-[0.26em] text-zinc-500 sm:max-w-none sm:text-[10px] sm:tracking-[0.28em]">
                  {messages.brand.subtitle}
                </span>
              </div>
            </Link>
            <p className="mt-8 max-w-[28rem] text-[13px] leading-[1.74] text-zinc-500 sm:mt-9 sm:text-[14px] sm:leading-[1.7]">
              {footer.blurb}
            </p>
          </div>

          <div className="grid gap-11 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3 lg:gap-12">
            <div>
              <p
                id="footer-nav-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500"
              >
                {footer.navigation}
              </p>
              <ul className="mt-6 space-y-1 sm:space-y-1.5" aria-labelledby="footer-nav-heading">
                {navLinks.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-[44px] items-center text-[13px] text-zinc-400 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.32,1)] hover:text-zinc-100 motion-safe:hover:translate-x-0.5 sm:min-h-0 sm:text-sm"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p
                id="footer-services-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500"
              >
                {footer.services}
              </p>
              <ul className="mt-6 space-y-1 sm:space-y-1.5" aria-labelledby="footer-services-heading">
                {serviceLinks.map((l, i) => (
                  <li key={`${l.label}-${i}`}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-[44px] items-center text-left text-[13px] text-zinc-400 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.32,1)] hover:text-zinc-100 motion-safe:hover:translate-x-0.5 sm:min-h-0 sm:text-sm"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p
                id="footer-social-heading"
                className="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500"
              >
                {footer.follow}
              </p>
              <p id="footer-social-note" className="sr-only">
                {footer.socialAria}
              </p>
              <ul
                className="mt-6 flex flex-wrap gap-3"
                aria-labelledby="footer-social-heading"
                aria-describedby="footer-social-note"
              >
                {socialIcons.map(({ Icon, label }) => (
                  <li key={label}>
                    <span className="lunov-social-slot" aria-hidden title={label}>
                      <Icon className="size-[18px]" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mt-14 flex flex-col gap-5 border-t border-white/[0.045] pt-9 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-10">
          <p className="text-[11px] tracking-[0.02em] text-zinc-600">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <p className="text-[11px] leading-relaxed tracking-wide text-zinc-600 sm:text-right">
            {footer.closing}{" "}
            <span className="text-lime/85" aria-hidden>
              ♥
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
