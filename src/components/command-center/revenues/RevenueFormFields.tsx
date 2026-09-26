import type { ClientJob, Project } from "@/lib/command-center/types";
import { REVENUE_STATUS_LABELS } from "@/lib/command-center/types";
import type { RevenueFormState } from "./revenueForm";

type Props = {
  form: RevenueFormState;
  onChange: (form: RevenueFormState) => void;
  projects: Project[];
  clientJobs: ClientJob[];
};

export function RevenueFormFields({ form, onChange, projects, clientJobs }: Props) {
  function set<K extends keyof RevenueFormState>(key: K, value: RevenueFormState[K]) {
    onChange({ ...form, [key]: value });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="block text-xs text-muted">
        Belopp (kr) *
        <input
          type="number"
          min={0}
          value={form.amount || ""}
          onChange={(e) => set("amount", Number(e.target.value))}
          required
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Status
        <select
          value={form.status}
          onChange={(e) => set("status", e.target.value as RevenueFormState["status"])}
          className="cc-input mt-1"
        >
          {Object.entries(REVENUE_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-muted">
        Datum
        <input
          type="date"
          value={form.date}
          onChange={(e) => set("date", e.target.value)}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Valuta
        <input
          type="text"
          value={form.currency}
          onChange={(e) => set("currency", e.target.value)}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted sm:col-span-2">
        Kundjobb (valfritt)
        <select
          value={form.clientJobId}
          onChange={(e) => set("clientJobId", e.target.value)}
          className="cc-input mt-1"
        >
          <option value="">Inget kundjobb</option>
          {clientJobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.clientName} — {j.projectName}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-muted sm:col-span-2">
        Projekt (valfritt)
        <select
          value={form.projectId}
          onChange={(e) => set("projectId", e.target.value)}
          className="cc-input mt-1"
        >
          <option value="">Inget projekt</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-muted sm:col-span-2">
        Anteckning
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          className="cc-input mt-1 resize-none"
        />
      </label>
    </div>
  );
}
