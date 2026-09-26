"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { clientJobs, projects, weekFocus, weeklyTasks } from "../db/schema";
import type { WeekFocus, WeeklyTaskWithRelations } from "../types";
import { getWeekStart } from "../utils/date";
import { logActivity } from "./activity";

function revalidateWeeklyPaths() {
  revalidatePath("/command-center");
  revalidatePath("/command-center/vecka");
}

export async function getWeeklyTasks(weekStart?: string): Promise<WeeklyTaskWithRelations[]> {
  const db = getDb();
  const ws = weekStart ?? getWeekStart();

  const tasks = db
    .select()
    .from(weeklyTasks)
    .where(eq(weeklyTasks.weekStart, ws))
    .orderBy(weeklyTasks.dayOfWeek, weeklyTasks.sortOrder)
    .all();

  const allProjects = db.select().from(projects).all();
  const allJobs = db.select().from(clientJobs).all();

  return tasks.map((task) => {
    const project = allProjects.find((p) => p.id === task.projectId);
    const job = allJobs.find((j) => j.id === task.clientJobId);
    return {
      ...task,
      projectName: project?.name ?? null,
      projectColor: project?.color ?? null,
      clientJobName: job ? `${job.clientName} — ${job.projectName}` : null,
    };
  });
}

export async function getWeekFocus(weekStart?: string): Promise<WeekFocus | undefined> {
  const db = getDb();
  const ws = weekStart ?? getWeekStart();
  return db.select().from(weekFocus).where(eq(weekFocus.weekStart, ws)).get();
}

export async function createWeeklyTask(data: {
  title: string;
  dayOfWeek: number;
  weekStart?: string;
  projectId?: string;
  clientJobId?: string;
  estimatedMinutes?: number;
}) {
  const db = getDb();
  const ts = new Date().toISOString();
  const ws = data.weekStart ?? getWeekStart();
  const id = nanoid();

  const existing = db
    .select()
    .from(weeklyTasks)
    .where(and(eq(weeklyTasks.weekStart, ws), eq(weeklyTasks.dayOfWeek, data.dayOfWeek)))
    .all();

  db.insert(weeklyTasks)
    .values({
      id,
      title: data.title,
      weekStart: ws,
      dayOfWeek: data.dayOfWeek,
      projectId: data.projectId ?? null,
      clientJobId: data.clientJobId ?? null,
      estimatedMinutes: data.estimatedMinutes ?? 60,
      completed: false,
      sortOrder: existing.length,
      createdAt: ts,
      updatedAt: ts,
    })
    .run();

  await logActivity("task_created", `Uppgift tillagd — ${data.title}`);
  revalidateWeeklyPaths();
  return id;
}

export async function toggleWeeklyTask(taskId: string) {
  const db = getDb();
  const task = db.select().from(weeklyTasks).where(eq(weeklyTasks.id, taskId)).get();
  if (!task) return;

  db.update(weeklyTasks)
    .set({ completed: !task.completed, updatedAt: new Date().toISOString() })
    .where(eq(weeklyTasks.id, taskId))
    .run();

  if (!task.completed) {
    await logActivity("task_completed", `Uppgift slutförd — ${task.title}`);
  }

  revalidateWeeklyPaths();
}

export async function moveWeeklyTask(taskId: string, newDayOfWeek: number) {
  const db = getDb();
  const task = db.select().from(weeklyTasks).where(eq(weeklyTasks.id, taskId)).get();
  if (!task) return;

  const existing = db
    .select()
    .from(weeklyTasks)
    .where(
      and(
        eq(weeklyTasks.weekStart, task.weekStart),
        eq(weeklyTasks.dayOfWeek, newDayOfWeek),
      ),
    )
    .all();

  db.update(weeklyTasks)
    .set({
      dayOfWeek: newDayOfWeek,
      sortOrder: existing.length,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(weeklyTasks.id, taskId))
    .run();

  revalidateWeeklyPaths();
}

export async function deleteWeeklyTask(taskId: string) {
  const db = getDb();
  db.delete(weeklyTasks).where(eq(weeklyTasks.id, taskId)).run();
  revalidateWeeklyPaths();
}

export async function updateWeeklyTask(
  taskId: string,
  data: {
    title?: string;
    dayOfWeek?: number;
    estimatedMinutes?: number;
    projectId?: string | null;
    clientJobId?: string | null;
    completed?: boolean;
  },
) {
  const db = getDb();
  const task = db.select().from(weeklyTasks).where(eq(weeklyTasks.id, taskId)).get();
  if (!task) throw new Error("Uppgift hittades inte");

  db.update(weeklyTasks)
    .set({
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.dayOfWeek !== undefined ? { dayOfWeek: data.dayOfWeek } : {}),
      ...(data.estimatedMinutes !== undefined ? { estimatedMinutes: data.estimatedMinutes } : {}),
      ...(data.projectId !== undefined ? { projectId: data.projectId } : {}),
      ...(data.clientJobId !== undefined ? { clientJobId: data.clientJobId } : {}),
      ...(data.completed !== undefined ? { completed: data.completed } : {}),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(weeklyTasks.id, taskId))
    .run();

  if (data.completed === true && !task.completed) {
    await logActivity("task_completed", `Uppgift slutförd — ${data.title ?? task.title}`);
  }

  revalidateWeeklyPaths();
}

export async function setWeekFocus(data: {
  title: string;
  description?: string;
  projectId?: string;
  weekStart?: string;
}) {
  const db = getDb();
  const ts = new Date().toISOString();
  const ws = data.weekStart ?? getWeekStart();
  const existing = await getWeekFocus(ws);

  if (existing) {
    db.update(weekFocus)
      .set({
        title: data.title,
        description: data.description ?? null,
        projectId: data.projectId ?? null,
        updatedAt: ts,
      })
      .where(eq(weekFocus.id, existing.id))
      .run();
  } else {
    db.insert(weekFocus)
      .values({
        id: nanoid(),
        weekStart: ws,
        title: data.title,
        description: data.description ?? null,
        projectId: data.projectId ?? null,
        createdAt: ts,
        updatedAt: ts,
      })
      .run();
  }

  revalidateWeeklyPaths();
}
