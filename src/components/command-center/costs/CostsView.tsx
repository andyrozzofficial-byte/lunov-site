"use client";

import { TopBar } from "@/components/command-center/shell/TopBar";
import { CcCard } from "@/components/command-center/ui/CcCard";
import type { CostWithProject } from "@/lib/command-center/actions/costs";
import { COST_PAID_BY_LABELS } from "@/lib/command-center/types";
import { formatCurrency } from "@/lib/command-center/utils/format";
import { resolveCostPaidBy } from "@/lib/command-center/utils/finance";
import Link from "next/link";
import {
  COST_TYPE_LABELS,
  costDisplayAmount,
  costMonthlyAmount,
  inferCostType,
} from "./costForm";

type Props = {
  costs: CostWithProject[];
  monthlyTotal: number;
  myMonthlyTotal: number;
  othersMonthlyTotal: number;
  totalInvested: number;
  byProject: {
    projectId: string;
    projectName: string;
    total: number;
    monthly: number;
  }[];
};

export function CostsView({
  costs,
  monthlyTotal,
  myMonthlyTotal,
  othersMonthlyTotal,
  totalInvested,
  byProject,
}: Props) {
  return (
    <>
      <TopBar
        greeting="Kostnader"
        subtitle={`Sammanställning — ${byProject.length} projekt`}
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CcCard>
            <p className="text-xs text-muted">Totala projektkostnader</p>
            <p className="font-display text-2xl font-bold">{formatCurrency(monthlyTotal)}</p>
            <p className="mt-1 text-xs text-muted">Denna månad</p>
          </CcCard>
          <CcCard>
            <p className="text-xs text-muted">Jag betalar</p>
            <p className="font-display text-2xl font-bold text-red-400">
              {formatCurrency(myMonthlyTotal)}
            </p>
            <p className="mt-1 text-xs text-muted">Min faktiska kostnad</p>
          </CcCard>
          <CcCard>
            <p className="text-xs text-muted">Annan betalar</p>
            <p className="font-display text-2xl font-bold text-muted">
              {formatCurrency(othersMonthlyTotal)}
            </p>
          </CcCard>
          <CcCard>
            <p className="text-xs text-muted">Totalt investerat</p>
            <p className="font-display text-2xl font-bold text-amber-400">
              {formatCurrency(totalInvested)}
            </p>
          </CcCard>
        </div>

        <p className="text-sm text-muted">
          Kostnader hanteras per projekt. Gå till ett projekt för att lägga till, redigera eller ta
          bort kostnader.
        </p>

        <CcCard title="Kostnad per projekt">
          <ul className="space-y-2 text-sm">
            {byProject.map((p) => (
              <li key={p.projectId} className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/command-center/projekt/${p.projectId}`}
                  className="font-medium hover:text-lime"
                >
                  {p.projectName}
                </Link>
                <div className="flex items-center gap-4 tabular-nums">
                  <span>{formatCurrency(p.monthly)}/mån</span>
                  <span className="text-muted">({formatCurrency(p.total)} totalt)</span>
                </div>
              </li>
            ))}
          </ul>
        </CcCard>

        <CcCard title="Alla kostnadsposter" padding="sm">
          <div className="overflow-x-auto">
            <table className="cc-table w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="pb-3 pr-4 font-medium">Tjänst</th>
                  <th className="pb-3 pr-4 font-medium">Projekt</th>
                  <th className="pb-3 pr-4 font-medium">Typ</th>
                  <th className="pb-3 pr-4 font-medium">Betalar</th>
                  <th className="pb-3 pr-4 font-medium">Belopp</th>
                  <th className="pb-3 pr-4 font-medium">Datum</th>
                  <th className="pb-3 font-medium">Anteckning</th>
                </tr>
              </thead>
              <tbody>
                {costs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-muted">
                      Inga kostnadsposter registrerade
                    </td>
                  </tr>
                ) : (
                  costs.map((cost) => (
                    <tr key={cost.id} className="border-b border-border/50">
                      <td className="py-3 pr-4 font-medium">{cost.service}</td>
                      <td className="py-3 pr-4">
                        <Link
                          href={`/command-center/projekt/${cost.projectId}`}
                          className="text-muted hover:text-lime"
                        >
                          {cost.projectName}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-muted">
                        {COST_TYPE_LABELS[inferCostType(cost)]}
                      </td>
                      <td className="py-3 pr-4 text-muted">
                        {COST_PAID_BY_LABELS[resolveCostPaidBy(cost)]}
                      </td>
                      <td className="py-3 pr-4 tabular-nums">
                        {formatCurrency(costDisplayAmount(cost))}
                        {inferCostType(cost) === "yearly" && (
                          <span className="ml-1 text-xs text-muted">
                            ({formatCurrency(costMonthlyAmount(cost))}/mån)
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 tabular-nums text-muted">{cost.date}</td>
                      <td className="py-3 text-muted">{cost.notes ?? "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CcCard>
      </div>
    </>
  );
}
