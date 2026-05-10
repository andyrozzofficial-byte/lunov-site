import Link from "next/link";
import {
  CONTACT_MAILTO_HREF,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
} from "@/contact";
import type { Messages } from "@/i18n/types";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "./icons";

type CtaProps = {
  copy: Messages["cta"];
};

export function Cta({ copy }: CtaProps) {
  return (
    <section
      id="contact"
      className="lunov-section relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-black px-[clamp(1rem,4vw,2rem)] pb-[clamp(4.5rem,11vw,8rem)] pt-[clamp(4rem,10vw,7rem)] sm:scroll-mt-28 sm:px-6 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 lunov-divider-top opacity-90" aria-hidden />
      <div className="relative z-[1] mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.065] bg-gradient-to-br from-zinc-900/88 via-[#101010] to-black px-5 py-12 shadow-[0_0_72px_-42px_rgba(212,255,63,0.18)] transition-[box-shadow,border-color] duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/[0.08] hover:shadow-[0_0_88px_-38px_rgba(212,255,63,0.22)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div
            className="lunov-cta-glow-drift pointer-events-none absolute -right-28 top-1/2 size-[440px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,255,63,0.11),transparent_66%)]"
            aria-hidden
          />

          <div className="relative grid gap-10 text-center lg:grid-cols-12 lg:gap-12 lg:items-center lg:text-left">
            <div className="mx-auto max-w-xl lg:col-span-7 lg:mx-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-lime sm:text-xs sm:tracking-[0.35em]">
                {copy.eyebrow}
              </p>
              <h2
                id="cta-heading"
                className="font-display mt-4 text-[clamp(1.65rem,4.5vw,3rem)] font-bold leading-[1.12] tracking-tight text-white sm:leading-[1.08]"
              >
                {copy.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.72] text-zinc-400 lg:mx-0 lg:text-base lg:leading-[1.68]">
                {copy.body}
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <a
                  href={CONTACT_MAILTO_HREF}
                  className="group/link inline-flex items-center gap-3 text-sm font-medium text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-lime"
                >
                  <span className="inline-flex rounded-lg bg-lime/[0.09] p-2 text-lime ring-1 ring-lime/22 transition-[box-shadow,ring-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:ring-lime/34 group-hover/link:shadow-[0_0_20px_-10px_rgba(212,255,63,0.32)]">
                    <MailIcon className="size-5" />
                  </span>
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={CONTACT_PHONE_TEL_HREF}
                  className="group/link inline-flex items-center gap-3 text-sm font-medium text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-lime"
                >
                  <span className="inline-flex rounded-lg bg-lime/[0.09] p-2 text-lime ring-1 ring-lime/22 transition-[box-shadow,ring-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:ring-lime/34 group-hover/link:shadow-[0_0_20px_-10px_rgba(212,255,63,0.32)]">
                    <PhoneIcon className="size-5" />
                  </span>
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <Link
                href={CONTACT_MAILTO_HREF}
                className="lunov-btn-primary lunov-btn-solid group inline-flex min-h-[48px] w-full max-w-[340px] items-center justify-center gap-2 rounded-full bg-lime px-9 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_44px_-12px_rgba(212,255,63,0.48)] motion-safe:hover:-translate-y-px sm:max-w-none sm:min-h-[52px] lg:w-auto lg:max-w-[280px] sm:text-sm"
              >
                <span className="inline-flex items-center gap-2">
                  {copy.button}
                  <ArrowRightIcon className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
