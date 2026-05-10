import Link from "next/link";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "./icons";

export function Cta() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.06] bg-black px-4 py-20 sm:scroll-mt-28 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-zinc-900/90 via-[#111111] to-black px-6 py-14 shadow-[0_0_80px_-40px_rgba(212,255,63,0.22)] transition-shadow duration-500 ease-out hover:shadow-[0_0_96px_-36px_rgba(212,255,63,0.28)] sm:px-12 sm:py-16 lg:px-16">
          <div
            className="lunov-cta-glow-drift pointer-events-none absolute -right-24 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,255,63,0.13),transparent_65%)]"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime">
                Ready to build something great?
              </p>
              <h2
                id="cta-heading"
                className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                Let&apos;s create something amazing.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
                Have an idea or a project in mind? Tell us what you&apos;re
                aiming for — timeline, audience, and success metrics — and
                we&apos;ll propose a focused path forward.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="mailto:hello@lunov.studio"
                  className="group/link inline-flex items-center gap-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:text-lime"
                >
                  <span className="inline-flex rounded-lg bg-lime/10 p-2 text-lime ring-1 ring-lime/25 transition duration-300 ease-out group-hover/link:ring-lime/38 group-hover/link:shadow-[0_0_18px_-8px_rgba(212,255,63,0.35)]">
                    <MailIcon className="size-5" />
                  </span>
                  hello@lunov.studio
                </a>
                <a
                  href="tel:+46701234567"
                  className="group/link inline-flex items-center gap-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:text-lime"
                >
                  <span className="inline-flex rounded-lg bg-lime/10 p-2 text-lime ring-1 ring-lime/25 transition duration-300 ease-out group-hover/link:ring-lime/38 group-hover/link:shadow-[0_0_18px_-8px_rgba(212,255,63,0.35)]">
                    <PhoneIcon className="size-5" />
                  </span>
                  +46 70 123 45 67
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Link
                href="mailto:hello@lunov.studio"
                className="lunov-btn-primary group inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_44px_-10px_rgba(212,255,63,0.55)] transition duration-300 ease-out hover:shadow-[0_0_56px_-8px_rgba(212,255,63,0.62)] motion-safe:hover:-translate-y-px active:scale-[0.98] sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  Get in touch
                  <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
