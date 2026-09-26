import type { Project } from "@/lib/command-center/types";
import { COST_PAID_BY_LABELS, COST_SERVICES } from "@/lib/command-center/types";
import { COST_TYPE_LABELS, type CostFormState } from "./costForm";

type Props = {
  form: CostFormState;
  onChange: (form: CostFormState) => void;
  projects?: Project[];
  fixedProjectId?: string;
};

export function CostFormFields({ form, onChange, projects, fixedProjectId }: Props) {
  function set<K extends keyof CostFormState>(key: K, value: CostFormState[K]) {
    onChange({ ...form, [key]: value });
  }

  const amountLabel =
    form.costType === "yearly"
      ? "Belopp per år (kr) *"
      : form.costType === "monthly"
        ? "Belopp per månad (kr) *"
        : "Belopp (kr) *";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {!fixedProjectId && projects && (
        <label className="block text-xs text-muted">
          Projekt *
          <select
            value={form.projectId}
            onChange={(e) => set("projectId", e.target.value)}
            required
            className="cc-input mt-1"
          >
            <option value="">Välj projekt</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="block text-xs text-muted">
        Tjänst / namn *
        <select
          value={form.service}
          onChange={(e) => set("service", e.target.value)}
          className="cc-input mt-1"
        >
          {COST_SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-muted">
        Typ
        <select
          value={form.costType}
          onChange={(e) => set("costType", e.target.value as CostFormState["costType"])}
          className="cc-input mt-1"
        >
          {Object.entries(COST_TYPE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-muted">
        {amountLabel}
        <input
          type="number"
          min={0}
          step={form.costType === "yearly" ? 1 : 0.01}
          value={form.amount || ""}
          onChange={(e) => set("amount", Number(e.target.value))}
          required
          className="cc-input mt-1"
        />
      </label>
      <label className="block text-xs text-muted">
        Betalningsansvar
        <select
          value={form.paidBy}
          onChange={(e) => set("paidBy", e.target.value as CostFormState["paidBy"])}
          className="cc-input mt-1"
        >
          {Object.entries(COST_PAID_BY_LABELS).map(([key, label]) => (
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
