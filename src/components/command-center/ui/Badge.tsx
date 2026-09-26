type Variant = "active" | "waiting" | "archived" | "progress" | "done" | "neutral";

const variantStyles: Record<Variant, string> = {
  active: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/25",
  waiting: "bg-amber-500/15 text-amber-400 ring-amber-500/25",
  archived: "bg-zinc-500/15 text-zinc-400 ring-zinc-500/25",
  progress: "bg-orange-500/15 text-orange-400 ring-orange-500/25",
  done: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/25",
  neutral: "bg-white/[0.06] text-muted ring-white/10",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export function Badge({ children, variant = "neutral", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
