"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ArrowRightIcon } from "./icons";
import { HeroLaptopMockup } from "./HeroLaptopMockup";

const avatars = [
  { bg: "from-violet-500/80 to-fuchsia-600/60", initials: "AR" },
  { bg: "from-emerald-500/70 to-teal-600/50", initials: "JK" },
  { bg: "from-amber-500/70 to-orange-600/50", initials: "MN" },
];

type HeroProps = {
  locale: Locale;
  messages: Messages;
};

export function Hero({ locale, messages }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const prefix = `/${locale}`;
  const { hero, heroMockup } = messages;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    let raf = 0;

    const apply = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      const hx = ((clientX - r.left) / Math.max(r.width, 1) - 0.5) * 2;
      const hy = ((clientY - r.top) / Math.max(r.height, 1) - 0.5) * 2;
      el.style.setProperty("--hero-hx", hx.toFixed(5));
      el.style.setProperty("--hero-hy", hy.toFixed(5));
    };

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => apply(e.clientX, e.clientY));
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--hero-hx", "0");
      el.style.setProperty("--hero-hy", "0");
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden pt-[72px] [--hero-hx:0] [--hero-hy:0]"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="lunov-hero-parallax absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(212,255,63,0.13),transparent_56%)] transition-[transform] duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform max-md:duration-[720ms]"
          style={{
            transform:
              "translate3d(calc(var(--hero-hx) * 18px), calc(var(--hero-hy) * 14px), 0)",
          }}
        />
        <div
          className="lunov-hero-parallax absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_42%,rgba(255,255,255,0.055),transparent_52%)] transition-[transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{
            transform:
              "translate3d(calc(var(--hero-hx) * -11px), calc(var(--hero-hy) * -9px), 0)",
          }}
        />
        <div
          className="lunov-hero-parallax absolute inset-x-[-15%] bottom-[-35%] top-[55%]"
          style={{
            transform:
              "translate3d(calc(var(--hero-hx) * 22px), calc(var(--hero-hy) * -10px), 0)",
          }}
        >
          <div className="lunov-ambient-float h-full w-full rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(212,255,63,0.08),transparent_68%)] blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,transparent_38%,rgba(0,0,0,0.38)_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-9 px-4 pt-[clamp(3.25rem,8vw,4.25rem)] pb-[clamp(4.5rem,11vw,6rem)] sm:gap-11 sm:px-6 sm:pb-[clamp(5rem,10vw,7rem)] md:grid-cols-2 md:items-center md:gap-x-10 md:gap-y-10 md:pt-[clamp(5rem,9vw,7rem)] md:pb-[clamp(5.5rem,12vw,7.5rem)] lg:gap-x-14 lg:gap-y-11 lg:pb-[clamp(6rem,11vw,8.25rem)] lg:pt-[clamp(6rem,10vw,7.5rem)] lg:px-8">
        <div className="max-w-xl md:min-w-0">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-lime sm:mb-3.5 sm:text-xs sm:tracking-[0.35em]">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-balance text-[clamp(1.85rem,5.5vw,3.125rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-white sm:leading-[1.05] md:tracking-tight"
          >
            {hero.titleBefore}{" "}
            <span className="text-lime">{hero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.72] text-zinc-400 sm:mt-6 sm:text-lg sm:leading-[1.68]">
            {hero.body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href={`${prefix}#services`}
              className="lunov-btn-primary group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-lime px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_48px_-14px_rgba(212,255,63,0.42)] transition-[transform,box-shadow] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_0_56px_-10px_rgba(212,255,63,0.48)] motion-safe:hover:-translate-y-px sm:text-sm"
            >
              <span className="inline-flex items-center gap-2">
                {hero.ctaPrimary}
                <ArrowRightIcon className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href={`${prefix}#projects`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/[0.18] px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-[border-color,background-color,box-shadow,transform] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/30 hover:bg-white/[0.055] hover:shadow-[0_0_32px_-18px_rgba(255,255,255,0.09)] motion-safe:hover:-translate-y-px sm:text-sm"
            >
              {hero.ctaSecondary}
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4 sm:mt-11">
            <div className="flex -space-x-3">
              {avatars.map((a, i) => (
                <span
                  key={i}
                  className={`relative inline-flex size-9 items-center justify-center rounded-full border border-black bg-gradient-to-br ${a.bg} text-[10px] font-bold text-white ring-2 ring-black transition-[transform,box-shadow,z-index] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:ring-white/15 motion-safe:hover:-translate-y-0.5 sm:size-10`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="max-w-[min(100%,280px)] text-[13px] leading-snug text-zinc-500 sm:text-sm">
              {hero.trust}
            </p>
          </div>
        </div>

        <div
          className="lunov-hero-parallax min-w-0 transition-[transform] duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:flex md:justify-end md:self-center"
          style={{
            transform:
              "translate3d(calc(var(--hero-hx) * 10px), calc(var(--hero-hy) * 8px), 0)",
          }}
        >
          <HeroLaptopMockup labels={heroMockup} />
        </div>
      </div>
    </section>
  );
}
