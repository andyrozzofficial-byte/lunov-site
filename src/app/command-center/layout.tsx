import { QuickInbox } from "@/components/command-center/shell/QuickInbox";
import { Sidebar } from "@/components/command-center/shell/Sidebar";
import { getProjects } from "@/lib/command-center/actions/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Center — LUNOV",
  description: "Personligt projekt- och planeringscenter",
};

export default async function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();

  return (
    <div className="cc-shell flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-y-auto">{children}</main>
        <QuickInbox projects={projects} />
      </div>
    </div>
  );
}
