export function formatCurrency(
  amount: number,
  currency = "SEK",
  compact = false,
): string {
  if (compact && amount >= 1000) {
    return `${Math.round(amount).toLocaleString("sv-SE")} kr`;
  }

  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function formatPercentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
