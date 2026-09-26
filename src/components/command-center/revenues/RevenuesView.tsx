"use client";

import { TopBar } from "@/components/command-center/shell/TopBar";
import { CcActions } from "@/components/command-center/ui/CcActions";
import { Badge } from "@/components/command-center/ui/Badge";
import { CcCard } from "@/components/command-center/ui/CcCard";
import {
  createRevenue,
  deleteRevenue,
  updateRevenue,
} from "@/lib/command-center/actions/revenues";
import type { RevenueWithRelations } from "@/lib/command-center/actions/revenues";
import type { ClientJob, Project } from "@/lib/command-center/types";
import { REVENUE_STATUS_LABELS } from "@/lib/command-center/types";
import { formatCurrency } from "@/lib/command-center/utils/format";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { RevenueFormFields } from "./RevenueFormFields";
import {
  emptyRevenueForm,
  revenueFormToCreatePayload,
  revenueFormToUpdatePayload,
  revenueToForm,
  type RevenueFormState,
} from "./revenueForm";

type Props = {
  monthlyTotal: number;
  unpaidTotal: number;
  paidClientJobsTotal: number;
  upcomingTotal: number;
  paidJobs: ClientJob[];
  unpaidJobList: ClientJob[];
  revenues: RevenueWithRelations[];
  projects: Project[];
  clientJobs: ClientJob[];
};

export function RevenuesView({
  monthlyTotal,
  unpaidTotal,
  paidClientJobsTotal,
  upcomingTotal,
  paidJobs,
  unpaidJobList,
  revenues,
  projects,
  clientJobs,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyRevenueForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<RevenueFormState>(emptyRevenueForm);

  function refresh() {
    router.refresh();
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!createForm.amount) return;

    startTransition(async () => {
      await createRevenue(revenueFormToCreatePayload(createForm));
      setCreateForm(emptyRevenueForm());
      setShowCreate(false);
      refresh();
    });
  }

  function startEdit(revenue: RevenueWithRelations) {
    setEditingId(revenue.id);
    setEditForm(revenueToForm(revenue));
    setShowCreate(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyRevenueForm());
  }

  function saveEdit(id: string) {
    if (!editForm.amount) return;

    startTransition(async () => {
      await updateRevenue(id, revenueFormToUpdatePayload(editForm));
      setEditingId(null);
      refresh();
    });
  }

  function handleDelete(revenue: RevenueWithRelations) {
    if (!confirm(`Ta bort intäkten på ${formatCurrency(revenue.amount)}?`)) return;

    startTransition(async () => {
      await deleteRevenue(revenue.id);
      if (editingId === revenue.id) cancelEdit();
      refresh();
    });
  }

  return (
    <>
      <TopBar greeting="Intäkter" subtitle="Betalda, obetalda och kommande intäkter" />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CcCard>
            <p className="text-xs text-muted">Intäkter denna månad</p>
            <p className="font-display text-2xl font-bold text-emerald-400">
              {formatCurrency(monthlyTotal)}
            </p>
            <p className="mt-1 text-xs text-muted">Betalda intäkter med datum i aktuell månad</p>
          </CcCard>
          <CcCard>
            <p className="text-xs text-muted">Obetalda kundjobb</p>
            <p className="font-display text-2xl font-bold text-amber-400">
              {formatCurrency(unpaidTotal)}
            </p>
          </CcCard>
          <CcCard>
            <p className="text-xs text-muted">Betalda kundjobb</p>
            <p className="font-display text-2xl font-bold text-blue-400">
              {formatCurrency(paidClientJobsTotal)}
            </p>
            <p className="mt-1 text-xs text-muted">Totalt mottaget på kundjobb</p>
          </CcCard>
          <CcCard>
            <p className="text-xs text-muted">Kommande intäkter</p>
            <p className="font-display text-2xl font-bold">
              {formatCurrency(upcomingTotal)}
            </p>
          </CcCard>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setShowCreate(!showCreate);
              setEditingId(null);
            }}
            className="rounded-xl bg-lime px-4 py-2 text-sm font-semibold text-black"
          >
            + Registrera intäkt
          </button>
        </div>

        {showCreate && (
          <CcCard title="Ny intäkt">
            <form onSubmit={handleCreate} className="space-y-4">
              <RevenueFormFields
                form={createForm}
                onChange={setCreateForm}
                projects={projects}
                clientJobs={clientJobs}
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-black disabled:opacity-40"
                >
                  Spara
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    setShowCreate(false);
                    setCreateForm(emptyRevenueForm());
                  }}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground"
                >
                  Avbryt
                </button>
              </div>
            </form>
          </CcCard>
        )}

        {editingId && (
          <CcCard title="Redigera intäkt">
            <div className="space-y-4">
              <RevenueFormFields
                form={editForm}
                onChange={setEditForm}
                projects={projects}
                clientJobs={clientJobs}
              />
              <CcActions
                pending={pending}
                showSave
                showCancel
                showDelete
                onSave={() => saveEdit(editingId)}
                onCancel={cancelEdit}
                onDelete={() => {
                  const revenue = revenues.find((r) => r.id === editingId);
                  if (revenue) handleDelete(revenue);
                }}
              />
            </div>
          </CcCard>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <CcCard title="Obetalda kundjobb">
            <ul className="space-y-2 text-sm">
              {unpaidJobList.length === 0 ? (
                <li className="text-muted">Alla kundjobb är betalda</li>
              ) : (
                unpaidJobList.map((job) => (
                  <li key={job.id} className="flex justify-between gap-2">
                    <span>
                      {job.clientName} — {job.projectName}
                    </span>
                    <span className="tabular-nums text-amber-400">
                      {formatCurrency(job.price - job.paidAmount)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </CcCard>

          <CcCard title="Betalda kundjobb">
            <ul className="space-y-2 text-sm">
              {paidJobs.length === 0 ? (
                <li className="text-muted">Inga betalda kundjobb ännu</li>
              ) : (
                paidJobs.map((job) => (
                  <li key={job.id} className="flex justify-between gap-2">
                    <span>
                      {job.clientName} — {job.projectName}
                    </span>
                    <span className="tabular-nums text-emerald-400">
                      {formatCurrency(job.paidAmount)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </CcCard>
        </div>

        <CcCard title="Alla intäkter" padding="sm">
          <div className="overflow-x-auto">
            <table className="cc-table w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="pb-3 pr-4 font-medium">Datum</th>
                  <th className="pb-3 pr-4 font-medium">Belopp</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Kundjobb/Projekt</th>
                  <th className="pb-3 font-medium">Åtgärder</th>
                </tr>
              </thead>
              <tbody>
                {revenues.map((rev) => (
                  <tr key={rev.id} className="border-b border-border/50">
                    <td className="py-3 pr-4 tabular-nums text-muted">{rev.date}</td>
                    <td className="py-3 pr-4 tabular-nums font-medium">
                      {formatCurrency(rev.amount)}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant={
                          rev.status === "paid"
                            ? "done"
                            : rev.status === "upcoming"
                              ? "progress"
                              : "waiting"
                        }
                      >
                        {REVENUE_STATUS_LABELS[rev.status]}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-muted">
                      {rev.clientJobLabel ?? rev.projectName ?? "—"}
                    </td>
                    <td className="py-3">
                      <CcActions
                        pending={pending}
                        showEdit
                        showDelete
                        onEdit={() => startEdit(rev)}
                        onDelete={() => handleDelete(rev)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CcCard>
      </div>
    </>
  );
}
