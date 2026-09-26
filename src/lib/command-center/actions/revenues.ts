"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { clientJobs, projects, revenues } from "../db/schema";
import type { Revenue, RevenueStatus } from "../types";
import { getCurrentMonthRange } from "../utils/date";
import {
  getClientJobPaymentStatus,
  sumActualRevenueInRange,
  sumPaidClientJobs,
  sumUnpaidClientJobs,
} from "../utils/finance";
import { logActivity } from "./activity";

function revalidateRevenuePaths() {
  revalidatePath("/command-center");
  revalidatePath("/command-center/intakter");
}

export type RevenueWithRelations = Revenue & {
  clientJobLabel?: string | null;
  projectName?: string | null;
};

export async function getRevenues(): Promise<RevenueWithRelations[]> {
  const db = getDb();
  const rows = db.select().from(revenues).orderBy(desc(revenues.date)).all();
  const allJobs = db.select().from(clientJobs).all();
  const allProjects = db.select().from(projects).all();

  return rows.map((r) => {
    const job = allJobs.find((j) => j.id === r.clientJobId);
    const project = allProjects.find((p) => p.id === r.projectId);
    return {
      ...r,
      clientJobLabel: job ? `${job.clientName} — ${job.projectName}` : null,
      projectName: project?.name ?? null,
    };
  });
}

export async function getRevenueSummary() {
  const db = getDb();
  const month = getCurrentMonthRange();
  const allRevenues = await getRevenues();
  const jobs = db.select().from(clientJobs).all();

  const monthlyTotal = sumActualRevenueInRange(db, month);
  const unpaidTotal = sumUnpaidClientJobs(db);
  const paidClientJobsTotal = sumPaidClientJobs(db);
  const upcomingTotal = allRevenues
    .filter((r) => r.status === "upcoming")
    .reduce((s, r) => s + r.amount, 0);

  const paidJobs = jobs.filter((j) => getClientJobPaymentStatus(j) === "paid");
  const unpaidJobList = jobs.filter((j) => j.price > j.paidAmount);

  return {
    monthlyTotal,
    unpaidTotal,
    paidClientJobsTotal,
    upcomingTotal,
    paidJobs,
    unpaidJobList,
    allRevenues,
  };
}

export async function createRevenue(data: {
  amount: number;
  status?: RevenueStatus;
  date: string;
  clientJobId?: string;
  projectId?: string;
  currency?: string;
  notes?: string;
}) {
  const db = getDb();
  const id = nanoid();

  db.insert(revenues)
    .values({
      id,
      amount: data.amount,
      status: data.status ?? "unpaid",
      date: data.date,
      clientJobId: data.clientJobId ?? null,
      projectId: data.projectId ?? null,
      currency: data.currency ?? "SEK",
      notes: data.notes ?? null,
      createdAt: new Date().toISOString(),
    })
    .run();

  await logActivity("revenue_added", `Intäkt registrerad — ${data.amount} kr`);
  revalidateRevenuePaths();
  return id;
}

export async function updateRevenue(
  id: string,
  data: {
    amount?: number;
    status?: RevenueStatus;
    date?: string;
    clientJobId?: string | null;
    projectId?: string | null;
    currency?: string;
    notes?: string | null;
  },
) {
  const db = getDb();
  const existing = db.select().from(revenues).where(eq(revenues.id, id)).get();
  if (!existing) throw new Error("Intäkt hittades inte");

  db.update(revenues)
    .set({
      ...(data.amount !== undefined ? { amount: data.amount } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.date !== undefined ? { date: data.date } : {}),
      ...(data.clientJobId !== undefined ? { clientJobId: data.clientJobId } : {}),
      ...(data.projectId !== undefined ? { projectId: data.projectId } : {}),
      ...(data.currency !== undefined ? { currency: data.currency } : {}),
      ...(data.notes !== undefined ? { notes: data.notes } : {}),
    })
    .where(eq(revenues.id, id))
    .run();

  revalidateRevenuePaths();
}

export async function deleteRevenue(id: string) {
  const db = getDb();
  db.delete(revenues).where(eq(revenues.id, id)).run();
  revalidateRevenuePaths();
}
