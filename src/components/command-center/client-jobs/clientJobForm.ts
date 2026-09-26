import type { ClientJob, ClientJobStatus } from "@/lib/command-center/types";

export type ClientJobFormState = {
  clientName: string;
  projectName: string;
  description: string;
  status: ClientJobStatus;
  deadline: string;
  price: number;
  paidAmount: number;
  startDate: string;
  completedDate: string;
  notes: string;
};

export function emptyClientJobForm(): ClientJobFormState {
  return {
    clientName: "",
    projectName: "",
    description: "",
    status: "not_started",
    deadline: "",
    price: 0,
    paidAmount: 0,
    startDate: "",
    completedDate: "",
    notes: "",
  };
}

export function clientJobToForm(job: ClientJob): ClientJobFormState {
  return {
    clientName: job.clientName,
    projectName: job.projectName,
    description: job.description ?? "",
    status: job.status,
    deadline: job.deadline ?? "",
    price: job.price,
    paidAmount: job.paidAmount,
    startDate: job.startDate ?? "",
    completedDate: job.completedDate ?? "",
    notes: job.notes ?? "",
  };
}

export function clientJobFormToCreatePayload(form: ClientJobFormState) {
  return {
    clientName: form.clientName.trim(),
    projectName: form.projectName.trim(),
    description: form.description.trim() || undefined,
    status: form.status,
    deadline: form.deadline || undefined,
    price: form.price,
    paidAmount: form.paidAmount,
    startDate: form.startDate || undefined,
    notes: form.notes.trim() || undefined,
  };
}

export function clientJobFormToUpdatePayload(form: ClientJobFormState) {
  return {
    clientName: form.clientName.trim(),
    projectName: form.projectName.trim(),
    description: form.description.trim() || null,
    status: form.status,
    deadline: form.deadline || null,
    price: form.price,
    paidAmount: form.paidAmount,
    startDate: form.startDate || null,
    completedDate: form.completedDate || null,
    notes: form.notes.trim() || null,
  };
}
