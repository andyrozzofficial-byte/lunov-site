import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  padding?: "sm" | "md" | "lg";
};

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function CcCard({
  children,
  className = "",
  title,
  subtitle,
  action,
  padding = "md",
}: Props) {
  return (
    <div
      className={`cc-card rounded-2xl border border-border bg-card ${paddingMap[padding]} ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
