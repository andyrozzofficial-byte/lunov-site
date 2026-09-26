import { ProjectsView } from "@/components/command-center/projects/ProjectsView";
import { getProjectsWithStats } from "@/lib/command-center/actions/projects";

export default async function ProjektPage() {
  const projects = await getProjectsWithStats();
  return <ProjectsView projects={projects} />;
}
