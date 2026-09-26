"use client";

import { TopBar } from "@/components/command-center/shell/TopBar";
import { CcActions } from "@/components/command-center/ui/CcActions";
import { Badge } from "@/components/command-center/ui/Badge";
import { CcCard } from "@/components/command-center/ui/CcCard";
import { ProgressBar } from "@/components/command-center/ui/ProgressBar";
import {
  addProjectTask,
  deleteProjectTask,
  toggleProjectTask,
  updateProjectTask,
} from "@/lib/command-center/actions/project-tasks";
import { deleteProject, updateProject } from "@/lib/command-center/actions/projects";
import type { Cost, Project, ProjectTask } from "@/lib/command-center/types";
import { PROJECT_STATUS_LABELS } from "@/lib/command-center/types";
import { formatCurrency } from "@/lib/command-center/utils/format";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ProjectCostsSection } from "./ProjectCostsSection";
import { ProjectFormFields } from "./ProjectFormFields";
import { emptyProjectForm, projectToForm, type ProjectFormState } from "./projectForm";

type Props = {
  project: Project;
  tasks: ProjectTask[];
  costs: Cost[];
  totalCosts: number;
  monthlyCosts: number;
  myMonthlyCosts: number;
  othersMonthlyCosts: number;
};

function formToPayload(form: ProjectFormState) {
  return {
    name: form.name.trim(),
    description: form.description.trim() || null,
    status: form.status,
    progress: form.progress,
    nextStep: form.nextStep.trim() || null,
    deadline: form.deadline || null,
    notes: form.notes.trim() || null,
    color: form.color,
  };
}

export function ProjectDetailView({
  project: initialProject,
  tasks: initialTasks,
  costs,
  totalCosts,
  monthlyCosts,
  myMonthlyCosts,
  othersMonthlyCosts,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ProjectFormState>(() => projectToForm(initialProject));
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskEditTitle, setTaskEditTitle] = useState("");

  function refresh() {
    router.refresh();
  }

  function startEdit() {
    setForm(projectToForm(initialProject));
    setIsEditing(true);
  }

  function cancelEdit() {
    setForm(projectToForm(initialProject));
    setIsEditing(false);
  }

  function saveProject() {
    if (!form.name.trim()) return;

    startTransition(async () => {
      await updateProject(initialProject.id, formToPayload(form));
      setIsEditing(false);
      refresh();
    });
  }

  function handleDeleteProject() {
    if (!confirm(`Ta bort projektet "${initialProject.name}"? Detta går inte att ångra.`)) return;

    startTransition(async () => {
      await deleteProject(initialProject.id);
      router.push("/command-center/projekt");
    });
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.trim()) return;
    startTransition(async () => {
      await addProjectTask(initialProject.id, newTask.trim());
      setNewTask("");
      refresh();
    });
  }

  function handleToggleTask(taskId: string) {
    startTransition(async () => {
      await toggleProjectTask(taskId, initialProject.id);
      refresh();
    });
  }

  function startEditTask(task: ProjectTask) {
    setEditingTaskId(task.id);
    setTaskEditTitle(task.title);
  }

  function cancelEditTask() {
    setEditingTaskId(null);
    setTaskEditTitle("");
  }

  function saveEditTask(taskId: string) {
    if (!taskEditTitle.trim()) return;
    startTransition(async () => {
      await updateProjectTask(taskId, initialProject.id, { title: taskEditTitle.trim() });
      setEditingTaskId(null);
      refresh();
    });
  }

  function handleDeleteTask(taskId: string) {
    if (!confirm("Ta bort uppgiften?")) return;
    startTransition(async () => {
      await deleteProjectTask(taskId, initialProject.id);
      if (editingTaskId === taskId) cancelEditTask();
      refresh();
    });
  }

  const status = isEditing ? form.status : initialProject.status;
  const progress = isEditing ? form.progress : initialProject.progress;

  return (
    <>
      <TopBar
        greeting={isEditing ? "Redigera projekt" : initialProject.name}
        subtitle={
          isEditing
            ? initialProject.name
            : initialProject.description ?? undefined
        }
      />

      <div className="space-y-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/command-center/projekt" className="text-xs text-lime hover:underline">
            ← Tillbaka till projekt
          </Link>
          {!isEditing && (
            <CcActions pending={pending} showEdit onEdit={startEdit} />
          )}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <CcCard title="Status & progress" className="lg:col-span-2">
            {isEditing ? (
              <div className="space-y-4">
                <ProjectFormFields form={form} onChange={setForm} idPrefix="detail" />
                <CcActions
                  pending={pending}
                  showSave
                  showCancel
                  showDelete
                  onSave={saveProject}
                  onCancel={cancelEdit}
                  onDelete={handleDeleteProject}
                />
              </div>
            ) : (
              <>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge
                    variant={
                      status === "active" ? "active" : status === "waiting" ? "waiting" : "archived"
                    }
                  >
                    {PROJECT_STATUS_LABELS[status]}
                  </Badge>
                  {initialProject.deadline && (
                    <span className="text-xs text-muted">Deadline: {initialProject.deadline}</span>
                  )}
                </div>
                <ProgressBar
                  value={progress}
                  color={initialProject.color ?? "#d4ff3f"}
                  showLabel
                  size="md"
                />
                {initialProject.nextStep && (
                  <p className="mt-4 text-sm">
                    <span className="text-muted">Nästa steg: </span>
                    {initialProject.nextStep}
                  </p>
                )}
                {initialProject.notes && (
                  <p className="mt-3 text-sm text-muted">{initialProject.notes}</p>
                )}
              </>
            )}
          </CcCard>

          <CcCard title="Ekonomi">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted">Projektkostnad denna månad</p>
                <p className="font-display text-xl font-bold">{formatCurrency(monthlyCosts)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted">Jag betalar</p>
                  <p className="font-semibold tabular-nums">{formatCurrency(myMonthlyCosts)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Annan betalar</p>
                  <p className="font-semibold tabular-nums text-muted">
                    {formatCurrency(othersMonthlyCosts)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted">Totalt investerat</p>
                <p className="font-display text-xl font-bold text-amber-400">
                  {formatCurrency(totalCosts)}
                </p>
              </div>
              <Link
                href="/command-center/kostnader"
                className="inline-block text-xs text-lime hover:underline"
              >
                Se sammanställning →
              </Link>
            </div>
          </CcCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <CcCard title="Uppgifter">
            <ul className="mb-3 space-y-2">
              {initialTasks.length === 0 ? (
                <li className="text-sm text-muted">Inga uppgifter ännu</li>
              ) : (
                initialTasks.map((task) =>
                  editingTaskId === task.id ? (
                    <li
                      key={task.id}
                      className="space-y-2 rounded-xl border border-border bg-white/[0.02] p-3"
                    >
                      <input
                        type="text"
                        value={taskEditTitle}
                        onChange={(e) => setTaskEditTitle(e.target.value)}
                        className="cc-input"
                      />
                      <CcActions
                        pending={pending}
                        showSave
                        showCancel
                        onSave={() => saveEditTask(task.id)}
                        onCancel={cancelEditTask}
                      />
                    </li>
                  ) : (
                    <li
                      key={task.id}
                      className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.02] px-3 py-2"
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleTask(task.id)}
                        disabled={pending}
                        className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                          task.completed
                            ? "border-emerald-500 bg-emerald-500/20"
                            : "border-border hover:border-lime/40"
                        }`}
                        aria-label={task.completed ? "Markera som ej klar" : "Markera som klar"}
                      />
                      <span
                        className={`min-w-0 flex-1 text-sm ${task.completed ? "text-muted line-through" : ""}`}
                      >
                        {task.title}
                      </span>
                      <CcActions
                        pending={pending}
                        showEdit
                        showDelete
                        onEdit={() => startEditTask(task)}
                        onDelete={() => handleDeleteTask(task.id)}
                      />
                    </li>
                  ),
                )
              )}
            </ul>
            <form onSubmit={handleAddTask} className="flex gap-2 border-t border-border pt-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Ny uppgift..."
                className="cc-input flex-1"
              />
              <button
                type="submit"
                disabled={pending || !newTask.trim()}
                className="rounded-xl bg-lime/15 px-3 py-2 text-sm text-lime disabled:opacity-40"
              >
                Lägg till
              </button>
            </form>
          </CcCard>

          <ProjectCostsSection
            projectId={initialProject.id}
            costs={costs}
            monthlyCosts={monthlyCosts}
          />
        </div>
      </div>
    </>
  );
}
