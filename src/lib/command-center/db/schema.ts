import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status", { enum: ["active", "waiting", "archived"] })
    .notNull()
    .default("active"),
  progress: integer("progress").notNull().default(0),
  nextStep: text("next_step"),
  deadline: text("deadline"),
  notes: text("notes"),
  color: text("color").default("#d4ff3f"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const clientJobs = sqliteTable("client_jobs", {
  id: text("id").primaryKey(),
  clientName: text("client_name").notNull(),
  projectName: text("project_name").notNull(),
  description: text("description"),
  status: text("status", {
    enum: [
      "not_started",
      "in_progress",
      "waiting_client",
      "done",
      "invoiced",
      "paid",
    ],
  })
    .notNull()
    .default("not_started"),
  deadline: text("deadline"),
  price: real("price").notNull().default(0),
  paidAmount: real("paid_amount").notNull().default(0),
  startDate: text("start_date"),
  completedDate: text("completed_date"),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const weeklyTasks = sqliteTable("weekly_tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  weekStart: text("week_start").notNull(),
  dayOfWeek: integer("day_of_week").notNull(),
  projectId: text("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),
  clientJobId: text("client_job_id").references(() => clientJobs.id, {
    onDelete: "set null",
  }),
  estimatedMinutes: integer("estimated_minutes").notNull().default(60),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const weekFocus = sqliteTable("week_focus", {
  id: text("id").primaryKey(),
  weekStart: text("week_start").notNull().unique(),
  projectId: text("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const projectTasks = sqliteTable("project_tasks", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const costs = sqliteTable("costs", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  service: text("service").notNull(),
  amount: real("amount").notNull(),
  currency: text("currency").notNull().default("SEK"),
  isRecurring: integer("is_recurring", { mode: "boolean" })
    .notNull()
    .default(false),
  monthlyAmount: real("monthly_amount"),
  paidBy: text("paid_by", { enum: ["self", "other"] })
    .notNull()
    .default("self"),
  date: text("date").notNull(),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
});

export const revenues = sqliteTable("revenues", {
  id: text("id").primaryKey(),
  clientJobId: text("client_job_id").references(() => clientJobs.id, {
    onDelete: "set null",
  }),
  projectId: text("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),
  amount: real("amount").notNull(),
  currency: text("currency").notNull().default("SEK"),
  status: text("status", { enum: ["paid", "unpaid", "upcoming"] })
    .notNull()
    .default("unpaid"),
  date: text("date").notNull(),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
});

export const waitingItems = sqliteTable("waiting_items", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  projectId: text("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),
  clientJobId: text("client_job_id").references(() => clientJobs.id, {
    onDelete: "set null",
  }),
  resolved: integer("resolved", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const inboxItems = sqliteTable("inbox_items", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  projectId: text("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),
  convertedToTaskId: text("converted_to_task_id"),
  createdAt: text("created_at").notNull(),
});

export const activityLog = sqliteTable("activity_log", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  entityType: text("entity_type"),
  entityId: text("entity_id"),
  createdAt: text("created_at").notNull(),
});
