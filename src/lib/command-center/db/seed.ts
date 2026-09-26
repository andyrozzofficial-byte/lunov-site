import { count } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getWeekStart } from "../utils/date";
import type { getDb } from "./index";
import {
  activityLog,
  clientJobs,
  costs,
  inboxItems,
  projects,
  waitingItems,
  weekFocus,
  weeklyTasks,
} from "./schema";

type Db = ReturnType<typeof getDb>;

function now() {
  return new Date().toISOString();
}

function monthAgo(months: number) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString().slice(0, 10);
}

export function seedDatabase(db: Db) {
  const [{ value: projectCount }] = db.select({ value: count() }).from(projects).all();

  if (projectCount > 0) return;

  const ts = now();
  const weekStart = getWeekStart();

  const projectData = [
    {
      id: "wobbla",
      name: "Wobbla",
      description: "Social plattform för lokala communities",
      status: "active" as const,
      progress: 68,
      nextStep: "Implementera notifikationer",
      color: "#3b82f6",
    },
    {
      id: "mastrify",
      name: "Mastrify",
      description: "AI-driven mastering-plattform",
      status: "active" as const,
      progress: 80,
      nextStep: "Beta-test med producenter",
      color: "#d4ff3f",
    },
    {
      id: "usly",
      name: "USLY",
      description: "Musikapp med social discovery",
      status: "waiting" as const,
      progress: 45,
      nextStep: "Väntar på beta-feedback",
      color: "#a855f7",
    },
    {
      id: "kollektiv",
      name: "Kollektiv",
      description: "Adminpanel för kollektivförening",
      status: "waiting" as const,
      progress: 30,
      nextStep: "Kunden ska testa systemet",
      color: "#f97316",
    },
    {
      id: "gutinsight",
      name: "GutInsight",
      description: "Hälsoplattform för mag-tarm",
      status: "active" as const,
      progress: 52,
      nextStep: "Supabase-kostnadsoptimering",
      color: "#14b8a6",
    },
    {
      id: "mindinsight",
      name: "MindInsight",
      description: "Mental hälsa och mindfulness",
      status: "active" as const,
      progress: 25,
      nextStep: "Designa onboarding-flöde",
      color: "#ec4899",
    },
    {
      id: "migraineinsight",
      name: "MigraineInsight",
      description: "Migränspårning och analys",
      status: "active" as const,
      progress: 15,
      nextStep: "Research fas 2",
      color: "#ef4444",
    },
  ];

  db.insert(projects)
    .values(
      projectData.map((p) => ({
        ...p,
        deadline: null,
        notes: null,
        createdAt: ts,
        updatedAt: ts,
      })),
    )
    .run();

  db.insert(clientJobs)
    .values([
      {
        id: nanoid(),
        clientName: "Söder Ent.",
        projectName: "Webbplats redesign",
        description: "Ny webbplats med bokningssystem",
        status: "in_progress",
        deadline: "2025-10-15",
        price: 18000,
        paidAmount: 9000,
        startDate: monthAgo(2),
        completedDate: null,
        notes: null,
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: nanoid(),
        clientName: "Kollektiv",
        projectName: "Adminpanel",
        description: "Adminpanel för medlemshantering",
        status: "not_started",
        deadline: "2025-11-10",
        price: 25000,
        paidAmount: 0,
        startDate: null,
        completedDate: null,
        notes: null,
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: nanoid(),
        clientName: "USLY",
        projectName: "Branding + App UI",
        description: "Visuell identitet och app-design",
        status: "in_progress",
        deadline: "2025-10-20",
        price: 35000,
        paidAmount: 17500,
        startDate: monthAgo(1),
        completedDate: null,
        notes: null,
        createdAt: ts,
        updatedAt: ts,
      },
    ])
    .run();

  db.insert(weeklyTasks)
    .values([
      {
        id: nanoid(),
        title: "Fixa auth-buggen",
        weekStart,
        dayOfWeek: 0,
        projectId: "wobbla",
        clientJobId: null,
        estimatedMinutes: 120,
        completed: false,
        sortOrder: 0,
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: nanoid(),
        title: "Uppdatera landing page",
        weekStart,
        dayOfWeek: 0,
        projectId: "wobbla",
        clientJobId: null,
        estimatedMinutes: 60,
        completed: false,
        sortOrder: 1,
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: nanoid(),
        title: "Testa nya presets",
        weekStart,
        dayOfWeek: 1,
        projectId: "mastrify",
        clientJobId: null,
        estimatedMinutes: 90,
        completed: false,
        sortOrder: 0,
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: nanoid(),
        title: "Söder Ent. — feedbackrunda",
        weekStart,
        dayOfWeek: 2,
        projectId: null,
        clientJobId: null,
        estimatedMinutes: 60,
        completed: false,
        sortOrder: 0,
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: nanoid(),
        title: "Supabase-kostnadsanalys",
        weekStart,
        dayOfWeek: 3,
        projectId: "gutinsight",
        clientJobId: null,
        estimatedMinutes: 45,
        completed: false,
        sortOrder: 0,
        createdAt: ts,
        updatedAt: ts,
      },
    ])
    .run();

  db.insert(weekFocus)
    .values({
      id: nanoid(),
      weekStart,
      projectId: "wobbla",
      title: "Wobbla — Auth & Notifikationer",
      description: "Fokusera på att få auth-flödet stabilt och börja med push-notiser.",
      createdAt: ts,
      updatedAt: ts,
    })
    .run();

  db.insert(waitingItems)
    .values([
      {
        id: nanoid(),
        title: "Kunden ska testa systemet",
        description: "Kollektiv — väntar på att kunden testar adminpanelen",
        projectId: "kollektiv",
        clientJobId: null,
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: nanoid(),
        title: "Beta-feedback från testare",
        description: "USLY — väntar på feedback från beta-testare",
        projectId: "usly",
        clientJobId: null,
        createdAt: ts,
        updatedAt: ts,
      },
    ])
    .run();

  db.insert(costs)
    .values([
      {
        id: nanoid(),
        projectId: "gutinsight",
        service: "Supabase",
        amount: 299,
        currency: "SEK",
        isRecurring: true,
        monthlyAmount: 299,
        date: monthAgo(0),
        notes: "Pro-plan",
        createdAt: ts,
      },
      {
        id: nanoid(),
        projectId: "gutinsight",
        service: "Vercel",
        amount: 200,
        currency: "SEK",
        isRecurring: true,
        monthlyAmount: 200,
        date: monthAgo(0),
        notes: null,
        createdAt: ts,
      },
      {
        id: nanoid(),
        projectId: "gutinsight",
        service: "OpenAI",
        amount: 450,
        currency: "SEK",
        isRecurring: true,
        monthlyAmount: 450,
        date: monthAgo(0),
        notes: "API-anrop",
        createdAt: ts,
      },
      {
        id: nanoid(),
        projectId: "wobbla",
        service: "Supabase",
        amount: 299,
        currency: "SEK",
        isRecurring: true,
        monthlyAmount: 299,
        date: monthAgo(0),
        notes: null,
        createdAt: ts,
      },
      {
        id: nanoid(),
        projectId: "mastrify",
        service: "Railway",
        amount: 150,
        currency: "SEK",
        isRecurring: true,
        monthlyAmount: 150,
        date: monthAgo(0),
        notes: null,
        createdAt: ts,
      },
      {
        id: nanoid(),
        projectId: "wobbla",
        service: "Resend",
        amount: 100,
        currency: "SEK",
        isRecurring: true,
        monthlyAmount: 100,
        date: monthAgo(0),
        notes: null,
        createdAt: ts,
      },
    ])
    .run();

  db.insert(activityLog)
    .values([
      {
        id: nanoid(),
        type: "cost_added",
        description: "Kostnad tillagd — Supabase (GutInsight)",
        entityType: "cost",
        entityId: null,
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      },
      {
        id: nanoid(),
        type: "task_completed",
        description: "Uppgift slutförd — Testa presets (Mastrify)",
        entityType: "task",
        entityId: null,
        createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
      },
      {
        id: nanoid(),
        type: "project_updated",
        description: "Projekt uppdaterat — Wobbla (68%)",
        entityType: "project",
        entityId: "wobbla",
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
      },
      {
        id: nanoid(),
        type: "client_job_updated",
        description: "Kundjobb uppdaterat — Söder Ent.",
        entityType: "client_job",
        entityId: null,
        createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
      },
    ])
    .run();

  db.insert(inboxItems)
    .values({
      id: nanoid(),
      content: "Kontrollera Supabase-kostnaden för GutInsight",
      projectId: "gutinsight",
      convertedToTaskId: null,
      createdAt: ts,
    })
    .run();
}
