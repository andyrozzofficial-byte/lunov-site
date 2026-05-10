"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  /** Subtle stagger between sibling sections (ms). */
  delayMs?: number;
  className?: string;
};

export function Reveal({ children, delayMs = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={[
        "lunov-reveal will-change-[opacity,transform]",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transitionDelay: reduced ? "0ms" : shown ? `${delayMs}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
