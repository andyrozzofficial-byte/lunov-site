import type { Messages } from "@/i18n/types";

type AboutProps = {
  copy: Messages["about"];
};

export function About({ copy }: AboutProps) {
  const stats = [
    copy.stats.delivery,
    copy.stats.focus,
    copy.stats.surface,
  ] as const;

  return (
    <section
      id="about"
      className="lunov-section relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-black px-4 sm:scroll-mt-28 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-lime sm:text-xs sm:tracking-[0.35em]">
              {copy.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="font-display mt-3 text-[clamp(1.65rem,4vw,2.25rem)] font-bold leading-[1.12] tracking-tight text-white sm:leading-[1.1]"
            >
              {copy.heading}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[15px] leading-[1.72] text-zinc-400 sm:text-lg sm:leading-[1.68]">
              {copy.body}
            </p>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:gap-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="lunov-card-premium rounded-2xl border border-white/[0.065] bg-surface/78 px-5 py-4 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.4)] transition-[transform,box-shadow,border-color] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/[0.1] hover:bg-surface/90 hover:shadow-[0_24px_48px_-30px_rgba(0,0,0,0.62)] motion-safe:hover:-translate-y-0.5"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
                    {s.label}
                  </dt>
                  <dd className="font-display mt-2 text-[clamp(1.35rem,3.5vw,1.5rem)] font-bold text-white">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
