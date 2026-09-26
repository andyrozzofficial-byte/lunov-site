import type { ProjectFormState } from "./projectForm";
import { PROJECT_STATUS_LABELS } from "@/lib/command-center/types";

type Props = {
  form: ProjectFormState;
  onChange: (form: ProjectFormState) => void;
  idPrefix?: string;
};

export function ProjectFormFields({ form, onChange, idPrefix = "project" }: Props) {
  function set<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
    onChange({ ...form, [key]: value });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="block text-xs text-muted sm:col-span-2">
        Namn *
        <input
          id={`${idPrefix}-name`}
          type="text"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          required
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted sm:col-span-2">
        Beskrivning
        <textarea
          id={`${idPrefix}-description`}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={2}
          className="cc-input mt-1 resize-none"
        />
      </label>
      <label className="block text-xs text-muted">
        Status
        <select
          value={form.status}
          onChange={(e) => set("status", e.target.value as ProjectFormState["status"])}
          className="cc-input mt-1"
        >
          {Object.entries(PROJECT_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-muted">
        Progress (%)
        <input
          type="number"
          min={0}
          max={100}
          value={form.progress}
          onChange={(e) => set("progress", Number(e.target.value))}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Deadline
        <input
          type="date"
          value={form.deadline}
          onChange={(e) => set("deadline", e.target.value)}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Färg
        <input
          type="color"
          value={form.color}
          onChange={(e) => set("color", e.target.value)}
          className="mt-1 h-10 w-full cursor-pointer rounded-xl border border-border bg-background"
        />
      </label>
      <label className="block text-xs text-muted sm:col-span-2">
        Nästa steg
        <input
          type="text"
          value={form.nextStep}
          onChange={(e) => set("nextStep", e.target.value)}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted sm:col-span-2">
        Anteckningar
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          className="cc-input mt-1 resize-none"
        />
      </label>
    </div>
  );
}
