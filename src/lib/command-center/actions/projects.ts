"use server";

import { count, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { costs, projectTasks, projects, revenues, weeklyTasks } from "../db/schema";
import type { Project, ProjectStatus, ProjectWithStats } from "../types";
import { getCurrentMonthRange } from "../utils/date";
import { calculateProjectMonthlyCosts, sumTotalInvested } from "../utils/finance";
import { logActivity } from "./activity";

function revalidateProjectPaths() {
  revalidatePath("/command-center");
  revalidatePath("/command-center/projekt");
}

export async function getProjects(status?: ProjectStatus): Promise<Project[]> {
  const db = getDb();
  if (status) {
    return db.select().from(projects).where(eq(projects.status, status)).all();
  }
  return db.select().from(projects).orderBy(desc(projects.updatedAt)).all();
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const db = getDb();
  return db.select().from(projects).where(eq(projects.id, id)).get();
}

export async function getProjectsWithStats(): Promise<ProjectWithStats[]> {
  const db = getDb();
  const allProjects = await getProjects();
  const month = getCurrentMonthRange();
  const allCosts = db.select().from(costs).all();

  return allProjects.map((project) => {
    const projectCosts = allCosts.filter((c) => c.projectId === project.id);
    const taskCount =
      db
        .select({ value: count() })
        .from(projectTasks)
        .where(eq(projectTasks.projectId, project.id))
        .get()?.value ?? 0;

    const weeklyTaskCount =
      db
        .select({ value: count() })
        .from(weeklyTasks)
        .where(eq(weeklyTasks.projectId, project.id))
        .get()?.value ?? 0;

    const totalCosts = sumTotalInvested(projectCosts);
    const monthlyCosts = calculateProjectMonthlyCosts(projectCosts, month);

    const totalRevenue =
      db
        .select({ total: sql<number>`coalesce(sum(${revenues.amount}), 0)` })
        .from(revenues)
        .where(eq(revenues.projectId, project.id))
        .get()?.total ?? 0;

    return {
      ...project,
      taskCount,
      weeklyTaskCount,
      totalCosts,
      monthlyCosts,
      totalRevenue,
    };
  });
}

export async function createProject(data: {
  name: string;
  description?: string;
  status?: ProjectStatus;
  progress?: number;
  nextStep?: string;
  deadline?: string;
  notes?: string;
  color?: string;
}) {
  const db = getDb();
  const ts = new Date().toISOString();
  const id = nanoid();

  db.insert(projects)
    .values({
      id,
      name: data.name,
      description: data.description ?? null,
      status: data.status ?? "active",
      progress: data.progress ?? 0,
      nextStep: data.nextStep ?? null,
      deadline: data.deadline ?? null,
      notes: data.notes ?? null,
      color: data.color ?? "#d4ff3f",
      createdAt: ts,
      updatedAt: ts,
    })
    .run();

  await logActivity("project_created", `Nytt projekt — ${data.name}`, "project", id);
  revalidateProjectPaths();
  return id;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id" | "createdAt">>,
) {
  const db = getDb();
  const existing = await getProjectById(id);
  if (!existing) throw new Error("Projekt hittades inte");

  db.update(projects)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(projects.id, id))
    .run();

  await logActivity(
    "project_updated",
    `Projekt uppdaterat — ${existing.name}${data.progress !== undefined ? ` (${data.progress}%)` : ""}`,
    "project",
    id,
  );
  revalidateProjectPaths();
  revalidatePath(`/command-center/projekt/${id}`);
}

export async function deleteProject(id: string) {
  const db = getDb();
  const existing = await getProjectById(id);
  if (!existing) return;

  db.delete(projects).where(eq(projects.id, id)).run();
  await logActivity("project_deleted", `Projekt borttaget — ${existing.name}`, "project", id);
  revalidateProjectPaths();
  revalidatePath(`/command-center/projekt/${id}`);
}

