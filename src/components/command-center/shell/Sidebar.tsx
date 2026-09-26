"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCalendar,
  IconClock,
  IconCurrency,
  IconFolder,
  IconOverview,
  IconUsers,
} from "../icons";

const navItems = [
  { href: "/command-center", label: "Översikt", icon: IconOverview, exact: true },
  { href: "/command-center/vecka", label: "Min vecka", icon: IconCalendar },
  { href: "/command-center/projekt", label: "Projekt", icon: IconFolder },
  { href: "/command-center/kundjobb", label: "Kundjobb", icon: IconUsers },
  { href: "/command-center/kostnader", label: "Kostnader", icon: IconCurrency },
  { href: "/command-center/intakter", label: "Intäkter", icon: IconCurrency },
  { href: "/command-center/vantar", label: "Väntar på", icon: IconClock },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="cc-sidebar flex w-[220px] shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-[72px] items-center gap-2.5 px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-lime/10 ring-1 ring-lime/25">
          <span className="font-display text-sm font-bold text-lime">L</span>
        </div>
        <span className="font-display text-lg font-bold tracking-tight">LUNOV</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-lime/10 text-lime"
                  : "text-muted hover:bg-white/[0.04] hover:text-foreground"
              }`}
            >
              <Icon className="size-[18px] shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="relative mx-3 mb-4 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div
          className="h-28 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(212,255,63,0.08) 0%, rgba(20,184,166,0.12) 50%, rgba(59,130,246,0.08) 100%)",
          }}
        />
        <p className="relative px-3 pb-3 text-[10px] leading-relaxed text-muted">
          Planera, Bygg,
          <br />
          Utveckla, Leverera.
        </p>
      </div>
    </aside>
  );
}
