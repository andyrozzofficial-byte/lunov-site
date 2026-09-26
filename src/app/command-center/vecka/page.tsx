import { WeeklyPlanner } from "@/components/command-center/weekly/WeeklyPlanner";
import { getClientJobs } from "@/lib/command-center/actions/client-jobs";
import { getProjects } from "@/lib/command-center/actions/projects";
import { getWeekFocus, getWeeklyTasks } from "@/lib/command-center/actions/weekly";
import { getWeekStart } from "@/lib/command-center/utils/date";

export default async function VeckaPage() {
  const weekStart = getWeekStart();
  const [tasks, weekFocus, projects, clientJobs] = await Promise.all([
    getWeeklyTasks(weekStart),
    getWeekFocus(weekStart),
    getProjects(),
    getClientJobs(),
  ]);

  return (
    <WeeklyPlanner
      tasks={tasks}
      weekFocus={weekFocus}
      projects={projects}
      clientJobs={clientJobs}
      weekStart={weekStart}
    />
  );
}
