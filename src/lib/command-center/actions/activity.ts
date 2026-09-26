"use server";

import { desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { activityLog } from "../db/schema";

export async function logActivity(
  type: string,
  description: string,
  entityType?: string,
  entityId?: string,
) {
  const db = getDb();
  db.insert(activityLog)
    .values({
      id: nanoid(),
      type,
      description,
      entityType: entityType ?? null,
      entityId: entityId ?? null,
      createdAt: new Date().toISOString(),
    })
    .run();
}

export async function getRecentActivity(limit = 10) {
  const db = getDb();
  return db
    .select()
    .from(activityLog)
    .orderBy(desc(activityLog.createdAt))
    .limit(limit)
    .all();
}
