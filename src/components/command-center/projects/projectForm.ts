import type { Project, ProjectStatus } from "@/lib/command-center/types";

export type ProjectFormState = {
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  nextStep: string;
  deadline: string;
  notes: string;
  color: string;
};

export function emptyProjectForm(): ProjectFormState {
  return {
    name: "",
    description: "",
    status: "active",
    progress: 0,
    nextStep: "",
    deadline: "",
    notes: "",
    color: "#d4ff3f",
  };
}

export function projectToForm(project: Project): ProjectFormState {
  return {
    name: project.name,
    description: project.description ?? "",
    status: project.status,
    progress: project.progress,
    nextStep: project.nextStep ?? "",
    deadline: project.deadline ?? "",
    notes: project.notes ?? "",
    color: project.color ?? "#d4ff3f",
  };
}
