import type { ClientJob, Project } from "@/lib/command-center/types";
import type { WaitingFormState } from "./waitingForm";

type Props = {
  form: WaitingFormState;
  onChange: (form: WaitingFormState) => void;
  projects: Project[];
  clientJobs: ClientJob[];
};

export function WaitingFormFields({ form, onChange, projects, clientJobs }: Props) {
  function set<K extends keyof WaitingFormState>(key: K, value: WaitingFormState[K]) {
    onChange({ ...form, [key]: value });
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs text-muted">
        Titel *
        <input
          type="text"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          required
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Beskrivning
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={2}
          placeholder="Vad väntar du på?"
          className="cc-input mt-1 resize-none"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs text-muted">
          Projekt
          <select
            value={form.projectId}
            onChange={(e) => onChange({ ...form, projectId: e.target.value, clientJobId: "" })}
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
        <label className="block text-xs text-muted">
          Kundjobb
          <select
            value={form.clientJobId}
            onChange={(e) => onChange({ ...form, clientJobId: e.target.value, projectId: "" })}
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
      </div>
    </div>
  );
}
