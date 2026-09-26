"use client";

import { TopBar } from "@/components/command-center/shell/TopBar";
import { CcActions } from "@/components/command-center/ui/CcActions";
import { Badge } from "@/components/command-center/ui/Badge";
import { CcCard } from "@/components/command-center/ui/CcCard";
import { ProgressBar } from "@/components/command-center/ui/ProgressBar";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/command-center/actions/projects";
import type { ProjectStatus, ProjectWithStats } from "@/lib/command-center/types";
import { PROJECT_STATUS_LABELS } from "@/lib/command-center/types";
import { formatCurrency } from "@/lib/command-center/utils/format";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ProjectFormFields } from "./ProjectFormFields";
import { emptyProjectForm, projectToForm, type ProjectFormState } from "./projectForm";

type Props = {
  projects: ProjectWithStats[];
};

const filters: { key: ProjectStatus | "all"; label: string }[] = [
  { key: "all", label: "Alla" },
  { key: "active", label: "Aktiva" },
  { key: "waiting", label: "Väntar" },
  { key: "archived", label: "Arkiverade" },
];

function statusVariant(status: ProjectStatus) {
  if (status === "active") return "active" as const;
  if (status === "waiting") return "waiting" as const;
  return "archived" as const;
}

function formToPayload(form: ProjectFormState) {
  return {
    name: form.name.trim(),
    description: form.description.trim() || undefined,
    status: form.status,
    progress: form.progress,
    nextStep: form.nextStep.trim() || undefined,
    deadline: form.deadline || undefined,
    notes: form.notes.trim() || undefined,
    color: form.color,
  };
}

export function ProjectsView({ projects }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyProjectForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProjectFormState>(emptyProjectForm);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!createForm.name.trim()) return;

    startTransition(async () => {
      await createProject(formToPayload(createForm));
      setCreateForm(emptyProjectForm());
      setShowCreate(false);
      router.refresh();
    });
  }

  function startEdit(project: ProjectWithStats) {
    setEditingId(project.id);
    setEditForm(projectToForm(project));
    setShowCreate(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyProjectForm());
  }

  function handleSaveEdit(projectId: string) {
    if (!editForm.name.trim()) return;

    startTransition(async () => {
      await updateProject(projectId, formToPayload(editForm));
      setEditingId(null);
      router.refresh();
    });
  }

  function handleDelete(project: ProjectWithStats) {
    if (!confirm(`Ta bort projektet "${project.name}"? Detta går inte att ångra.`)) return;

    startTransition(async () => {
      await deleteProject(project.id);
      if (editingId === project.id) setEditingId(null);
      router.refresh();
    });
  }

  return (
    <>
      <TopBar greeting="Projekt" subtitle="Egna projekt och utveckling" />

      <div className="space-y-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === f.key ? "bg-lime/10 text-lime" : "text-muted hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setShowCreate(!showCreate);
              setEditingId(null);
            }}
            className="rounded-xl bg-lime px-4 py-2 text-sm font-semibold text-black"
          >
            + Nytt projekt
          </button>
        </div>

        {showCreate && (
          <CcCard title="Skapa projekt">
            <form onSubmit={handleCreate} className="space-y-4">
              <ProjectFormFields form={createForm} onChange={setCreateForm} idPrefix="create" />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={pending || !createForm.name.trim()}
                  className="rounded-lg bg-lime px-3 py-1.5 text-xs font-semibold text-black disabled:opacity-40"
                >
                  Spara
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    setShowCreate(false);
                    setCreateForm(emptyProjectForm());
                  }}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground"
                >
                  Avbryt
                </button>
              </div>
            </form>
          </CcCard>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) =>
            editingId === project.id ? (
              <CcCard key={project.id} title={`Redigera — ${project.name}`} className="sm:col-span-2 lg:col-span-3">
                <div className="space-y-4">
                  <ProjectFormFields form={editForm} onChange={setEditForm} idPrefix={`edit-${project.id}`} />
                  <CcActions
                    pending={pending}
                    showSave
                    showCancel
                    showDelete
                    onSave={() => handleSaveEdit(project.id)}
                    onCancel={cancelEdit}
                    onDelete={() => handleDelete(project)}
                  />
                </div>
              </CcCard>
            ) : (
              <CcCard key={project.id} className="cc-card-premium flex h-full flex-col">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <Link
                    href={`/command-center/projekt/${project.id}`}
                    className="flex min-w-0 items-center gap-2 hover:text-lime"
                  >
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: project.color ?? "#d4ff3f" }}
                    />
                    <span className="font-display font-semibold">{project.name}</span>
                  </Link>
                  <Badge variant={statusVariant(project.status)}>
                    {PROJECT_STATUS_LABELS[project.status]}
                  </Badge>
                </div>
                <ProgressBar value={project.progress} color={project.color ?? "#d4ff3f"} showLabel />
                {project.description && (
                  <p className="mt-3 line-clamp-2 text-xs text-muted">{project.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted">
                  <span>{project.weeklyTaskCount} uppgifter denna vecka</span>
                  <span>Kostnad: {formatCurrency(project.totalCosts, "SEK", true)}</span>
                </div>
                {project.nextStep && (
                  <p className="mt-2 text-xs text-muted">Nästa: {project.nextStep}</p>
                )}
                <div className="mt-4 border-t border-border pt-3">
                  <CcActions
                    pending={pending}
                    showEdit
                    showDelete
                    onEdit={() => startEdit(project)}
                    onDelete={() => handleDelete(project)}
                  />
                </div>
              </CcCard>
            ),
          )}
        </div>
      </div>
    </>
  );
}
