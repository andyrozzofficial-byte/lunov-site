"use server";

import { desc, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { inboxItems, projects } from "../db/schema";
import type { InboxItem } from "../types";
import { createWeeklyTask } from "./weekly";

function revalidateInboxPaths() {
  revalidatePath("/command-center");
}

export type InboxItemWithProject = InboxItem & { projectName?: string | null };

export async function getInboxItems(): Promise<InboxItemWithProject[]> {
  const db = getDb();
  const items = db
    .select()
    .from(inboxItems)
    .where(isNull(inboxItems.convertedToTaskId))
    .orderBy(desc(inboxItems.createdAt))
    .all();

  const allProjects = db.select().from(projects).all();
  return items.map((item) => ({
    ...item,
    projectName: allProjects.find((p) => p.id === item.projectId)?.name ?? null,
  }));
}

export async function createInboxItem(content: string, projectId?: string) {
  const db = getDb();
  const id = nanoid();

  db.insert(inboxItems)
    .values({
      id,
      content,
      projectId: projectId ?? null,
      convertedToTaskId: null,
      createdAt: new Date().toISOString(),
    })
    .run();

  revalidateInboxPaths();
  return id;
}

export async function convertInboxToTask(inboxId: string, dayOfWeek: number) {
  const db = getDb();
  const item = db.select().from(inboxItems).where(eq(inboxItems.id, inboxId)).get();
  if (!item) return;

  const taskId = await createWeeklyTask({
    title: item.content,
    dayOfWeek,
    projectId: item.projectId ?? undefined,
  });

  db.update(inboxItems)
    .set({ convertedToTaskId: taskId })
    .where(eq(inboxItems.id, inboxId))
    .run();

  revalidateInboxPaths();
}

export async function deleteInboxItem(id: string) {
  const db = getDb();
  db.delete(inboxItems).where(eq(inboxItems.id, id)).run();
  revalidateInboxPaths();
}
