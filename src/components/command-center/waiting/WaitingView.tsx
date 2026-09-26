"use client";

import { TopBar } from "@/components/command-center/shell/TopBar";
import { CcActions } from "@/components/command-center/ui/CcActions";
import { Badge } from "@/components/command-center/ui/Badge";
import { CcCard } from "@/components/command-center/ui/CcCard";
import {
  createWaitingItem,
  deleteWaitingItem,
  resolveWaitingItem,
  updateWaitingItem,
} from "@/lib/command-center/actions/waiting";
import type { WaitingItemWithRelations } from "@/lib/command-center/actions/waiting";
import type { ClientJob, Project } from "@/lib/command-center/types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { WaitingFormFields } from "./WaitingFormFields";
import {
  emptyWaitingForm,
  waitingFormToCreatePayload,
  waitingFormToUpdatePayload,
  waitingToForm,
  type WaitingFormState,
} from "./waitingForm";

type Props = {
  items: WaitingItemWithRelations[];
  projects: Project[];
  clientJobs: ClientJob[];
};

export function WaitingView({ items, projects, clientJobs }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyWaitingForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<WaitingFormState>(emptyWaitingForm);

  function refresh() {
    router.refresh();
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!createForm.title.trim()) return;

    startTransition(async () => {
      await createWaitingItem(waitingFormToCreatePayload(createForm));
      setCreateForm(emptyWaitingForm());
      setShowCreate(false);
      refresh();
    });
  }

  function startEdit(item: WaitingItemWithRelations) {
    setEditingId(item.id);
    setEditForm(waitingToForm(item));
    setShowCreate(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyWaitingForm());
  }

  function saveEdit(id: string) {
    if (!editForm.title.trim()) return;

    startTransition(async () => {
      await updateWaitingItem(id, waitingFormToUpdatePayload(editForm));
      setEditingId(null);
      refresh();
    });
  }

  function handleResolve(item: WaitingItemWithRelations) {
    startTransition(async () => {
      await resolveWaitingItem(item.id);
      if (editingId === item.id) cancelEdit();
      refresh();
    });
  }

  function handleDelete(item: WaitingItemWithRelations) {
    if (!confirm(`Ta bort "${item.title}"?`)) return;

    startTransition(async () => {
      await deleteWaitingItem(item.id);
      if (editingId === item.id) cancelEdit();
      refresh();
    });
  }

  return (
    <>
      <TopBar
        greeting="Väntar på"
        subtitle="Saker du inte kan göra just nu — väntar på någon annan"
      />

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
            + Lägg till
          </button>
        </div>

        {showCreate && (
          <CcCard title="Nytt väntande item">
            <form onSubmit={handleCreate} className="space-y-4">
              <WaitingFormFields
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
                    setCreateForm(emptyWaitingForm());
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
          <CcCard title="Redigera väntande item">
            <div className="space-y-4">
              <WaitingFormFields
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
                  const item = items.find((i) => i.id === editingId);
                  if (item) handleDelete(item);
                }}
              />
            </div>
          </CcCard>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {items.length === 0 ? (
            <CcCard>
              <p className="text-sm text-muted">Inget att vänta på just nu — bra jobbat!</p>
            </CcCard>
          ) : (
            items.map((item) => (
              <CcCard key={item.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {item.projectName && (
                        <span className="font-display font-semibold">{item.projectName}</span>
                      )}
                      <Badge variant="waiting">Väntar</Badge>
                    </div>
                    <p className="text-sm font-medium">{item.title}</p>
                    {item.description && (
                      <p className="mt-1 text-sm text-muted">{item.description}</p>
                    )}
                    {item.clientJobLabel && (
                      <p className="mt-2 text-xs text-muted">{item.clientJobLabel}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 border-t border-border pt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <CcActions
                      pending={pending}
                      showEdit
                      showDelete
                      onEdit={() => startEdit(item)}
                      onDelete={() => handleDelete(item)}
                    />
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => handleResolve(item)}
                      className="rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/25 hover:bg-emerald-500/20 disabled:opacity-40"
                    >
                      Markera klart
                    </button>
                  </div>
                </div>
              </CcCard>
            ))
          )}
        </div>
      </div>
    </>
  );
}
