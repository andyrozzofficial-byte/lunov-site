"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const lineBase =
    "lunov-process-line h-px flex-1 bg-gradient-to-r transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section
      id="process"
      className="relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-white/[0.055] bg-black px-4 py-24 sm:scroll-mt-28 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-labelledby="process-heading"
    >
      <div ref={rootRef} className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime">
            Our process
          </p>
          <h2
            id="process-heading"
            className="font-display mt-3 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl sm:leading-[1.1]"
          >
            Simple. Transparent. Effective.
          </h2>
        </div>

        <div className="mt-16 hidden lg:block">
          <div className="flex items-start gap-0">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`flex min-w-0 flex-1 flex-col items-center transition-[opacity,transform] duration-[880ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{
                  transitionDelay: `${visible ? 120 + i * 110 : 0}ms`,
                }}
              >
                <div className="flex w-full items-center">
                  <div
                    className={`${lineBase} ${
                      i === 0
                        ? "from-transparent to-zinc-700/85"
                        : "from-zinc-700/85 to-zinc-700/85"
                    } ${visible ? "translate-y-0 opacity-100" : "-translate-y-px opacity-0"}`}
                    style={{
                      transitionDelay: `${visible ? i * 95 + 40 : 0}ms`,
                    }}
                  />
                  <div className="relative mx-3 flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-black shadow-[0_0_26px_-6px_rgba(212,255,63,0.52)] transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_0_32px_-4px_rgba(212,255,63,0.42)] motion-safe:hover:scale-[1.04]">
                    {step.n}
                  </div>
                  <div
                    className={`${lineBase} ${
                      i === steps.length - 1
                        ? "from-zinc-700/85 to-transparent"
                        : "from-zinc-700/85 to-zinc-700/85"
                    } ${visible ? "translate-y-0 opacity-100" : "-translate-y-px opacity-0"}`}
                    style={{
                      transitionDelay: `${visible ? i * 95 + 120 : 0}ms`,
                    }}
                  />
                </div>
                <div className="mt-9 w-full max-w-[240px] px-2 text-center">
                  <h3 className="font-display text-base font-semibold leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.68] text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ol className="mt-12 space-y-10 sm:mt-14 lg:hidden">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={`lunov-process-step relative flex gap-4 sm:gap-5 ${visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`}
              style={{
                transitionDelay: `${visible ? 80 + i * 95 : 0}ms`,
                transitionDuration: "780ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionProperty: "opacity, transform",
              }}
            >
              {i < steps.length - 1 && (
                <span
                  className={`lunov-process-line absolute bottom-[-36px] left-[23px] top-[52px] w-px bg-gradient-to-b from-zinc-600/90 via-zinc-800 to-zinc-900 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    visible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${visible ? 140 + i * 100 : 0}ms`,
                  }}
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-black shadow-[0_0_22px_-6px_rgba(212,255,63,0.48)]">
                {step.n}
              </div>
              <div className="min-w-0 pb-1 pt-0.5">
                <h3 className="font-display text-base font-semibold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.68] text-zinc-400">
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
