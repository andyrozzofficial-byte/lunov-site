import { ProjectDetailView } from "@/components/command-center/projects/ProjectDetailView";
import { getCostsByProject } from "@/lib/command-center/actions/costs";
import { getProjectTasks } from "@/lib/command-center/actions/project-tasks";
import { getProjectById } from "@/lib/command-center/actions/projects";
import { getCurrentMonthRange } from "@/lib/command-center/utils/date";
import {
  calculateMonthlyCostBreakdown,
  sumTotalInvested,
} from "@/lib/command-center/utils/finance";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  const [tasks, costs] = await Promise.all([getProjectTasks(id), getCostsByProject(id)]);
  const month = getCurrentMonthRange();
  const costBreakdown = calculateMonthlyCostBreakdown(costs, month);

  return (
    <ProjectDetailView
      project={project}
      tasks={tasks}
      costs={costs}
      totalCosts={sumTotalInvested(costs)}
      monthlyCosts={costBreakdown.monthlyTotal}
      myMonthlyCosts={costBreakdown.myMonthlyTotal}
      othersMonthlyCosts={costBreakdown.othersMonthlyTotal}
    />
  );
}
