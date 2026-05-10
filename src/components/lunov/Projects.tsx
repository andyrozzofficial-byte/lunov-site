import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/types";
import { ArrowRightIcon } from "./icons";

type ProjectsProps = {
  locale: Locale;
  copy: Messages["projects"];
};

/** Preview assets — order matches `copy.items` in dictionaries (sv/en). */
const projectPreviews = [
  {
    src: "/images/projects/mastrify.webp",
    meterWidth: "w-[72%]",
  },
  {
    src: "/images/projects/soder-entertainment.webp",
    meterWidth: "w-[76%]",
  },
  {
    src: "/images/projects/ai-music-registry.webp",
    meterWidth: "w-[84%]",
  },
] as const;

export function Projects({ locale, copy }: ProjectsProps) {
  const prefix = `/${locale}`;

  return (
    <section
      id="projects"
      className="lunov-section relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-surface px-[clamp(1rem,4vw,2rem)] sm:scroll-mt-28 sm:px-6 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="relative z-[1] mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-lime sm:text-xs sm:tracking-[0.35em]">
              {copy.eyebrow}
            </p>
            <h2
              id="projects-heading"
              className="font-display mt-3 text-[clamp(1.65rem,4.2vw,2.25rem)] font-bold leading-[1.12] tracking-tight text-white sm:leading-[1.1]"
            >
              {copy.heading}
            </h2>
          </div>
          <Link
            href={`${prefix}#contact`}
            className="group/link inline-flex min-h-[44px] items-center gap-2 self-start rounded-full py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-lime transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white sm:min-h-0 sm:self-auto sm:text-xs"
          >
            {copy.cta}
            <ArrowRightIcon className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.32,1)] group-hover/link:translate-x-1 group-hover/link:text-lime/90" />
          </Link>
        </div>

        <div className="mt-11 grid gap-6 sm:mt-14 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {copy.items.map((p, i) => {
            const visual = projectPreviews[i]!;
            return (
              <article
                key={p.title}
                className="lunov-project-card lunov-card-premium group relative overflow-hidden rounded-2xl border border-white/[0.065] bg-black shadow-[0_4px_28px_-14px_rgba(0,0,0,0.55)] before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:rounded-2xl before:opacity-0 before:shadow-[inset_0_0_0_1px_rgba(212,255,63,0)] before:transition-opacity before:duration-[720ms] before:ease-[cubic-bezier(0.16,1,0.32,1)] motion-safe:hover:-translate-y-[5px] hover:border-white/[0.12] hover:shadow-[0_36px_72px_-38px_rgba(212,255,63,0.16),0_28px_56px_-30px_rgba(0,0,0,0.68)] hover:before:opacity-100 hover:before:shadow-[inset_0_0_0_1px_rgba(212,255,63,0.1)] max-sm:motion-safe:hover:-translate-y-1"
              >
                <div
                  className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-[780ms] ease-[cubic-bezier(0.16,1,0.32,1)] motion-safe:group-hover:opacity-100"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 70% at 50% 18%, rgba(212,255,63,0.14), transparent 68%)",
                  }}
                />
                <Link
                  href={`${prefix}#contact`}
                  className="relative z-[1] block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="relative overflow-hidden rounded-t-2xl bg-zinc-950">
                    <div
                      className="lunov-project-preview-wrap relative aspect-[16/10] origin-center overflow-hidden rounded-t-2xl transition-[box-shadow] duration-[780ms] ease-[cubic-bezier(0.16,1,0.32,1)] lg:aspect-auto lg:min-h-[min(300px,28vw)] lg:max-h-[320px] lg:h-[min(300px,28vw)]"
                    >
                      <span
                        className="lunov-project-rim pointer-events-none absolute inset-0 z-[3] rounded-t-2xl ring-1 ring-inset ring-white/[0.07] opacity-70 transition-opacity duration-[780ms] ease-[cubic-bezier(0.16,1,0.32,1)] motion-safe:group-hover:opacity-100"
                        aria-hidden
                      />
                      <Image
                        src={visual.src}
                        alt={p.imageAlt}
                        fill
                        sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 34vw"
                        className="object-cover object-top transition-[transform,filter] duration-[880ms] ease-[cubic-bezier(0.16,1,0.32,1)] motion-safe:group-hover:scale-[1.045] motion-safe:group-hover:brightness-[1.03]"
                        priority={i === 0}
                      />
                      <div
                        className="lunov-project-shine pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(118deg,transparent_42%,rgba(212,255,63,0.075)_50%,transparent_58%)] opacity-0 transition-opacity duration-[780ms] ease-[cubic-bezier(0.16,1,0.32,1)]"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/38 to-black/10 opacity-[0.93]"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-lime/[0.07] via-transparent to-transparent opacity-60 mix-blend-screen transition-opacity duration-[780ms] ease-[cubic-bezier(0.16,1,0.32,1)] motion-safe:group-hover:opacity-[0.85]"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.035]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                        aria-hidden
                      />
                      <div className="absolute inset-x-4 bottom-4 z-[4] rounded-xl border border-white/[0.1] bg-black/58 p-3.5 shadow-inner backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-4">
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
                                className={`h-full rounded-full bg-lime/85 shadow-[0_0_14px_rgba(212,255,63,0.32)] transition-[width,filter] duration-[780ms] ease-[cubic-bezier(0.16,1,0.32,1)] motion-safe:group-hover:brightness-110 ${visual.meterWidth} motion-safe:group-hover:w-[82%]`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4 px-5 pb-6 pt-5 sm:p-7">
                    <div className="min-w-0">
                      <h3 className="font-display text-[17px] font-semibold leading-snug text-white sm:text-lg">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-zinc-400 sm:text-sm">
                        {p.description}
                      </p>
                    </div>
                    <span className="mt-1 inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-lime/22 bg-lime/[0.09] text-lime shadow-[0_0_22px_-10px_rgba(212,255,63,0.35)] transition-[border-color,background-color,transform,box-shadow] duration-[720ms] ease-[cubic-bezier(0.16,1,0.32,1)] group-hover:border-lime/34 group-hover:bg-lime/14 group-hover:shadow-[0_0_32px_-8px_rgba(212,255,63,0.45)] motion-safe:group-hover:scale-105 sm:mt-1 sm:min-h-0 sm:min-w-0 sm:p-2">
                      <ArrowRightIcon className="size-4 transition-transform duration-[680ms] ease-[cubic-bezier(0.16,1,0.32,1)] motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-px" />
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
