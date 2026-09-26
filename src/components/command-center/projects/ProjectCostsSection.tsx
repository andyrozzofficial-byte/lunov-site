"use client";

import { CostFormFields } from "@/components/command-center/costs/CostFormFields";
import {
  COST_TYPE_LABELS,
  costDisplayAmount,
  costFormToCreatePayload,
  costFormToUpdatePayload,
  costMonthlyAmount,
  costToForm,
  emptyCostForm,
  inferCostType,
  type CostFormState,
} from "@/components/command-center/costs/costForm";
import { CcActions } from "@/components/command-center/ui/CcActions";
import { CcCard } from "@/components/command-center/ui/CcCard";
import { createCost, deleteCost, updateCost } from "@/lib/command-center/actions/costs";
import { COST_PAID_BY_LABELS, type Cost } from "@/lib/command-center/types";
import { resolveCostPaidBy } from "@/lib/command-center/utils/finance";
import { formatCurrency } from "@/lib/command-center/utils/format";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  projectId: string;
  costs: Cost[];
  monthlyCosts: number;
};

export function ProjectCostsSection({ projectId, costs, monthlyCosts }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<CostFormState>(() => emptyCostForm(projectId));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CostFormState>(() => emptyCostForm(projectId));

  function refresh() {
    router.refresh();
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!createForm.amount) return;

    startTransition(async () => {
      await createCost(costFormToCreatePayload({ ...createForm, projectId }));
      setCreateForm(emptyCostForm(projectId));
      setShowCreate(false);
      refresh();
    });
  }

  function startEdit(cost: Cost) {
    setEditingId(cost.id);
    setEditForm(costToForm(cost));
    setShowCreate(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyCostForm(projectId));
  }

  function saveEdit(id: string) {
    if (!editForm.amount) return;

    startTransition(async () => {
      await updateCost(id, costFormToUpdatePayload({ ...editForm, projectId }));
      setEditingId(null);
      refresh();
    });
  }

  function handleDelete(cost: Cost) {
    if (!confirm(`Ta bort kostnaden "${cost.service}"?`)) return;

    startTransition(async () => {
      await deleteCost(cost.id);
      if (editingId === cost.id) cancelEdit();
      refresh();
    });
  }

  return (
    <CcCard title="Kostnader">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="text-xs text-muted">Total månadskostnad</p>
          <p className="font-display text-xl font-bold">{formatCurrency(monthlyCosts)}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowCreate(!showCreate);
            setEditingId(null);
          }}
          className="rounded-lg bg-lime/15 px-3 py-1.5 text-xs font-semibold text-lime"
        >
          + Lägg till kostnad
        </button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="mb-4 space-y-4 rounded-xl border border-border bg-white/[0.02] p-4">
          <CostFormFields
            form={createForm}
            onChange={setCreateForm}
            fixedProjectId={projectId}
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
                setCreateForm(emptyCostForm(projectId));
              }}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground"
            >
              Avbryt
            </button>
          </div>
        </form>
      )}

      {editingId && (
        <div className="mb-4 space-y-4 rounded-xl border border-border bg-white/[0.02] p-4">
          <CostFormFields form={editForm} onChange={setEditForm} fixedProjectId={projectId} />
          <CcActions
            pending={pending}
            showSave
            showCancel
            showDelete
            onSave={() => saveEdit(editingId)}
            onCancel={cancelEdit}
            onDelete={() => {
              const cost = costs.find((c) => c.id === editingId);
              if (cost) handleDelete(cost);
            }}
          />
        </div>
      )}

      {costs.length === 0 ? (
        <p className="text-sm text-muted">Inga kostnader registrerade</p>
      ) : (
        <ul className="space-y-2">
          {costs.map((cost) => (
            <li
              key={cost.id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border bg-white/[0.02] px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{cost.service}</span>
                  <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-muted">
                    {COST_TYPE_LABELS[inferCostType(cost)]}
                  </span>
                  <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-muted">
                    {COST_PAID_BY_LABELS[resolveCostPaidBy(cost)]}
                  </span>
                </div>
                <p className="mt-0.5 text-sm tabular-nums">
                  {formatCurrency(costDisplayAmount(cost))}
                  {inferCostType(cost) === "yearly" && (
                    <span className="ml-1 text-xs text-muted">
                      ({formatCurrency(costMonthlyAmount(cost))}/mån)
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted">{cost.date}</p>
                {cost.notes && <p className="mt-1 text-xs text-muted">{cost.notes}</p>}
              </div>
              <CcActions
                pending={pending}
                showEdit
                showDelete
                onEdit={() => startEdit(cost)}
                onDelete={() => handleDelete(cost)}
              />
            </li>
          ))}
        </ul>
      )}
    </CcCard>
  );
}
