"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { clientJobs } from "../db/schema";
import type { ClientJob, ClientJobStatus, ClientJobWithComputed } from "../types";
import {
  getClientJobPaymentStatus,
  getLastPaymentDateForJob,
} from "../utils/finance";
import { logActivity } from "./activity";

function revalidateClientJobPaths() {
  revalidatePath("/command-center");
  revalidatePath("/command-center/kundjobb");
  revalidatePath("/command-center/intakter");
}

export async function getClientJobs(): Promise<ClientJobWithComputed[]> {
  const db = getDb();
  const jobs = db.select().from(clientJobs).orderBy(desc(clientJobs.updatedAt)).all();
  return jobs.map((job) => ({
    ...job,
    unpaidAmount: Math.max(0, job.price - job.paidAmount),
    paymentStatus: getClientJobPaymentStatus(job),
    lastPaymentDate: getLastPaymentDateForJob(db, job.id),
  }));
}

export async function getClientJobById(id: string): Promise<ClientJob | undefined> {
  const db = getDb();
  return db.select().from(clientJobs).where(eq(clientJobs.id, id)).get();
}

export async function createClientJob(data: {
  clientName: string;
  projectName: string;
  description?: string;
  status?: ClientJobStatus;
  deadline?: string;
  price?: number;
  paidAmount?: number;
  startDate?: string;
  notes?: string;
}) {
  const db = getDb();
  const ts = new Date().toISOString();
  const id = nanoid();

  db.insert(clientJobs)
    .values({
      id,
      clientName: data.clientName,
      projectName: data.projectName,
      description: data.description ?? null,
      status: data.status ?? "not_started",
      deadline: data.deadline ?? null,
      price: data.price ?? 0,
      paidAmount: data.paidAmount ?? 0,
      startDate: data.startDate ?? null,
      completedDate: null,
      notes: data.notes ?? null,
      createdAt: ts,
      updatedAt: ts,
    })
    .run();

  await logActivity(
    "client_job_created",
    `Nytt kundjobb — ${data.clientName}: ${data.projectName}`,
    "client_job",
    id,
  );
  revalidateClientJobPaths();
  return id;
}

export async function updateClientJob(
  id: string,
  data: Partial<Omit<ClientJob, "id" | "createdAt">>,
) {
  const db = getDb();
  const existing = await getClientJobById(id);
  if (!existing) throw new Error("Kundjobb hittades inte");

  db.update(clientJobs)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(clientJobs.id, id))
    .run();

  await logActivity(
    "client_job_updated",
    `Kundjobb uppdaterat — ${existing.clientName}`,
    "client_job",
    id,
  );
  revalidateClientJobPaths();
}

export async function deleteClientJob(id: string) {
  const db = getDb();
  const existing = await getClientJobById(id);
  if (!existing) return;

  db.delete(clientJobs).where(eq(clientJobs.id, id)).run();
  await logActivity(
    "client_job_deleted",
    `Kundjobb borttaget — ${existing.clientName}`,
    "client_job",
    id,
  );
  revalidateClientJobPaths();
}
