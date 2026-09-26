import type {
  activityLog,
  clientJobs,
  costs,
  inboxItems,
  projectTasks,
  projects,
  revenues,
  waitingItems,
  weekFocus,
  weeklyTasks,
} from "./db/schema";

export type Project = typeof projects.$inferSelect;
export type ClientJob = typeof clientJobs.$inferSelect;
export type WeeklyTask = typeof weeklyTasks.$inferSelect;
export type WeekFocus = typeof weekFocus.$inferSelect;
export type ProjectTask = typeof projectTasks.$inferSelect;
export type Cost = typeof costs.$inferSelect;
export type Revenue = typeof revenues.$inferSelect;
export type WaitingItem = typeof waitingItems.$inferSelect;
export type InboxItem = typeof inboxItems.$inferSelect;
export type ActivityEntry = typeof activityLog.$inferSelect;

export type ProjectStatus = Project["status"];
export type ClientJobStatus = ClientJob["status"];
export type RevenueStatus = Revenue["status"];
export type CostPaidBy = Cost["paidBy"];

export type WeeklyTaskWithRelations = WeeklyTask & {
  projectName?: string | null;
  projectColor?: string | null;
  clientJobName?: string | null;
};

export type ProjectWithStats = Project & {
  taskCount: number;
  weeklyTaskCount: number;
  totalCosts: number;
  monthlyCosts: number;
  totalRevenue: number;
};

export type ClientJobPaymentStatus = "paid" | "partial" | "unpaid";

export type ClientJobWithComputed = ClientJob & {
  unpaidAmount: number;
  paymentStatus?: ClientJobPaymentStatus;
  lastPaymentDate?: string | null;
};

export type DashboardStats = {
  weeklyTasksTotal: number;
  weeklyTasksCompleted: number;
  activeProjects: number;
  waitingProjects: number;
  clientJobsCount: number;
  clientJobsDeadlineThisWeek: number;
  /** Totala projektkostnader denna månad */
  monthlyCosts: number;
  monthlyCostsChange: number;
  /** Kostnader jag betalar denna månad */
  myCostsThisMonth: number;
  /** Kostnader andra betalar denna månad */
  othersCostsThisMonth: number;
  monthlyRevenue: number;
  monthlyRevenueChange: number;
  unpaidClientJobs: number;
  paidClientJobsTotal: number;
  /** Netto för mig: intäkter − mina kostnader */
  monthlyNetto: number;
};

export const COST_PAID_BY_LABELS: Record<CostPaidBy, string> = {
  self: "Jag betalar",
  other: "Annan betalar",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: "Aktivt",
  waiting: "Väntar",
  archived: "Arkiverat",
};

export const CLIENT_JOB_PAYMENT_LABELS: Record<ClientJobPaymentStatus, string> = {
  paid: "Betalt",
  partial: "Delbetalt",
  unpaid: "Obetalt",
};

export function resolveClientJobPaymentStatus(
  job: Pick<ClientJobWithComputed, "paymentStatus" | "paidAmount" | "price">,
): ClientJobPaymentStatus {
  if (job.paymentStatus) return job.paymentStatus;
  if (job.paidAmount <= 0) return "unpaid";
  if (job.paidAmount >= job.price) return "paid";
  return "partial";
}

export function clientJobPaymentLabel(status: ClientJobPaymentStatus): string {
  return CLIENT_JOB_PAYMENT_LABELS[status] ?? CLIENT_JOB_PAYMENT_LABELS.unpaid;
}

export const CLIENT_JOB_STATUS_LABELS: Record<ClientJobStatus, string> = {
  not_started: "Ej startat",
  in_progress: "Pågående",
  waiting_client: "Väntar på kund",
  done: "Klart",
  invoiced: "Fakturerat",
  paid: "Betalt",
};

export const REVENUE_STATUS_LABELS: Record<RevenueStatus, string> = {
  paid: "Betalt",
  unpaid: "Obetalt",
  upcoming: "Kommande",
};

export const COST_SERVICES = [
  "Supabase",
  "Vercel",
  "Railway",
  "Resend",
  "OpenAI",
  "Expo/EAS",
  "Domäner",
  "Övrigt",
] as const;

export const DAY_NAMES = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
] as const;

export const DAY_NAMES_SHORT = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"] as const;
