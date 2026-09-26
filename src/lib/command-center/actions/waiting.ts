"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { clientJobs, projects, waitingItems } from "../db/schema";
import type { WaitingItem } from "../types";

function revalidateWaitingPaths() {
  revalidatePath("/command-center");
  revalidatePath("/command-center/vantar");
}

export type WaitingItemWithRelations = WaitingItem & {
  projectName?: string | null;
  clientJobLabel?: string | null;
};

export async function getWaitingItems(includeResolved = false): Promise<WaitingItemWithRelations[]> {
  const db = getDb();
  const items = includeResolved
    ? db.select().from(waitingItems).orderBy(desc(waitingItems.createdAt)).all()
    : db
        .select()
        .from(waitingItems)
        .where(eq(waitingItems.resolved, false))
        .orderBy(desc(waitingItems.createdAt))
        .all();

  const allProjects = db.select().from(projects).all();
  const allJobs = db.select().from(clientJobs).all();

  return items.map((item) => {
    const project = allProjects.find((p) => p.id === item.projectId);
    const job = allJobs.find((j) => j.id === item.clientJobId);
    return {
      ...item,
      projectName: project?.name ?? null,
      clientJobLabel: job ? `${job.clientName} — ${job.projectName}` : null,
    };
  });
}

export async function createWaitingItem(data: {
  title: string;
  description?: string;
  projectId?: string;
  clientJobId?: string;
}) {
  const db = getDb();
  const ts = new Date().toISOString();
  const id = nanoid();

  db.insert(waitingItems)
    .values({
      id,
      title: data.title,
      description: data.description ?? null,
      projectId: data.projectId ?? null,
      clientJobId: data.clientJobId ?? null,
      resolved: false,
      createdAt: ts,
      updatedAt: ts,
    })
    .run();

  revalidateWaitingPaths();
  return id;
}

export async function updateWaitingItem(
  id: string,
  data: {
    title?: string;
    description?: string | null;
    projectId?: string | null;
    clientJobId?: string | null;
  },
) {
  const db = getDb();
  const existing = db.select().from(waitingItems).where(eq(waitingItems.id, id)).get();
  if (!existing) throw new Error("Väntande item hittades inte");

  db.update(waitingItems)
    .set({
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.projectId !== undefined ? { projectId: data.projectId } : {}),
      ...(data.clientJobId !== undefined ? { clientJobId: data.clientJobId } : {}),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(waitingItems.id, id))
    .run();

  revalidateWaitingPaths();
}

export async function resolveWaitingItem(id: string) {
  const db = getDb();
  db.update(waitingItems)
    .set({ resolved: true, updatedAt: new Date().toISOString() })
    .where(eq(waitingItems.id, id))
    .run();
  revalidateWaitingPaths();
}

export async function deleteWaitingItem(id: string) {
  const db = getDb();
  db.delete(waitingItems).where(eq(waitingItems.id, id)).run();
  revalidateWaitingPaths();
}
