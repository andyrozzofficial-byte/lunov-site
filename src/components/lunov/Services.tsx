import {
  CodeIcon,
  DatabaseIcon,
  DevicePhoneIcon,
  GlobeIcon,
} from "./icons";
import type { Messages } from "@/i18n/types";

type ServicesProps = {
  copy: Messages["services"];
};

const icons = [GlobeIcon, DevicePhoneIcon, CodeIcon, DatabaseIcon] as const;

export function Services({ copy }: ServicesProps) {
  return (
    <section
      id="services"
      className="lunov-section relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-black px-4 sm:scroll-mt-28 sm:px-6 lg:px-8"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-lime sm:text-xs sm:tracking-[0.35em]">
              {copy.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="font-display mt-3 text-[clamp(1.65rem,4vw,2.25rem)] font-bold leading-[1.12] tracking-tight text-white sm:leading-[1.1]"
            >
              {copy.heading}
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-[1.72] text-zinc-400 lg:text-right lg:text-[15px] lg:leading-[1.68]">
            {copy.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-5">
          {copy.items.map((item, i) => {
            const Icon = icons[i]!;
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-white/[0.065] bg-card/78 p-6 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.45)] transition-[transform,box-shadow,border-color,background-color] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-lime/28 hover:bg-card/92 hover:shadow-[0_28px_56px_-32px_rgba(0,0,0,0.82),0_0_0_1px_rgba(212,255,63,0.055),0_0_40px_-22px_rgba(212,255,63,0.06)] motion-safe:hover:-translate-y-1 sm:p-7"
              >
                <div className="mb-5 inline-flex rounded-xl bg-lime-dim p-3 text-lime ring-1 ring-lime/18 transition-[box-shadow,ring-color] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ring-lime/38 group-hover:shadow-[0_0_22px_-8px_rgba(212,255,63,0.2)]">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-[17px] font-semibold leading-snug text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-zinc-400 sm:text-sm">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
