"use client";

import { createInboxItem } from "@/lib/command-center/actions/inbox";
import type { Project } from "@/lib/command-center/types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  projects: Project[];
};

export function QuickInbox({ projects }: Props) {
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    startTransition(async () => {
      await createInboxItem(content.trim(), projectId || undefined);
      setContent("");
      router.refresh();
    });
  }

  return (
    <div className="cc-inbox sticky bottom-0 border-t border-border bg-background/90 px-6 py-4 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-5xl items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-lime/10 text-lime">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Skriv en idé, uppgift eller anteckning..."
          className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-lime/40 focus:outline-none focus:ring-1 focus:ring-lime/20"
        />
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="hidden rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-muted focus:border-lime/40 focus:outline-none sm:block"
        >
          <option value="">Egna projekt</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending || !content.trim()}
          className="cc-btn-primary shrink-0 rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Spara
        </button>
      </form>
    </div>
  );
}
