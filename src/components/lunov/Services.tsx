import {
  CodeIcon,
  DatabaseIcon,
  DevicePhoneIcon,
  GlobeIcon,
} from "./icons";

const items = [
  {
    title: "Web design",
    description:
      "Interfaces that feel intentional — typography, motion, and hierarchy tuned for clarity and conversion.",
    Icon: GlobeIcon,
  },
  {
    title: "Web development",
    description:
      "Modern frontends with disciplined performance budgets, accessibility, and maintainable architecture.",
    Icon: CodeIcon,
  },
  {
    title: "Systems & integration",
    description:
      "CMS, APIs, and automation that keep content and data flowing without slowing your team down.",
    Icon: DatabaseIcon,
  },
  {
    title: "Product & mobile",
    description:
      "Responsive product surfaces and focused mobile experiences that stay sharp across breakpoints.",
    Icon: DevicePhoneIcon,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.06] bg-black px-4 pt-24 pb-20 sm:scroll-mt-28 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8 lg:pt-32 lg:pb-24"
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
              className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Services that make the difference
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400 lg:text-right lg:text-base">
            Strategy, craft, and engineering in one studio — so your launch
            timeline stays realistic and the output stays exceptional.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="group rounded-2xl border border-white/[0.08] bg-card/80 p-6 shadow-black/20 transition duration-300 ease-out hover:border-lime/30 hover:bg-card hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.85),0_0_0_1px_rgba(212,255,63,0.06)] motion-safe:hover:-translate-y-0.5 sm:p-7"
            >
              <div className="mb-5 inline-flex rounded-xl bg-lime-dim p-3 text-lime ring-1 ring-lime/20 transition duration-300 ease-out group-hover:ring-lime/42 group-hover:shadow-[0_0_20px_-8px_rgba(212,255,63,0.22)]">
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
