import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";

const avatars = [
  { bg: "from-violet-500/80 to-fuchsia-600/60", initials: "AR" },
  { bg: "from-emerald-500/70 to-teal-600/50", initials: "JK" },
  { bg: "from-amber-500/70 to-orange-600/50", initials: "MN" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-[72px]"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(212,255,63,0.12),transparent_55%),radial-gradient(ellipse_60%_50%_at_10%_40%,rgba(255,255,255,0.04),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:gap-10 md:py-24 lg:gap-16 lg:py-28 lg:px-8">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-lime">
            Web. Design. Systems.
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Digital experiences built to{" "}
            <span className="text-lime">perform.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
            We partner with ambitious teams to ship fast, accessible interfaces
            and resilient foundations — from brand-critical marketing sites to
            product surfaces your users rely on every day.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_40px_-8px_rgba(212,255,63,0.55)] transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.99]"
            >
              Our services
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white/5"
            >
              View projects
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((a, i) => (
                <span
                  key={i}
                  className={`relative inline-flex size-10 items-center justify-center rounded-full border border-black bg-gradient-to-br ${a.bg} text-[10px] font-bold text-white ring-2 ring-black`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="max-w-[220px] text-sm leading-snug text-zinc-500">
              Trusted by creators and businesses around the world.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] md:mx-0 md:max-w-none">
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(212,255,63,0.22),transparent_75%)] blur-2xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-zinc-900/40 to-black shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            <Image
              src="/hero-visual.png"
              alt="Laptop showing a dark dashboard interface with lime accent highlights"
              width={1200}
              height={900}
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
