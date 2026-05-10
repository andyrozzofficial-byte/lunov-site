export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.06] bg-black px-4 py-20 sm:scroll-mt-28 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime">
              About us
            </p>
            <h2
              id="about-heading"
              className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              A studio obsessed with craft — and outcomes.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
              LUNOV is a lean digital studio focused on high-performance web.
              We collaborate closely with founders and marketing leads to align
              brand direction with engineering reality — fewer handoffs, fewer
              surprises, and launches that hold up after day one.
            </p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 px-5 py-4 shadow-black/20 transition duration-300 ease-out hover:border-white/[0.12] hover:bg-surface hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.65)] motion-safe:hover:-translate-y-px">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Delivery
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold text-white">
                  Sprint-based
                </dd>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 px-5 py-4 shadow-black/20 transition duration-300 ease-out hover:border-white/[0.12] hover:bg-surface hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.65)] motion-safe:hover:-translate-y-px">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Focus
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold text-white">
                  Speed + polish
                </dd>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 px-5 py-4 shadow-black/20 transition duration-300 ease-out hover:border-white/[0.12] hover:bg-surface hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.65)] motion-safe:hover:-translate-y-px">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Stack
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold text-white">
                  Modern web
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
