import { CostsView } from "@/components/command-center/costs/CostsView";
import { getCostSummary } from "@/lib/command-center/actions/costs";

export default async function KostnaderPage() {
  const summary = await getCostSummary();

  return (
    <CostsView
      costs={summary.allCosts}
      monthlyTotal={summary.monthlyTotal}
      myMonthlyTotal={summary.myMonthlyTotal}
      othersMonthlyTotal={summary.othersMonthlyTotal}
      totalInvested={summary.totalInvested}
      byProject={summary.byProject}
    />
  );
}
