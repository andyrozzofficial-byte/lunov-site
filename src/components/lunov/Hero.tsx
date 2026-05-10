"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ArrowRightIcon } from "./icons";
import { HeroLaptopMockup } from "./HeroLaptopMockup";

const avatars = [
  { bg: "from-violet-500/80 to-fuchsia-600/60", initials: "AR" },
  { bg: "from-emerald-500/70 to-teal-600/50", initials: "JK" },
  { bg: "from-amber-500/70 to-orange-600/50", initials: "MN" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

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
      {/* Depth layers — parallax via --hero-hx / --hero-hy on section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="lunov-hero-parallax absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(212,255,63,0.13),transparent_56%)] transition-[transform] duration-500 ease-out will-change-transform max-md:duration-[580ms]"
          style={{
            transform:
              "translate3d(calc(var(--hero-hx) * 18px), calc(var(--hero-hy) * 14px), 0)",
          }}
        />
        <div
          className="lunov-hero-parallax absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_42%,rgba(255,255,255,0.055),transparent_52%)] transition-[transform] duration-700 ease-out will-change-transform"
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

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-[4.25rem] pb-[6rem] sm:gap-11 sm:px-6 sm:pt-24 sm:pb-28 md:grid-cols-2 md:items-center md:gap-x-11 md:gap-y-10 md:pb-[7.5rem] md:pt-28 lg:gap-x-14 lg:gap-y-11 lg:pb-[8.25rem] lg:pt-[7.5rem] lg:px-8">
        <div className="max-w-xl md:min-w-0">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-lime sm:mb-4">
            Web. Design. Systems.
          </p>
          <h1
            id="hero-heading"
            className="font-display text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-[2.35rem] sm:leading-[1.06] md:text-5xl lg:text-[2.875rem] lg:leading-[1.06] xl:text-[3.125rem]"
          >
            Digital experiences built to{" "}
            <span className="text-lime">perform.</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-[1.68] text-zinc-400 sm:mt-6 sm:text-lg sm:leading-[1.65]">
            We partner with ambitious teams to ship fast, accessible interfaces
            and resilient foundations — from brand-critical marketing sites to
            product surfaces your users rely on every day.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#services"
              className="lunov-btn-primary group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_48px_-14px_rgba(212,255,63,0.42)] transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_0_56px_-10px_rgba(212,255,63,0.48)] motion-safe:hover:-translate-y-px"
            >
              <span className="inline-flex items-center gap-2">
                Our services
                <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.18] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-[border-color,background-color,box-shadow,transform] duration-500 ease-out hover:border-white/30 hover:bg-white/[0.055] hover:shadow-[0_0_32px_-18px_rgba(255,255,255,0.09)] motion-safe:hover:-translate-y-px"
            >
              View projects
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
            <div className="flex -space-x-3">
              {avatars.map((a, i) => (
                <span
                  key={i}
                  className={`relative inline-flex size-10 items-center justify-center rounded-full border border-black bg-gradient-to-br ${a.bg} text-[10px] font-bold text-white ring-2 ring-black transition duration-300 ease-out hover:z-10 hover:ring-white/15`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="max-w-[220px] text-sm leading-snug text-zinc-500">
              Trusted by creators and businesses around the world.
            </p>
          </div>
        </div>

        <div
          className="lunov-hero-parallax min-w-0 transition-[transform] duration-500 ease-out will-change-transform md:flex md:justify-end md:self-center"
          style={{
            transform:
              "translate3d(calc(var(--hero-hx) * 10px), calc(var(--hero-hy) * 8px), 0)",
          }}
        >
          <HeroLaptopMockup />
        </div>
      </div>
    </section>
  );
}
