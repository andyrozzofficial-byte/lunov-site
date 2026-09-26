import { CLIENT_JOB_STATUS_LABELS } from "@/lib/command-center/types";
import type { ClientJobFormState } from "./clientJobForm";

type Props = {
  form: ClientJobFormState;
  onChange: (form: ClientJobFormState) => void;
};

export function ClientJobFormFields({ form, onChange }: Props) {
  function set<K extends keyof ClientJobFormState>(key: K, value: ClientJobFormState[K]) {
    onChange({ ...form, [key]: value });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="block text-xs text-muted">
        Kund *
        <input
          type="text"
          value={form.clientName}
          onChange={(e) => set("clientName", e.target.value)}
          required
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Projektnamn *
        <input
          type="text"
          value={form.projectName}
          onChange={(e) => set("projectName", e.target.value)}
          required
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted sm:col-span-2">
        Beskrivning
        <textarea
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
          onChange={(e) => set("status", e.target.value as ClientJobFormState["status"])}
          className="cc-input mt-1"
        >
          {Object.entries(CLIENT_JOB_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
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
        Pris (kr)
        <input
          type="number"
          min={0}
          value={form.price || ""}
          onChange={(e) => set("price", Number(e.target.value))}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Betalt (kr)
        <input
          type="number"
          min={0}
          value={form.paidAmount || ""}
          onChange={(e) => set("paidAmount", Number(e.target.value))}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Startdatum
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => set("startDate", e.target.value)}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Klartdatum
        <input
          type="date"
          value={form.completedDate}
          onChange={(e) => set("completedDate", e.target.value)}
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted sm:col-span-2">
        Anteckningar
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
