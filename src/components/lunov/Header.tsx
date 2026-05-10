"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SparkleIcon } from "./icons";

const nav = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About us" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-14% 0px -32% 0px",
        threshold: [0, 0.08, 0.15, 0.35, 0.55, 1],
      },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/72 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 ease-out supports-[backdrop-filter]:bg-black/55">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="group flex shrink-0 items-start gap-1.5 outline-none transition-opacity duration-200 hover:opacity-90"
          onClick={() => setOpen(false)}
        >
          <div className="leading-none">
            <span className="font-display flex items-center gap-1 text-lg font-bold tracking-[0.2em] text-white transition-colors duration-200 sm:text-xl">
              LUNO
              <span className="relative inline-flex">
                V
                <SparkleIcon className="absolute -right-3 top-0 size-3 text-lime transition-[filter,opacity] duration-300 group-hover:opacity-95 group-hover:drop-shadow-[0_0_10px_rgba(212,255,63,0.35)] sm:size-3.5" />
              </span>
            </span>
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500">
              Digital studio
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ease-out ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 mx-auto h-px rounded-full bg-lime shadow-[0_0_12px_rgba(212,255,63,0.35)] transition-opacity duration-300 ease-out ${
                    isActive ? "opacity-100" : "opacity-0 hover:opacity-40"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="lunov-btn-primary group hidden rounded-full border border-white/22 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_-14px_rgba(212,255,63,0.12)] transition duration-300 ease-out hover:border-white/35 hover:bg-white/[0.06] hover:shadow-[0_0_28px_-12px_rgba(212,255,63,0.2)] active:scale-[0.98] sm:inline-flex sm:items-center sm:gap-2"
          >
            <span className="inline-flex items-center gap-2">
              Get in touch
              <span aria-hidden className="text-lime transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>

          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.04]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 bg-white transition duration-300 ease-out ${open ? "-translate-y-1/2 rotate-45" : "-translate-y-[5px]"}`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 bg-white transition duration-300 ease-out ${open ? "-translate-y-1/2 -rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-white/[0.06] bg-black/95 backdrop-blur-xl lg:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Mobile primary"
        >
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg border-l-2 px-3 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
                  isActive
                    ? "border-lime bg-white/[0.05] text-white"
                    : "border-transparent text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="lunov-btn-primary mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:border-white/38 hover:bg-white/[0.06]"
          >
            <span className="inline-flex items-center gap-2">
              Get in touch <span className="text-lime">→</span>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
