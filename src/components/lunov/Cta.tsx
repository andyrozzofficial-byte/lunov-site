import Link from "next/link";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "./icons";

export function Cta() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-black px-4 pb-24 pt-20 sm:scroll-mt-28 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-32 lg:pt-28"
      aria-labelledby="cta-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 lunov-divider-top opacity-90" aria-hidden />
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.065] bg-gradient-to-br from-zinc-900/88 via-[#101010] to-black px-6 py-14 shadow-[0_0_72px_-42px_rgba(212,255,63,0.18)] transition-[box-shadow,border-color] duration-500 ease-out hover:border-white/[0.08] hover:shadow-[0_0_88px_-38px_rgba(212,255,63,0.22)] sm:rounded-[2rem] sm:px-12 sm:py-16 lg:px-16">
          <div
            className="lunov-cta-glow-drift pointer-events-none absolute -right-28 top-1/2 size-[440px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,255,63,0.11),transparent_66%)]"
            aria-hidden
          />

          <div className="relative grid gap-11 text-center lg:grid-cols-12 lg:gap-12 lg:items-center lg:text-left">
            <div className="mx-auto max-w-xl lg:col-span-7 lg:mx-0">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime">
                Ready to build something great?
              </p>
              <h2
                id="cta-heading"
                className="font-display mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl sm:leading-[1.08] lg:text-5xl"
              >
                Let&apos;s create something amazing.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-[1.68] text-zinc-400 lg:mx-0 lg:leading-[1.65]">
                Have an idea or a project in mind? Tell us what you&apos;re
                aiming for — timeline, audience, and success metrics — and
                we&apos;ll propose a focused path forward.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <a
                  href="mailto:hello@lunov.studio"
                  className="group/link inline-flex items-center gap-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:text-lime"
                >
                  <span className="inline-flex rounded-lg bg-lime/[0.09] p-2 text-lime ring-1 ring-lime/22 transition-[box-shadow,ring-color] duration-300 ease-out group-hover/link:ring-lime/34 group-hover/link:shadow-[0_0_20px_-10px_rgba(212,255,63,0.32)]">
                    <MailIcon className="size-5" />
                  </span>
                  hello@lunov.studio
                </a>
                <a
                  href="tel:+46701234567"
                  className="group/link inline-flex items-center gap-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:text-lime"
                >
                  <span className="inline-flex rounded-lg bg-lime/[0.09] p-2 text-lime ring-1 ring-lime/22 transition-[box-shadow,ring-color] duration-300 ease-out group-hover/link:ring-lime/34 group-hover/link:shadow-[0_0_20px_-10px_rgba(212,255,63,0.32)]">
                    <PhoneIcon className="size-5" />
                  </span>
                  +46 70 123 45 67
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <Link
                href="mailto:hello@lunov.studio"
                className="lunov-btn-primary group inline-flex w-full max-w-[340px] items-center justify-center gap-2 rounded-full bg-lime px-9 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_44px_-12px_rgba(212,255,63,0.48)] transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_0_58px_-10px_rgba(212,255,63,0.52)] motion-safe:hover:-translate-y-px sm:max-w-none lg:w-auto lg:max-w-[280px]"
              >
                <span className="inline-flex items-center gap-2">
                  Get in touch
                  <ArrowRightIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
