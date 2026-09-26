"use server";

import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { costs, projects } from "../db/schema";
import type { Cost, CostPaidBy } from "../types";
import { getCurrentMonthRange } from "../utils/date";
import {
  calculateMonthlyCostBreakdown,
  calculateProjectMonthlyCosts,
  sumTotalInvested,
} from "../utils/finance";
import { logActivity } from "./activity";

function revalidateCostPaths(projectId?: string) {
  revalidatePath("/command-center");
  revalidatePath("/command-center/kostnader");
  revalidatePath("/command-center/projekt");
  if (projectId) {
    revalidatePath(`/command-center/projekt/${projectId}`);
  }
}

export type CostWithProject = Cost & { projectName: string };

export async function getCosts(): Promise<CostWithProject[]> {
  const db = getDb();
  const rows = db
    .select({
      cost: costs,
      projectName: projects.name,
    })
    .from(costs)
    .innerJoin(projects, eq(costs.projectId, projects.id))
    .orderBy(desc(costs.date))
    .all();

  return rows.map((r) => ({ ...r.cost, projectName: r.projectName }));
}

export async function getCostsByProject(projectId: string): Promise<Cost[]> {
  const db = getDb();
  return db
    .select()
    .from(costs)
    .where(eq(costs.projectId, projectId))
    .orderBy(desc(costs.date))
    .all();
}

export async function getCostSummary() {
  const db = getDb();
  const month = getCurrentMonthRange();
  const allCostRows = db.select().from(costs).all();
  const allCosts = await getCosts();
  const allProjects = db.select().from(projects).orderBy(asc(projects.name)).all();

  const breakdown = calculateMonthlyCostBreakdown(allCostRows, month);
  const totalInvested = sumTotalInvested(allCostRows);

  const byProject = allProjects.map((project) => {
    const projectCosts = allCostRows.filter((c) => c.projectId === project.id);
    return {
      projectId: project.id,
      projectName: project.name,
      total: sumTotalInvested(projectCosts),
      monthly: breakdown.byProject[project.id] ?? 0,
    };
  });

  return {
    monthlyTotal: breakdown.monthlyTotal,
    myMonthlyTotal: breakdown.myMonthlyTotal,
    othersMonthlyTotal: breakdown.othersMonthlyTotal,
    totalInvested,
    byService: breakdown.byService,
    byProject,
    allCosts,
  };
}

export async function createCost(data: {
  projectId: string;
  service: string;
  amount: number;
  currency?: string;
  isRecurring?: boolean;
  monthlyAmount?: number;
  paidBy?: CostPaidBy;
  date: string;
  notes?: string;
}) {
  const db = getDb();
  const id = nanoid();
  const project = db.select().from(projects).where(eq(projects.id, data.projectId)).get();

  db.insert(costs)
    .values({
      id,
      projectId: data.projectId,
      service: data.service,
      amount: data.amount,
      currency: data.currency ?? "SEK",
      isRecurring: data.isRecurring ?? false,
      monthlyAmount: data.isRecurring ? (data.monthlyAmount ?? data.amount) : null,
      paidBy: data.paidBy ?? "self",
      date: data.date,
      notes: data.notes ?? null,
      createdAt: new Date().toISOString(),
    })
    .run();

  await logActivity(
    "cost_added",
    `Kostnad tillagd — ${data.service}${project ? ` (${project.name})` : ""}`,
    "cost",
    id,
  );
  revalidateCostPaths(data.projectId);
  return id;
}

export async function updateCost(
  id: string,
  data: {
    projectId?: string;
    service?: string;
    amount?: number;
    currency?: string;
    isRecurring?: boolean;
    monthlyAmount?: number | null;
    paidBy?: CostPaidBy;
    date?: string;
    notes?: string | null;
  },
) {
  const db = getDb();
  const existing = db.select().from(costs).where(eq(costs.id, id)).get();
  if (!existing) throw new Error("Kostnad hittades inte");

  const isRecurring = data.isRecurring ?? existing.isRecurring;

  db.update(costs)
    .set({
      ...(data.projectId !== undefined ? { projectId: data.projectId } : {}),
      ...(data.service !== undefined ? { service: data.service } : {}),
      ...(data.amount !== undefined ? { amount: data.amount } : {}),
      ...(data.currency !== undefined ? { currency: data.currency } : {}),
      ...(data.isRecurring !== undefined ? { isRecurring: data.isRecurring } : {}),
      ...(data.monthlyAmount !== undefined
        ? { monthlyAmount: data.monthlyAmount }
        : data.isRecurring !== undefined
          ? { monthlyAmount: isRecurring ? existing.amount : null }
          : {}),
      ...(data.paidBy !== undefined ? { paidBy: data.paidBy } : {}),
      ...(data.date !== undefined ? { date: data.date } : {}),
      ...(data.notes !== undefined ? { notes: data.notes } : {}),
    })
    .where(eq(costs.id, id))
    .run();

  revalidateCostPaths(data.projectId ?? existing.projectId);
}

export async function deleteCost(id: string) {
  const db = getDb();
  const existing = db.select().from(costs).where(eq(costs.id, id)).get();
  db.delete(costs).where(eq(costs.id, id)).run();
  revalidateCostPaths(existing?.projectId);
}
