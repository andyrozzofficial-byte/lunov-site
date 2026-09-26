"use server";

import { count, eq } from "drizzle-orm";
import { getDb } from "../db";
import { clientJobs, costs, projects, weeklyTasks } from "../db/schema";
import type { DashboardStats } from "../types";
import {
  getCurrentMonthRange,
  getPreviousMonthRange,
  getWeekStart,
  isDateInWeek,
} from "../utils/date";
import { getCostSummary } from "./costs";
import {
  calculateMonthlyCostBreakdown,
  sumActualRevenueInRange,
  sumPaidClientJobs,
  sumUnpaidClientJobs,
} from "../utils/finance";
import { formatPercentChange } from "../utils/format";

export async function getDashboardStats(): Promise<DashboardStats> {
  const db = getDb();
  const weekStart = getWeekStart();
  const currentMonth = getCurrentMonthRange();
  const previousMonth = getPreviousMonthRange();

  const weekTasks = db
    .select()
    .from(weeklyTasks)
    .where(eq(weeklyTasks.weekStart, weekStart))
    .all();

  const activeCount = db
    .select({ value: count() })
    .from(projects)
    .where(eq(projects.status, "active"))
    .get();

  const waitingCount = db
    .select({ value: count() })
    .from(projects)
    .where(eq(projects.status, "waiting"))
    .get();

  const jobs = db.select().from(clientJobs).all();
  const jobsThisWeek = jobs.filter(
    (j) => j.deadline && isDateInWeek(j.deadline, weekStart),
  );

  const allCostRows = db.select().from(costs).all();
  const costSummary = await getCostSummary();
  const monthlyCosts = costSummary.monthlyTotal;
  const myCostsThisMonth = costSummary.myMonthlyTotal;
  const othersCostsThisMonth = costSummary.othersMonthlyTotal;
  const prevMonthlyCosts = calculateMonthlyCostBreakdown(allCostRows, previousMonth).monthlyTotal;
  const monthlyRevenue = sumActualRevenueInRange(db, currentMonth);
  const prevMonthlyRevenue = sumActualRevenueInRange(db, previousMonth);
  const unpaidClientJobs = sumUnpaidClientJobs(db);
  const paidClientJobsTotal = sumPaidClientJobs(db);

  return {
    weeklyTasksTotal: weekTasks.length,
    weeklyTasksCompleted: weekTasks.filter((t) => t.completed).length,
    activeProjects: activeCount?.value ?? 0,
    waitingProjects: waitingCount?.value ?? 0,
    clientJobsCount: jobs.length,
    clientJobsDeadlineThisWeek: jobsThisWeek.length,
    monthlyCosts,
    monthlyCostsChange: formatPercentChange(monthlyCosts, prevMonthlyCosts),
    myCostsThisMonth,
    othersCostsThisMonth,
    monthlyRevenue,
    monthlyRevenueChange: formatPercentChange(monthlyRevenue, prevMonthlyRevenue),
    unpaidClientJobs,
    paidClientJobsTotal,
    monthlyNetto: monthlyRevenue - myCostsThisMonth,
  };
}
