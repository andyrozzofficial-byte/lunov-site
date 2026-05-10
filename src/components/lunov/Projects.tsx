import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/types";
import { ArrowRightIcon } from "./icons";

type ProjectsProps = {
  locale: Locale;
  copy: Messages["projects"];
};

const accents = [
  {
    gradient: "from-zinc-800 via-zinc-950 to-black",
    overlayClass:
      "bg-[conic-gradient(from_180deg_at_50%_50%,rgba(212,255,63,0.16),transparent_55%)] opacity-90 mix-blend-screen",
    meterWidth: "w-[72%]",
  },
  {
    gradient: "from-indigo-950/88 via-black to-black",
    overlayClass:
      "bg-[radial-gradient(circle_at_30%_20%,rgba(212,255,63,0.22),transparent_55%)] opacity-85",
    meterWidth: "w-[88%]",
  },
  {
    gradient: "from-emerald-950/55 via-black to-zinc-950",
    overlayClass:
      "bg-[linear-gradient(135deg,rgba(212,255,63,0.14),transparent_45%)] opacity-90",
    meterWidth: "w-[64%]",
  },
] as const;

export function Projects({ locale, copy }: ProjectsProps) {
  const prefix = `/${locale}`;

  return (
    <section
      id="projects"
      className="lunov-section relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-surface px-4 sm:scroll-mt-28 sm:px-6 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-lime sm:text-xs sm:tracking-[0.35em]">
              {copy.eyebrow}
            </p>
            <h2
              id="projects-heading"
              className="font-display mt-3 text-[clamp(1.65rem,4vw,2.25rem)] font-bold leading-[1.12] tracking-tight text-white sm:leading-[1.1]"
            >
              {copy.heading}
            </h2>
          </div>
          <Link
            href={`${prefix}#contact`}
            className="group/link inline-flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[0.22em] text-lime transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white sm:self-auto sm:text-xs"
          >
            {copy.cta}
            <ArrowRightIcon className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-1 group-hover/link:text-lime/90" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {copy.items.map((p, i) => {
            const a = accents[i]!;
            return (
              <article
                key={p.title}
                className="lunov-card-premium group relative overflow-hidden rounded-2xl border border-white/[0.065] bg-black shadow-[0_4px_28px_-14px_rgba(0,0,0,0.55)] before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:rounded-2xl before:opacity-0 before:shadow-[inset_0_0_0_1px_rgba(212,255,63,0)] before:transition-opacity before:duration-[640ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/[0.11] hover:shadow-[0_32px_64px_-36px_rgba(212,255,63,0.14),0_24px_48px_-28px_rgba(0,0,0,0.65)] hover:before:opacity-100 hover:before:shadow-[inset_0_0_0_1px_rgba(212,255,63,0.09)] motion-safe:hover:-translate-y-1"
              >
                <Link
                  href={`${prefix}#contact`}
                  className="relative z-[1] block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="relative overflow-hidden">
                    <div
                      className={`relative aspect-[16/10] origin-center bg-gradient-to-br transition-[transform] duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03] ${a.gradient}`}
                    >
                      <div
                        className={`absolute inset-0 transition-opacity duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 ${a.overlayClass}`}
                        aria-hidden
                      />
                      <div
                        className="absolute inset-0 opacity-[0.065]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                        aria-hidden
                      />
                      <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/[0.085] bg-black/42 p-3.5 shadow-inner backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 sm:text-[9px]">
                                {p.meterLabel}
                              </span>
                              <span className="font-mono text-[9px] tabular-nums text-zinc-400 sm:text-[10px]">
                                {p.meterValue}
                              </span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-white/[0.09]">
                              <div
                                className={`h-full rounded-full bg-lime/85 shadow-[0_0_14px_rgba(212,255,63,0.32)] transition-[width,filter] duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-105 ${a.meterWidth} motion-safe:group-hover:w-[82%]`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6 sm:p-7">
                    <div className="min-w-0">
                      <h3 className="font-display text-[17px] font-semibold leading-snug text-white sm:text-lg">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-zinc-400 sm:text-sm">
                        {p.description}
                      </p>
                    </div>
                    <span className="mt-1 inline-flex shrink-0 rounded-full border border-lime/22 bg-lime/[0.09] p-2 text-lime shadow-[0_0_22px_-10px_rgba(212,255,63,0.35)] transition-[border-color,background-color,transform,box-shadow] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-lime/32 group-hover:bg-lime/14 group-hover:shadow-[0_0_28px_-8px_rgba(212,255,63,0.42)] motion-safe:group-hover:scale-105">
                      <ArrowRightIcon className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-px" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
