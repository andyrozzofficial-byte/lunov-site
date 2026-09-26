import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import type { getDb } from "../db";
import { clientJobs, costs, revenues } from "../db/schema";
import type { ClientJob, ClientJobPaymentStatus, Cost, CostPaidBy } from "../types";

type Db = ReturnType<typeof getDb>;
type DateRange = { start: string; end: string };

export type CostLike = Pick<
  Cost,
  | "id"
  | "projectId"
  | "service"
  | "amount"
  | "isRecurring"
  | "monthlyAmount"
  | "paidBy"
  | "date"
>;

export type MonthlyCostBreakdown = {
  monthlyTotal: number;
  myMonthlyTotal: number;
  othersMonthlyTotal: number;
  byService: Record<string, number>;
  byProject: Record<string, number>;
  myByProject: Record<string, number>;
  othersByProject: Record<string, number>;
};

export function resolveCostPaidBy(
  cost: Pick<Cost, "paidBy"> | { paidBy?: CostPaidBy | null },
): CostPaidBy {
  return cost.paidBy === "other" ? "other" : "self";
}

/** Faktiska intäkter: endast betalda poster med intäktsdatum i intervallet. */
export function sumActualRevenueInRange(db: Db, range: DateRange): number {
  const result = db
    .select({
      total: sql<number>`coalesce(sum(${revenues.amount}), 0)`,
    })
    .from(revenues)
    .where(
      and(
        eq(revenues.status, "paid"),
        gte(revenues.date, range.start),
        lte(revenues.date, range.end),
      ),
    )
    .get();

  return result?.total ?? 0;
}

/** Månadskostnad för en återkommande post (månadsvis eller årsvis / 12). */
export function effectiveMonthlyAmount(
  cost: Pick<Cost, "isRecurring" | "monthlyAmount" | "amount">,
): number {
  if (!cost.isRecurring) return 0;
  return cost.monthlyAmount ?? cost.amount;
}

/**
 * Behåll senaste posten per projekt + tjänst så historiska månadsposter
 * inte räknas flera gånger i "denna månad".
 */
export function dedupeActiveRecurringCosts<T extends CostLike>(costs: T[]): T[] {
  const latest = new Map<string, T>();

  for (const cost of costs) {
    if (!cost.isRecurring) continue;
    const key = `${cost.projectId}:${cost.service}`;
    const existing = latest.get(key);
    if (
      !existing ||
      cost.date > existing.date ||
      (cost.date === existing.date && cost.id > existing.id)
    ) {
      latest.set(key, cost);
    }
  }

  return [...latest.values()];
}

export function isOneTimeCostInRange(
  cost: Pick<Cost, "isRecurring" | "date">,
  range: DateRange,
): boolean {
  return !cost.isRecurring && cost.date >= range.start && cost.date <= range.end;
}

function addToBreakdown(
  breakdown: MonthlyCostBreakdown,
  cost: CostLike,
  amount: number,
) {
  breakdown.monthlyTotal += amount;
  breakdown.byService[cost.service] = (breakdown.byService[cost.service] ?? 0) + amount;
  breakdown.byProject[cost.projectId] = (breakdown.byProject[cost.projectId] ?? 0) + amount;

  if (resolveCostPaidBy(cost) === "other") {
    breakdown.othersMonthlyTotal += amount;
    breakdown.othersByProject[cost.projectId] =
      (breakdown.othersByProject[cost.projectId] ?? 0) + amount;
  } else {
    breakdown.myMonthlyTotal += amount;
    breakdown.myByProject[cost.projectId] =
      (breakdown.myByProject[cost.projectId] ?? 0) + amount;
  }
}

function emptyBreakdown(): MonthlyCostBreakdown {
  return {
    monthlyTotal: 0,
    myMonthlyTotal: 0,
    othersMonthlyTotal: 0,
    byService: {},
    byProject: {},
    myByProject: {},
    othersByProject: {},
  };
}

/** Gemensam månadskostnad: deduplicerade återkommande + engång i intervallet. */
export function calculateMonthlyCostBreakdown(
  costs: CostLike[],
  range: DateRange,
): MonthlyCostBreakdown {
  const breakdown = emptyBreakdown();
  const activeRecurring = dedupeActiveRecurringCosts(costs);

  for (const cost of activeRecurring) {
    addToBreakdown(breakdown, cost, effectiveMonthlyAmount(cost));
  }

  for (const cost of costs) {
    if (!isOneTimeCostInRange(cost, range)) continue;
    addToBreakdown(breakdown, cost, cost.amount);
  }

  return breakdown;
}

export function calculateProjectMonthlyCosts(costs: CostLike[], range: DateRange): number {
  return calculateMonthlyCostBreakdown(costs, range).monthlyTotal;
}

/** Totalt investerat: summa av alla registrerade belopp (historik inkluderad). */
export function sumTotalInvested(costs: Pick<Cost, "amount">[]): number {
  return costs.reduce((sum, cost) => sum + cost.amount, 0);
}

export function sumMonthlyCostsInRange(db: Db, range: DateRange): number {
  const allCosts = db.select().from(costs).all();
  return calculateMonthlyCostBreakdown(allCosts, range).monthlyTotal;
}

export function sumUnpaidClientJobs(db: Db): number {
  const jobs = db.select().from(clientJobs).all();
  return jobs.reduce((sum, job) => sum + Math.max(0, job.price - job.paidAmount), 0);
}

export function sumPaidClientJobs(db: Db): number {
  const jobs = db.select().from(clientJobs).all();
  return jobs.reduce((sum, job) => sum + job.paidAmount, 0);
}

export function getClientJobPaymentStatus(
  job: Pick<ClientJob, "price" | "paidAmount">,
): ClientJobPaymentStatus {
  if (job.paidAmount <= 0) return "unpaid";
  if (job.paidAmount >= job.price) return "paid";
  return "partial";
}

export function getLastPaymentDateForJob(db: Db, clientJobId: string): string | null {
  const row = db
    .select({ date: revenues.date })
    .from(revenues)
    .where(and(eq(revenues.clientJobId, clientJobId), eq(revenues.status, "paid")))
    .orderBy(desc(revenues.date))
    .limit(1)
    .get();

  return row?.date ?? null;
}
