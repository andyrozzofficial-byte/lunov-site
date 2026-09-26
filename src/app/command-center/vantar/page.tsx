import { WaitingView } from "@/components/command-center/waiting/WaitingView";
import { getClientJobs } from "@/lib/command-center/actions/client-jobs";
import { getProjects } from "@/lib/command-center/actions/projects";
import { getWaitingItems } from "@/lib/command-center/actions/waiting";

export default async function VantarPage() {
  const [items, projects, clientJobs] = await Promise.all([
    getWaitingItems(),
    getProjects(),
    getClientJobs(),
  ]);

  return <WaitingView items={items} projects={projects} clientJobs={clientJobs} />;
}
