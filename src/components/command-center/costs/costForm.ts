import type { CostWithProject } from "@/lib/command-center/actions/costs";
import type { Cost, CostPaidBy } from "@/lib/command-center/types";
import { COST_SERVICES } from "@/lib/command-center/types";

export type CostType = "monthly" | "yearly" | "once";

export const COST_TYPE_LABELS: Record<CostType, string> = {
  monthly: "Månadsvis",
  yearly: "Årsvis",
  once: "Engång",
};

export type CostFormState = {
  projectId: string;
  service: string;
  amount: number;
  currency: string;
  costType: CostType;
  paidBy: CostPaidBy;
  date: string;
  notes: string;
};

export function inferCostType(
  cost: Pick<Cost, "isRecurring" | "amount" | "monthlyAmount">,
): CostType {
  if (!cost.isRecurring) return "once";
  const monthly = cost.monthlyAmount ?? cost.amount;
  if (Math.abs(cost.amount - monthly * 12) < 0.01) return "yearly";
  return "monthly";
}

export function costDisplayAmount(
  cost: Pick<Cost, "isRecurring" | "amount" | "monthlyAmount">,
): number {
  const type = inferCostType(cost);
  if (type === "yearly") return cost.amount;
  if (type === "monthly") return cost.monthlyAmount ?? cost.amount;
  return cost.amount;
}

export function costMonthlyAmount(
  cost: Pick<Cost, "isRecurring" | "amount" | "monthlyAmount">,
): number {
  if (!cost.isRecurring) return 0;
  return cost.monthlyAmount ?? cost.amount;
}

function costTypeToDbFields(costType: CostType, amount: number) {
  if (costType === "once") {
    return { isRecurring: false as const, amount, monthlyAmount: null as null };
  }
  if (costType === "monthly") {
    return { isRecurring: true as const, amount, monthlyAmount: amount };
  }
  return { isRecurring: true as const, amount, monthlyAmount: amount / 12 };
}

export function emptyCostForm(projectId = ""): CostFormState {
  return {
    projectId,
    service: COST_SERVICES[0],
    amount: 0,
    currency: "SEK",
    costType: "monthly",
    paidBy: "self",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  };
}

export function costToForm(
  cost: Pick<
    Cost,
    | "projectId"
    | "service"
    | "amount"
    | "currency"
    | "isRecurring"
    | "monthlyAmount"
    | "paidBy"
    | "date"
    | "notes"
  >,
): CostFormState {
  const costType = inferCostType(cost);
  return {
    projectId: cost.projectId,
    service: cost.service,
    amount: costDisplayAmount(cost),
    currency: cost.currency,
    costType,
    paidBy: cost.paidBy === "other" ? "other" : "self",
    date: cost.date,
    notes: cost.notes ?? "",
  };
}

export function costFormToCreatePayload(form: CostFormState) {
  const dbFields = costTypeToDbFields(form.costType, form.amount);
  return {
    projectId: form.projectId,
    service: form.service,
    amount: dbFields.amount,
    currency: form.currency,
    isRecurring: dbFields.isRecurring,
    monthlyAmount: dbFields.monthlyAmount ?? undefined,
    paidBy: form.paidBy,
    date: form.date,
    notes: form.notes.trim() || undefined,
  };
}

export function costFormToUpdatePayload(form: CostFormState) {
  const dbFields = costTypeToDbFields(form.costType, form.amount);
  return {
    projectId: form.projectId,
    service: form.service,
    amount: dbFields.amount,
    currency: form.currency,
    isRecurring: dbFields.isRecurring,
    monthlyAmount: dbFields.monthlyAmount,
    paidBy: form.paidBy,
    date: form.date,
    notes: form.notes.trim() || null,
  };
}

export type { CostWithProject };
