import { ClientJobsView } from "@/components/command-center/client-jobs/ClientJobsView";
import { getClientJobs } from "@/lib/command-center/actions/client-jobs";

export default async function KundjobbPage() {
  const jobs = await getClientJobs();
  return <ClientJobsView jobs={jobs} />;
}
