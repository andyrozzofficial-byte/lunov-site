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
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="group flex shrink-0 items-start gap-1.5"
          onClick={() => setOpen(false)}
        >
          <div className="leading-none">
            <span className="font-display flex items-center gap-1 text-lg font-bold tracking-[0.2em] text-white sm:text-xl">
              LUNO
              <span className="relative inline-flex">
                V
                <SparkleIcon className="absolute -right-3 top-0 size-3 text-lime sm:size-3.5" />
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
                className="relative text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 right-0 mx-auto h-px rounded-full bg-lime transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
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
            className="hidden rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/5 sm:inline-flex sm:items-center sm:gap-2"
          >
            Get in touch
            <span aria-hidden className="text-lime">
              →
            </span>
          </Link>

          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 bg-white transition ${open ? "-translate-y-1/2 rotate-45" : "-translate-y-[5px]"}`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 bg-white transition ${open ? "-translate-y-1/2 -rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-white/[0.06] bg-black/95 lg:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Mobile primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            Get in touch <span className="text-lime">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
