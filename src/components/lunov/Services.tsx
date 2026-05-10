import {
  CodeIcon,
  DatabaseIcon,
  DevicePhoneIcon,
  GlobeIcon,
} from "./icons";

const items = [
  {
    title: "Websites & flagship products",
    description:
      "Campaign-grade marketing sites and narrative product storytelling — fast, accessible, and engineered so design intent survives launch week.",
    Icon: GlobeIcon,
  },
  {
    title: "Apps & realtime surfaces",
    description:
      "Cross-platform clients and live dashboards — thoughtful state handling, resilient streaming, and UX that stays legible when data moves quickly.",
    Icon: DevicePhoneIcon,
  },
  {
    title: "AI-assisted workflows",
    description:
      "Grounded assistive features: retrieval-aware tooling, review queues, and automation that amplifies operators instead of replacing judgment.",
    Icon: CodeIcon,
  },
  {
    title: "Infrastructure & automation",
    description:
      "Upload pipelines, registries, booking and admin backends, observability, and the glue services that keep creative SaaS predictable at scale.",
    Icon: DatabaseIcon,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-black px-4 py-24 sm:scroll-mt-28 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime">
              What we do
            </p>
            <h2
              id="services-heading"
              className="font-display mt-3 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl sm:leading-[1.1]"
            >
              Full-stack creative technology
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.68] text-zinc-400 lg:text-right lg:text-base lg:leading-[1.65]">
            From public-facing sites to internal consoles — the same restraint,
            typography, and engineering discipline whether we&apos;re shipping a
            brand moment or a rights ledger behind it.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 lg:gap-x-6">
          {items.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="group rounded-2xl border border-white/[0.065] bg-card/78 p-6 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.45)] transition-[transform,box-shadow,border-color,background-color] duration-500 ease-out hover:border-lime/28 hover:bg-card/92 hover:shadow-[0_28px_56px_-32px_rgba(0,0,0,0.82),0_0_0_1px_rgba(212,255,63,0.055),0_0_40px_-22px_rgba(212,255,63,0.06)] motion-safe:hover:-translate-y-1 sm:p-7"
            >
              <div className="mb-5 inline-flex rounded-xl bg-lime-dim p-3 text-lime ring-1 ring-lime/18 transition duration-500 ease-out group-hover:ring-lime/38 group-hover:shadow-[0_0_22px_-8px_rgba(212,255,63,0.2)]">
                <Icon className="size-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
