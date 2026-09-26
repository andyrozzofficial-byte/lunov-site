import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  subtext?: string;
  icon?: ReactNode;
  trend?: { value: number; invert?: boolean };
};

export function StatCard({ label, value, subtext, icon, trend }: Props) {
  const trendPositive = trend ? (trend.invert ? trend.value < 0 : trend.value > 0) : false;
  const trendNegative = trend ? (trend.invert ? trend.value > 0 : trend.value < 0) : false;

  return (
    <div className="cc-card flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-muted">{label}</span>
        {icon && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-muted">
            {icon}
          </span>
        )}
      </div>
      <div>
        <p className="font-display text-2xl font-bold tracking-tight text-foreground">{value}</p>
        {(subtext || trend) && (
          <div className="mt-1 flex items-center gap-2 text-xs">
            {trend && trend.value !== 0 && (
              <span
                className={
                  trendPositive
                    ? "text-emerald-400"
                    : trendNegative
                      ? "text-red-400"
                      : "text-muted"
                }
              >
                {trend.value > 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
            {subtext && <span className="text-muted">{subtext}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
