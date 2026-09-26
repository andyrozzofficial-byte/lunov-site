import type { WaitingItemWithRelations } from "@/lib/command-center/actions/waiting";

export type WaitingFormState = {
  title: string;
  description: string;
  projectId: string;
  clientJobId: string;
};

export function emptyWaitingForm(): WaitingFormState {
  return {
    title: "",
    description: "",
    projectId: "",
    clientJobId: "",
  };
}

export function waitingToForm(item: WaitingItemWithRelations): WaitingFormState {
  return {
    title: item.title,
    description: item.description ?? "",
    projectId: item.projectId ?? "",
    clientJobId: item.clientJobId ?? "",
  };
}

export function waitingFormToCreatePayload(form: WaitingFormState) {
  return {
    title: form.title.trim(),
    description: form.description.trim() || undefined,
    projectId: form.projectId || undefined,
    clientJobId: form.clientJobId || undefined,
  };
}

export function waitingFormToUpdatePayload(form: WaitingFormState) {
  return {
    title: form.title.trim(),
    description: form.description.trim() || null,
    projectId: form.projectId || null,
    clientJobId: form.clientJobId || null,
  };
}
