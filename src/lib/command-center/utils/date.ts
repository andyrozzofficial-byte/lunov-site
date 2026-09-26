import {
  addDays,
  format,
  getISOWeek,
  parseISO,
  startOfWeek,
} from "date-fns";
import { sv } from "date-fns/locale";

export function getWeekStart(date: Date = new Date()): string {
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  return format(monday, "yyyy-MM-dd");
}

export function parseWeekStart(weekStart: string): Date {
  return parseISO(weekStart);
}

export function getWeekDays(weekStart: string): Date[] {
  const start = parseWeekStart(weekStart);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function formatDayLabel(date: Date): string {
  return format(date, "EEEE d MMMM", { locale: sv });
}

export function formatDayShort(date: Date): string {
  return format(date, "d", { locale: sv });
}

export function formatWeekdayShort(date: Date): string {
  return format(date, "EEE", { locale: sv });
}

export function formatRelativeTime(isoDate: string): string {
  const date = parseISO(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just nu";
  if (diffMins < 60) return `${diffMins} min sedan`;
  if (diffHours < 24) return `${diffHours}h sedan`;
  if (diffDays === 1) return "Igår";
  if (diffDays < 7) return `${diffDays} dagar sedan`;
  return format(date, "d MMM", { locale: sv });
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return "God morgon";
  if (hour < 17) return "God eftermiddag";
  return "God kväll";
}

export function formatMonthYear(date: Date = new Date()): string {
  return format(date, "MMMM yyyy", { locale: sv });
}

export function getCurrentMonthRange(): { start: string; end: string } {
  const now = new Date();
  const start = format(new Date(now.getFullYear(), now.getMonth(), 1), "yyyy-MM-dd");
  const end = format(new Date(now.getFullYear(), now.getMonth() + 1, 0), "yyyy-MM-dd");
  return { start, end };
}

export function getPreviousMonthRange(): { start: string; end: string } {
  const now = new Date();
  const start = format(
    new Date(now.getFullYear(), now.getMonth() - 1, 1),
    "yyyy-MM-dd",
  );
  const end = format(new Date(now.getFullYear(), now.getMonth(), 0), "yyyy-MM-dd");
  return { start, end };
}

export function isDateInWeek(dateStr: string, weekStart: string): boolean {
  const days = getWeekDays(weekStart);
  const start = format(days[0], "yyyy-MM-dd");
  const end = format(days[6], "yyyy-MM-dd");
  return dateStr >= start && dateStr <= end;
}

export function getWeekNumber(weekStart: string): number {
  return getISOWeek(parseWeekStart(weekStart));
}
