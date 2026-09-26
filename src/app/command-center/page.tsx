import { DashboardView } from "@/components/command-center/dashboard/DashboardView";
import { getRecentActivity } from "@/lib/command-center/actions/activity";
import { getClientJobs } from "@/lib/command-center/actions/client-jobs";
import { getCostSummary } from "@/lib/command-center/actions/costs";
import { getDashboardStats } from "@/lib/command-center/actions/dashboard";
import { getProjectsWithStats } from "@/lib/command-center/actions/projects";
import { getRevenueSummary } from "@/lib/command-center/actions/revenues";
import { getWaitingItems } from "@/lib/command-center/actions/waiting";
import { getWeekFocus, getWeeklyTasks } from "@/lib/command-center/actions/weekly";

export default async function CommandCenterPage() {
  const [
    stats,
    projects,
    clientJobs,
    weeklyTasks,
    weekFocus,
    waitingItems,
    activity,
    costSummary,
    revenueSummary,
  ] = await Promise.all([
    getDashboardStats(),
    getProjectsWithStats(),
    getClientJobs(),
    getWeeklyTasks(),
    getWeekFocus(),
    getWaitingItems(),
    getRecentActivity(),
    getCostSummary(),
    getRevenueSummary(),
  ]);

  return (
    <DashboardView
      stats={stats}
      projects={projects}
      clientJobs={clientJobs}
      weeklyTasks={weeklyTasks}
      weekFocus={weekFocus}
      waitingItems={waitingItems}
      activity={activity}
      costSummary={costSummary}
      revenueSummary={revenueSummary}
    />
  );
}
