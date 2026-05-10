import Link from "next/link";
import { ArrowRightIcon } from "./icons";

const projects = [
  {
    title: "Lunov mastering platform",
    description:
      "Artist tooling with realtime previews and streamlined delivery.",
    gradient: "from-zinc-800 via-zinc-950 to-black",
    overlayClass:
      "bg-[conic-gradient(from_180deg_at_50%_50%,rgba(212,255,63,0.16),transparent_55%)] opacity-90 mix-blend-screen",
  },
  {
    title: "Northline commerce",
    description:
      "Composable storefront experience with sub-second interaction targets.",
    gradient: "from-indigo-950/90 via-black to-black",
    overlayClass:
      "bg-[radial-gradient(circle_at_30%_20%,rgba(212,255,63,0.22),transparent_55%)] opacity-85",
  },
  {
    title: "Atlas analytics hub",
    description:
      "Executive dashboards that stay legible under heavy data density.",
    gradient: "from-emerald-950/60 via-black to-zinc-950",
    overlayClass:
      "bg-[linear-gradient(135deg,rgba(212,255,63,0.14),transparent_45%)] opacity-90",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-white/[0.06] bg-surface py-20 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime">
              Featured projects
            </p>
            <h2
              id="projects-heading"
              className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Some things we&apos;re proud of.
            </h2>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.22em] text-lime transition hover:text-white sm:self-auto"
          >
            View all projects
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-black transition hover:border-white/[0.14]"
            >
              <Link
                href="#contact"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.gradient}`}
                >
                  <div
                    className={`absolute inset-0 transition group-hover:opacity-100 ${p.overlayClass}`}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-2 flex-1 rounded-full bg-white/10">
                        <div className="h-full w-2/5 rounded-full bg-lime/90" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        Live
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400">{p.description}</p>
                  </div>
                  <span className="mt-1 inline-flex rounded-full border border-lime/25 bg-lime/10 p-2 text-lime transition group-hover:bg-lime/15">
                    <ArrowRightIcon className="size-4" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
