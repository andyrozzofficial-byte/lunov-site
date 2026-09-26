import { RevenuesView } from "@/components/command-center/revenues/RevenuesView";
import { getClientJobs } from "@/lib/command-center/actions/client-jobs";
import { getProjects } from "@/lib/command-center/actions/projects";
import { getRevenueSummary } from "@/lib/command-center/actions/revenues";

export default async function IntakterPage() {
  const [summary, projects, clientJobs] = await Promise.all([
    getRevenueSummary(),
    getProjects(),
    getClientJobs(),
  ]);

  return (
    <RevenuesView
      monthlyTotal={summary.monthlyTotal}
      unpaidTotal={summary.unpaidTotal}
      paidClientJobsTotal={summary.paidClientJobsTotal}
      upcomingTotal={summary.upcomingTotal}
      paidJobs={summary.paidJobs}
      unpaidJobList={summary.unpaidJobList}
      revenues={summary.allRevenues}
      projects={projects}
      clientJobs={clientJobs}
    />
  );
}
