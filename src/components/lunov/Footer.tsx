import Link from "next/link";
import { SparkleIcon } from "./icons";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About us" },
  { href: "#contact", label: "Contact" },
];

const serviceLinks = [
  { href: "#services", label: "Web design" },
  { href: "#services", label: "Web development" },
  { href: "#services", label: "Systems & integration" },
  { href: "#services", label: "Product & mobile" },
];

function SocialInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-3.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
    </svg>
  );
}

function SocialYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2c.2 1 .4 2.8.4 4.8s-.2 3.8-.4 4.8c-.2 1.4-1.5 2.5-2.9 2.7-2.6.3-8.4.3-11 0-1.4-.2-2.7-1.3-2.9-2.7-.2-1-.4-2.8-.4-4.8s.2-3.8.4-4.8C5 5.8 6.3 4.7 7.7 4.5c2.6-.3 8.4-.3 11 0 1.4.2 2.7 1.3 2.9 2.7ZM10 9.5v5l4.5-2.5L10 9.5Z" />
    </svg>
  );
}

function SocialLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 8.5v11H3.2V8.5h3.3ZM4.85 3.8a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM20.8 12.4c0-3.6-1.9-5.3-4.5-5.3-1.3 0-2.3.6-2.8 1.3l-.2-1.1h-3.1v11h3.4v-6.2c0-1.5.6-2.5 1.9-2.5 1 0 1.6.7 1.6 2.1v6.6h3.7v-6.9Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.045] bg-black px-4 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 lunov-divider-top opacity-80" aria-hidden />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Link href="#home" className="inline-flex items-start gap-1.5 outline-none transition-opacity duration-200 hover:opacity-90">
              <div className="leading-none">
                <span className="font-display flex items-center gap-1 text-lg font-bold tracking-[0.2em] text-white">
                  LUNO
                  <span className="relative inline-flex">
                    V
                    <SparkleIcon className="absolute -right-3 top-0 size-3 text-lime" />
                  </span>
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500">
                  Digital studio
                </span>
              </div>
            </Link>
            <p className="mt-7 max-w-sm text-sm leading-[1.68] text-zinc-500">
              Precision-built websites and product interfaces — engineered for
              clarity, speed, and longevity.
            </p>
            <p className="mt-10 text-[11px] tracking-wide text-zinc-600">
              © {new Date().getFullYear()} LUNOV Digital Studio
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3 lg:gap-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
                Navigation
              </p>
              <ul className="mt-6 space-y-3.5">
                {navLinks.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-400 transition-colors duration-200 ease-out hover:text-zinc-100"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
                Services
              </p>
              <ul className="mt-6 space-y-3.5">
                {serviceLinks.map((l, i) => (
                  <li key={`${l.label}-${i}`}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-400 transition-colors duration-200 ease-out hover:text-zinc-100"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
                Follow us
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-white transition-[border-color,background-color,transform] duration-300 ease-out hover:border-white/22 hover:bg-white/[0.055] motion-safe:hover:-translate-y-px"
                  aria-label="Instagram"
                >
                  <SocialInstagram className="size-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-white transition-[border-color,background-color,transform] duration-300 ease-out hover:border-white/22 hover:bg-white/[0.055] motion-safe:hover:-translate-y-px"
                  aria-label="YouTube"
                >
                  <SocialYoutube className="size-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-white transition-[border-color,background-color,transform] duration-300 ease-out hover:border-white/22 hover:bg-white/[0.055] motion-safe:hover:-translate-y-px"
                  aria-label="LinkedIn"
                >
                  <SocialLinkedin className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-16 pt-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 lunov-divider-bottom opacity-70" aria-hidden />
          <p className="text-center text-[11px] leading-relaxed tracking-wide text-zinc-600 lg:text-right">
            Designed with restraint. Built to perform.{" "}
            <span className="text-lime/90" aria-hidden>
              ♥
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
