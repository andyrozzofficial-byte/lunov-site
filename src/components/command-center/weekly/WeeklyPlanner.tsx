"use client";

import { TopBar } from "@/components/command-center/shell/TopBar";
import { CcActions } from "@/components/command-center/ui/CcActions";
import { Badge } from "@/components/command-center/ui/Badge";
import { CcCard } from "@/components/command-center/ui/CcCard";
import {
  createWeeklyTask,
  deleteWeeklyTask,
  moveWeeklyTask,
  setWeekFocus,
  toggleWeeklyTask,
  updateWeeklyTask,
} from "@/lib/command-center/actions/weekly";
import type { ClientJob, Project, WeekFocus, WeeklyTaskWithRelations } from "@/lib/command-center/types";
import { DAY_NAMES, DAY_NAMES_SHORT } from "@/lib/command-center/types";
import { formatDayLabel, getWeekDays, getWeekNumber, getWeekStart } from "@/lib/command-center/utils/date";
import { formatMinutes } from "@/lib/command-center/utils/format";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  tasks: WeeklyTaskWithRelations[];
  weekFocus?: WeekFocus;
  projects: Project[];
  clientJobs: ClientJob[];
  weekStart: string;
};

export function WeeklyPlanner({
  tasks: initialTasks,
  weekFocus: initialFocus,
  projects,
  clientJobs,
  weekStart,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  });
  const [newTitle, setNewTitle] = useState("");
  const [newProjectId, setNewProjectId] = useState("");
  const [newClientJobId, setNewClientJobId] = useState("");
  const [newMinutes, setNewMinutes] = useState(60);
  const [focusTitle, setFocusTitle] = useState(initialFocus?.title ?? "");
  const [focusDescription, setFocusDescription] = useState(initialFocus?.description ?? "");
  const [focusProjectId, setFocusProjectId] = useState(initialFocus?.projectId ?? "");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDay, setEditDay] = useState(0);
  const [editMinutes, setEditMinutes] = useState(60);
  const [editProjectId, setEditProjectId] = useState("");
  const [editClientJobId, setEditClientJobId] = useState("");

  const weekDays = getWeekDays(weekStart);

  function refresh() {
    router.refresh();
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    startTransition(async () => {
      await createWeeklyTask({
        title: newTitle.trim(),
        dayOfWeek: selectedDay,
        weekStart,
        projectId: newProjectId || undefined,
        clientJobId: newClientJobId || undefined,
        estimatedMinutes: newMinutes,
      });
      setNewTitle("");
      refresh();
    });
  }

  function handleToggle(taskId: string) {
    startTransition(async () => {
      await toggleWeeklyTask(taskId);
      refresh();
    });
  }

  function handleMove(taskId: string, day: number) {
    startTransition(async () => {
      await moveWeeklyTask(taskId, day);
      refresh();
    });
  }

  function handleDelete(taskId: string) {
    if (!confirm("Ta bort uppgiften?")) return;
    startTransition(async () => {
      await deleteWeeklyTask(taskId);
      if (editingTaskId === taskId) setEditingTaskId(null);
      refresh();
    });
  }

  function startEditTask(task: WeeklyTaskWithRelations) {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDay(task.dayOfWeek);
    setEditMinutes(task.estimatedMinutes);
    setEditProjectId(task.projectId ?? "");
    setEditClientJobId(task.clientJobId ?? "");
  }

  function cancelEditTask() {
    setEditingTaskId(null);
  }

  function saveEditTask(taskId: string) {
    if (!editTitle.trim()) return;

    startTransition(async () => {
      await updateWeeklyTask(taskId, {
        title: editTitle.trim(),
        dayOfWeek: editDay,
        estimatedMinutes: editMinutes,
        projectId: editProjectId || null,
        clientJobId: editClientJobId || null,
      });
      setEditingTaskId(null);
      refresh();
    });
  }

  function handleSaveFocus(e: React.FormEvent) {
    e.preventDefault();
    if (!focusTitle.trim()) return;

    startTransition(async () => {
      await setWeekFocus({
        title: focusTitle.trim(),
        description: focusDescription.trim() || undefined,
        projectId: focusProjectId || undefined,
        weekStart,
      });
      refresh();
    });
  }

  const dayTasks = initialTasks.filter((t) => t.dayOfWeek === selectedDay);
  const totalWeekMinutes = initialTasks.reduce((s, t) => s + t.estimatedMinutes, 0);

  return (
    <>
      <TopBar
        greeting="Min vecka"
        subtitle={`Vecka ${getWeekNumber(weekStart)} · ${formatDayLabel(weekDays[0])} – ${formatDayLabel(weekDays[6])}`}
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Veckokalender */}
          <CcCard title="Veckoplanering" className="lg:col-span-2">
            <div className="mb-4 grid grid-cols-7 gap-2">
              {weekDays.map((day, i) => {
                const tasks = initialTasks.filter((t) => t.dayOfWeek === i);
                const minutes = tasks.reduce((s, t) => s + t.estimatedMinutes, 0);
                const isSelected = selectedDay === i;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDay(i)}
                    className={`rounded-xl p-3 text-center transition-all ${
                      isSelected
                        ? "bg-lime/10 ring-1 ring-lime/30"
                        : "bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    <p className="text-[11px] text-muted">{DAY_NAMES_SHORT[i]}</p>
                    <p className={`text-lg font-semibold ${isSelected ? "text-lime" : ""}`}>
                      {day.getDate()}
                    </p>
                    <p className="mt-1 text-[10px] text-muted">
                      {tasks.length > 0 ? formatMinutes(minutes) : "—"}
                    </p>
                    <div className="mt-1.5 flex justify-center gap-0.5">
                      {tasks.slice(0, 4).map((t) => (
                        <span
                          key={t.id}
                          className={`size-1.5 rounded-full ${t.completed ? "bg-emerald-400" : "bg-amber-400"}`}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mb-4 flex items-center justify-between border-t border-border pt-4">
              <h4 className="font-display text-sm font-semibold">
                {DAY_NAMES[selectedDay]} {weekDays[selectedDay].getDate()} —{" "}
                {dayTasks.length} uppgifter ·{" "}
                {formatMinutes(dayTasks.reduce((s, t) => s + t.estimatedMinutes, 0))}
              </h4>
              <span className="text-xs text-muted">
                Totalt vecka: {formatMinutes(totalWeekMinutes)}
              </span>
            </div>

            <ul className="mb-4 space-y-2">
              {dayTasks.length === 0 ? (
                <li className="py-4 text-center text-sm text-muted">Inga uppgifter denna dag</li>
              ) : (
                dayTasks.map((task) =>
                  editingTaskId === task.id ? (
                    <li
                      key={task.id}
                      className="space-y-3 rounded-xl border border-lime/20 bg-lime/[0.03] p-3"
                    >
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="cc-input"
                      />
                      <div className="grid gap-2 sm:grid-cols-2">
                        <select
                          value={editDay}
                          onChange={(e) => setEditDay(Number(e.target.value))}
                          className="cc-input"
                        >
                          {DAY_NAMES.map((name, i) => (
                            <option key={name} value={i}>
                              {name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min={15}
                          step={15}
                          value={editMinutes}
                          onChange={(e) => setEditMinutes(Number(e.target.value))}
                          className="cc-input"
                          aria-label="Uppskattad tid i minuter"
                        />
                        <select
                          value={editProjectId}
                          onChange={(e) => {
                            setEditProjectId(e.target.value);
                            setEditClientJobId("");
                          }}
                          className="cc-input"
                        >
                          <option value="">Projekt</option>
                          {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                        <select
                          value={editClientJobId}
                          onChange={(e) => {
                            setEditClientJobId(e.target.value);
                            setEditProjectId("");
                          }}
                          className="cc-input"
                        >
                          <option value="">Kundjobb</option>
                          {clientJobs.map((j) => (
                            <option key={j.id} value={j.id}>
                              {j.clientName} — {j.projectName}
                            </option>
                          ))}
                        </select>
                      </div>
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
                      className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-white/[0.02] px-3 py-2.5"
                    >
                      <button
                        type="button"
                        onClick={() => handleToggle(task.id)}
                        disabled={pending}
                        className={`flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                          task.completed
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                            : "border-border hover:border-lime/40"
                        }`}
                        aria-label={task.completed ? "Markera som ej klar" : "Markera som klar"}
                      >
                        {task.completed && (
                          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm ${task.completed ? "text-muted line-through" : ""}`}>
                          {task.title}
                        </p>
                        <div className="mt-0.5 flex flex-wrap gap-1.5">
                          {task.projectName && (
                            <Badge variant="neutral">{task.projectName}</Badge>
                          )}
                          {task.clientJobName && (
                            <Badge variant="progress">Kundjobb</Badge>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs tabular-nums text-muted">
                        {formatMinutes(task.estimatedMinutes)}
                      </span>
                      <select
                        value={task.dayOfWeek}
                        onChange={(e) => handleMove(task.id, Number(e.target.value))}
                        disabled={pending}
                        className="rounded-lg border border-border bg-card px-2 py-1 text-xs text-muted"
                        aria-label="Flytta uppgift"
                      >
                        {DAY_NAMES.map((name, i) => (
                          <option key={name} value={i}>
                            {DAY_NAMES_SHORT[i]}
                          </option>
                        ))}
                      </select>
                      <CcActions
                        pending={pending}
                        showEdit
                        showDelete
                        onEdit={() => startEditTask(task)}
                        onDelete={() => handleDelete(task.id)}
                      />
                    </li>
                  ),
                )
              )}
            </ul>

            <form onSubmit={handleAddTask} className="flex flex-wrap items-end gap-2 border-t border-border pt-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ny uppgift..."
                className="min-w-[200px] flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm focus:border-lime/40 focus:outline-none"
              />
              <select
                value={newProjectId}
                onChange={(e) => {
                  setNewProjectId(e.target.value);
                  setNewClientJobId("");
                }}
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted"
              >
                <option value="">Projekt</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <select
                value={newClientJobId}
                onChange={(e) => {
                  setNewClientJobId(e.target.value);
                  setNewProjectId("");
                }}
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted"
              >
                <option value="">Kundjobb</option>
                {clientJobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.clientName} — {j.projectName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={newMinutes}
                onChange={(e) => setNewMinutes(Number(e.target.value))}
                min={15}
                step={15}
                className="w-20 rounded-xl border border-border bg-card px-3 py-2 text-sm tabular-nums"
                aria-label="Uppskattad tid i minuter"
              />
              <button
                type="submit"
                disabled={pending || !newTitle.trim()}
                className="rounded-xl bg-lime px-4 py-2 text-sm font-semibold text-black disabled:opacity-40"
              >
                Lägg till
              </button>
            </form>
          </CcCard>

          {/* Veckofokus */}
          <CcCard title="Huvudfokus för veckan">
            <form onSubmit={handleSaveFocus} className="space-y-3">
              <input
                type="text"
                value={focusTitle}
                onChange={(e) => setFocusTitle(e.target.value)}
                placeholder="Vad är huvudfokus?"
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm focus:border-lime/40 focus:outline-none"
              />
              <textarea
                value={focusDescription}
                onChange={(e) => setFocusDescription(e.target.value)}
                placeholder="Beskrivning (valfritt)"
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2 text-sm focus:border-lime/40 focus:outline-none"
              />
              <select
                value={focusProjectId}
                onChange={(e) => setFocusProjectId(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted"
              >
                <option value="">Koppla till projekt (valfritt)</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={pending || !focusTitle.trim()}
                className="w-full rounded-xl bg-lime/15 py-2 text-sm font-medium text-lime ring-1 ring-lime/25 hover:bg-lime/20 disabled:opacity-40"
              >
                Spara veckofokus
              </button>
            </form>
          </CcCard>
        </div>
      </div>
    </>
  );
}
