"use client";

import { TopBar } from "@/components/command-center/shell/TopBar";
import { CcActions } from "@/components/command-center/ui/CcActions";
import { Badge } from "@/components/command-center/ui/Badge";
import { CcCard } from "@/components/command-center/ui/CcCard";
import {
  createClientJob,
  deleteClientJob,
  updateClientJob,
} from "@/lib/command-center/actions/client-jobs";
import type { ClientJobStatus, ClientJobWithComputed } from "@/lib/command-center/types";
import {
  CLIENT_JOB_STATUS_LABELS,
  clientJobPaymentLabel,
  resolveClientJobPaymentStatus,
} from "@/lib/command-center/types";
import { formatCurrency } from "@/lib/command-center/utils/format";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ClientJobFormFields } from "./ClientJobFormFields";
import {
  clientJobFormToCreatePayload,
  clientJobFormToUpdatePayload,
  clientJobToForm,
  emptyClientJobForm,
  type ClientJobFormState,
} from "./clientJobForm";

type Props = {
  jobs: ClientJobWithComputed[];
};

function statusVariant(status: ClientJobStatus) {
  if (status === "paid" || status === "done") return "done" as const;
  if (status === "waiting_client") return "waiting" as const;
  if (status === "in_progress" || status === "invoiced") return "progress" as const;
  return "neutral" as const;
}

export function ClientJobsView({ jobs }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyClientJobForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ClientJobFormState>(emptyClientJobForm);

  function refresh() {
    router.refresh();
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!createForm.clientName.trim() || !createForm.projectName.trim()) return;

    startTransition(async () => {
      await createClientJob(clientJobFormToCreatePayload(createForm));
      setCreateForm(emptyClientJobForm());
      setShowCreate(false);
      refresh();
    });
  }

  function startEdit(job: ClientJobWithComputed) {
    setEditingId(job.id);
    setEditForm(clientJobToForm(job));
    setShowCreate(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyClientJobForm());
  }

  function saveEdit(id: string) {
    if (!editForm.clientName.trim() || !editForm.projectName.trim()) return;

    startTransition(async () => {
      await updateClientJob(id, clientJobFormToUpdatePayload(editForm));
      setEditingId(null);
      refresh();
    });
  }

  function handleDelete(job: ClientJobWithComputed) {
    if (!confirm(`Ta bort kundjobbet "${job.clientName} — ${job.projectName}"?`)) return;

    startTransition(async () => {
      await deleteClientJob(job.id);
      if (editingId === job.id) cancelEdit();
      refresh();
    });
  }

  return (
    <>
      <TopBar greeting="Kundjobb" subtitle="Kundprojekt, deadlines och betalningar" />

      <div className="space-y-6 p-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setShowCreate(!showCreate);
              setEditingId(null);
            }}
            className="rounded-xl bg-lime px-4 py-2 text-sm font-semibold text-black"
          >
            + Nytt kundjobb
          </button>
        </div>

        {showCreate && (
          <CcCard title="Skapa kundjobb">
            <form onSubmit={handleCreate} className="space-y-4">
              <ClientJobFormFields form={createForm} onChange={setCreateForm} />
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
                    setCreateForm(emptyClientJobForm());
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
          <CcCard title="Redigera kundjobb">
            <div className="space-y-4">
              <ClientJobFormFields form={editForm} onChange={setEditForm} />
              <CcActions
                pending={pending}
                showSave
                showCancel
                showDelete
                onSave={() => saveEdit(editingId)}
                onCancel={cancelEdit}
                onDelete={() => {
                  const job = jobs.find((j) => j.id === editingId);
                  if (job) handleDelete(job);
                }}
              />
            </div>
          </CcCard>
        )}

        <CcCard padding="sm">
          <div className="overflow-x-auto">
            <table className="cc-table w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="pb-3 pr-4 font-medium">Kund</th>
                  <th className="pb-3 pr-4 font-medium">Projekt</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Deadline</th>
                  <th className="pb-3 pr-4 font-medium">Pris</th>
                  <th className="pb-3 pr-4 font-medium">Betalt</th>
                  <th className="pb-3 pr-4 font-medium">Kvar att betala</th>
                  <th className="pb-3 pr-4 font-medium">Betalning</th>
                  <th className="pb-3 font-medium">Åtgärder</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const paymentStatus = resolveClientJobPaymentStatus(job);
                  return (
                  <tr key={job.id} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">{job.clientName}</td>
                    <td className="py-3 pr-4 text-muted">{job.projectName}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={statusVariant(job.status)}>
                        {CLIENT_JOB_STATUS_LABELS[job.status]}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 tabular-nums text-muted">{job.deadline ?? "—"}</td>
                    <td className="py-3 pr-4 tabular-nums">{formatCurrency(job.price)}</td>
                    <td className="py-3 pr-4 tabular-nums text-emerald-400">
                      {formatCurrency(job.paidAmount)}
                    </td>
                    <td className="py-3 pr-4 tabular-nums text-amber-400">
                      {formatCurrency(job.unpaidAmount)}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant={
                          paymentStatus === "paid"
                            ? "done"
                            : paymentStatus === "partial"
                              ? "progress"
                              : "waiting"
                        }
                      >
                        {clientJobPaymentLabel(paymentStatus)}
                      </Badge>
                      {job.lastPaymentDate && (
                        <p className="mt-0.5 text-xs text-muted">{job.lastPaymentDate}</p>
                      )}
                    </td>
                    <td className="py-3">
                      <CcActions
                        pending={pending}
                        showEdit
                        showDelete
                        onEdit={() => startEdit(job)}
                        onDelete={() => handleDelete(job)}
                      />
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CcCard>
      </div>
    </>
  );
}
