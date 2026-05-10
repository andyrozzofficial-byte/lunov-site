const steps = [
  {
    n: 1,
    title: "Discovery & planning",
    description:
      "Goals, constraints, and measurement — aligned before a single pixel ships.",
  },
  {
    n: 2,
    title: "Design & prototype",
    description:
      "Direction, UX flows, and interactive prototypes that de-risk the build.",
  },
  {
    n: 3,
    title: "Build & launch",
    description:
      "Implementation with performance checks, accessibility passes, and QA.",
  },
  {
    n: 4,
    title: "Grow & optimize",
    description:
      "Iteration cadence, analytics hooks, and improvements based on real usage.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative border-t border-white/[0.06] bg-black py-20 sm:py-24"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime">
            Our process
          </p>
          <h2
            id="process-heading"
            className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Simple. Transparent. Effective.
          </h2>
        </div>

        <div className="mt-14 hidden lg:block">
          <div className="flex items-start gap-0">
            {steps.map((step, i) => (
              <div key={step.n} className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <div
                    className={`h-px flex-1 bg-gradient-to-r ${i === 0 ? "from-transparent to-zinc-700" : "from-zinc-700 to-zinc-700"}`}
                  />
                  <div className="relative mx-3 flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-black shadow-[0_0_24px_-6px_rgba(212,255,63,0.65)]">
                    {step.n}
                  </div>
                  <div
                    className={`h-px flex-1 bg-gradient-to-r ${i === steps.length - 1 ? "from-zinc-700 to-transparent" : "from-zinc-700 to-zinc-700"}`}
                  />
                </div>
                <div className="mt-8 w-full max-w-[240px] px-2 text-center">
                  <h3 className="font-display text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ol className="mt-10 space-y-8 lg:hidden">
          {steps.map((step, i) => (
            <li key={step.n} className="relative flex gap-4">
              {i < steps.length - 1 && (
                <span
                  className="absolute bottom-[-32px] left-[23px] top-12 w-px bg-zinc-800"
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-black shadow-[0_0_24px_-6px_rgba(212,255,63,0.55)]">
                {step.n}
              </div>
              <div className="pb-2">
                <h3 className="font-display text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
