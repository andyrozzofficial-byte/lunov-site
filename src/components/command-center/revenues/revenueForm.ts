import type { RevenueWithRelations } from "@/lib/command-center/actions/revenues";
import type { RevenueStatus } from "@/lib/command-center/types";

export type RevenueFormState = {
  amount: number;
  status: RevenueStatus;
  date: string;
  clientJobId: string;
  projectId: string;
  currency: string;
  notes: string;
};

export function emptyRevenueForm(): RevenueFormState {
  return {
    amount: 0,
    status: "unpaid",
    date: new Date().toISOString().slice(0, 10),
    clientJobId: "",
    projectId: "",
    currency: "SEK",
    notes: "",
  };
}

export function revenueToForm(revenue: RevenueWithRelations): RevenueFormState {
  return {
    amount: revenue.amount,
    status: revenue.status,
    date: revenue.date,
    clientJobId: revenue.clientJobId ?? "",
    projectId: revenue.projectId ?? "",
    currency: revenue.currency,
    notes: revenue.notes ?? "",
  };
}

export function revenueFormToCreatePayload(form: RevenueFormState) {
  return {
    amount: form.amount,
    status: form.status,
    date: form.date,
    clientJobId: form.clientJobId || undefined,
    projectId: form.projectId || undefined,
    currency: form.currency,
    notes: form.notes.trim() || undefined,
  };
}

export function revenueFormToUpdatePayload(form: RevenueFormState) {
  return {
    amount: form.amount,
    status: form.status,
    date: form.date,
    clientJobId: form.clientJobId || null,
    projectId: form.projectId || null,
    currency: form.currency,
    notes: form.notes.trim() || null,
  };
}
