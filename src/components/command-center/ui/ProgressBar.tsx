type Props = {
  value: number;
  color?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
};

export function ProgressBar({
  value,
  color = "#d4ff3f",
  size = "md",
  showLabel = false,
}: Props) {
  const clamped = Math.min(100, Math.max(0, value));
  const height = size === "sm" ? "h-1" : "h-1.5";

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 overflow-hidden rounded-full bg-white/[0.06] ${height}`}>
        <div
          className={`${height} rounded-full transition-all duration-500`}
          style={{ width: `${clamped}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 text-xs tabular-nums text-muted">{clamped}%</span>
      )}
    </div>
  );
}
