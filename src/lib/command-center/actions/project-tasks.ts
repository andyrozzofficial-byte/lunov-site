"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { projectTasks } from "../db/schema";

function revalidateProjectTaskPaths(projectId: string) {
  revalidatePath(`/command-center/projekt/${projectId}`);
  revalidatePath("/command-center");
  revalidatePath("/command-center/vecka");
}

export async function getProjectTasks(projectId: string) {
  const db = getDb();
  return db
    .select()
    .from(projectTasks)
    .where(eq(projectTasks.projectId, projectId))
    .orderBy(desc(projectTasks.createdAt))
    .all();
}

export async function addProjectTask(projectId: string, title: string) {
  const db = getDb();
  const ts = new Date().toISOString();
  const id = nanoid();

  db.insert(projectTasks)
    .values({ id, projectId, title, completed: false, createdAt: ts, updatedAt: ts })
    .run();

  revalidateProjectTaskPaths(projectId);
}

export async function toggleProjectTask(taskId: string, projectId: string) {
  const db = getDb();
  const task = db.select().from(projectTasks).where(eq(projectTasks.id, taskId)).get();
  if (!task) return;

  db.update(projectTasks)
    .set({ completed: !task.completed, updatedAt: new Date().toISOString() })
    .where(eq(projectTasks.id, taskId))
    .run();

  revalidateProjectTaskPaths(projectId);
}

export async function updateProjectTask(
  taskId: string,
  projectId: string,
  data: { title?: string; completed?: boolean },
) {
  const db = getDb();
  const task = db.select().from(projectTasks).where(eq(projectTasks.id, taskId)).get();
  if (!task) throw new Error("Uppgift hittades inte");

  db.update(projectTasks)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(projectTasks.id, taskId))
    .run();

  revalidateProjectTaskPaths(projectId);
}

export async function deleteProjectTask(taskId: string, projectId: string) {
  const db = getDb();
  db.delete(projectTasks).where(eq(projectTasks.id, taskId)).run();
  revalidateProjectTaskPaths(projectId);
}
