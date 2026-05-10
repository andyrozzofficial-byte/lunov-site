export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-black px-4 py-24 sm:scroll-mt-28 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
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
              className="font-display mt-3 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl sm:leading-[1.1]"
            >
              A studio for signal, systems, and calm interfaces.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-[1.68] text-zinc-400 sm:text-lg sm:leading-[1.65]">
              LUNOV is a small Nordic studio building software around audio
              production — mastering consoles, artist tooling, delivery rails,
              and the automation that keeps releases moving. We work shoulder
              to shoulder with engineers and product leads so interfaces match
              how sessions actually unfold: precise under pressure, quiet when
              idle.
            </p>
            <dl className="mt-12 grid gap-5 sm:grid-cols-3 sm:gap-6">
              <div className="rounded-2xl border border-white/[0.065] bg-surface/78 px-5 py-4 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.4)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:border-white/[0.1] hover:bg-surface/90 hover:shadow-[0_24px_48px_-30px_rgba(0,0,0,0.62)] motion-safe:hover:-translate-y-0.5">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Delivery
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold text-white">
                  Phased releases
                </dd>
              </div>
              <div className="rounded-2xl border border-white/[0.065] bg-surface/78 px-5 py-4 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.4)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:border-white/[0.1] hover:bg-surface/90 hover:shadow-[0_24px_48px_-30px_rgba(0,0,0,0.62)] motion-safe:hover:-translate-y-0.5">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Focus
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold text-white">
                  Listening-first
                </dd>
              </div>
              <div className="rounded-2xl border border-white/[0.065] bg-surface/78 px-5 py-4 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.4)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:border-white/[0.1] hover:bg-surface/90 hover:shadow-[0_24px_48px_-30px_rgba(0,0,0,0.62)] motion-safe:hover:-translate-y-0.5">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Stack
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold text-white">
                  Web & edge
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
