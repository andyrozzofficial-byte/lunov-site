import { TopBar } from "@/components/command-center/shell/TopBar";
import { Badge } from "@/components/command-center/ui/Badge";
import { CcCard } from "@/components/command-center/ui/CcCard";
import { ProgressBar } from "@/components/command-center/ui/ProgressBar";
import { StatCard } from "@/components/command-center/ui/StatCard";
import {
  IconCheck,
  IconCurrency,
  IconFolder,
  IconUsers,
} from "@/components/command-center/icons";
import type { getRecentActivity } from "@/lib/command-center/actions/activity";
import type { getClientJobs } from "@/lib/command-center/actions/client-jobs";
import type { getCostSummary } from "@/lib/command-center/actions/costs";
import type { getDashboardStats } from "@/lib/command-center/actions/dashboard";
import type { getProjectsWithStats } from "@/lib/command-center/actions/projects";
import type { getRevenueSummary } from "@/lib/command-center/actions/revenues";
import type { getWaitingItems } from "@/lib/command-center/actions/waiting";
import type { getWeekFocus, getWeeklyTasks } from "@/lib/command-center/actions/weekly";
import {
  CLIENT_JOB_STATUS_LABELS,
  PROJECT_STATUS_LABELS,
  clientJobPaymentLabel,
  resolveClientJobPaymentStatus,
} from "@/lib/command-center/types";
import {
  formatDayLabel,
  formatMonthYear,
  formatRelativeTime,
  getGreeting,
  getWeekDays,
  getWeekStart,
} from "@/lib/command-center/utils/date";
import { formatCurrency, formatMinutes } from "@/lib/command-center/utils/format";
import Link from "next/link";
import { WeeklyMiniCalendar } from "./WeeklyMiniCalendar";

type Props = {
  stats: Awaited<ReturnType<typeof getDashboardStats>>;
  projects: Awaited<ReturnType<typeof getProjectsWithStats>>;
  clientJobs: Awaited<ReturnType<typeof getClientJobs>>;
  weeklyTasks: Awaited<ReturnType<typeof getWeeklyTasks>>;
  weekFocus: Awaited<ReturnType<typeof getWeekFocus>>;
  waitingItems: Awaited<ReturnType<typeof getWaitingItems>>;
  activity: Awaited<ReturnType<typeof getRecentActivity>>;
  costSummary: Awaited<ReturnType<typeof getCostSummary>>;
  revenueSummary: Awaited<ReturnType<typeof getRevenueSummary>>;
};

function statusBadgeVariant(status: string) {
  if (status === "active" || status === "in_progress") return "active" as const;
  if (status === "waiting" || status === "waiting_client") return "waiting" as const;
  if (status === "not_started") return "neutral" as const;
  return "progress" as const;
}

export function DashboardView({
  stats,
  projects,
  clientJobs,
  weeklyTasks,
  weekFocus,
  waitingItems,
  activity,
  costSummary,
  revenueSummary,
}: Props) {
  const weekStart = getWeekStart();
  const weekDays = getWeekDays(weekStart);
  const today = new Date().getDay();
  const selectedDay = today === 0 ? 6 : today - 1;
  const todayTasks = weeklyTasks.filter((t) => t.dayOfWeek === selectedDay);

  const activeProjects = projects.filter((p) => p.status !== "archived");

  return (
    <>
      <TopBar
        greeting={`${getGreeting()}, Andreas 👋`}
        subtitle={`${formatMonthYear()} · "Bygg det som betyder något.""`}
      />

      <div className="space-y-6 p-6">
        {/* KPI-rad */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            label="Uppgifter denna vecka"
            value={`${stats.weeklyTasksCompleted} av ${stats.weeklyTasksTotal}`}
            subtext="planerade"
            icon={<IconCheck className="size-4 text-emerald-400" />}
          />
          <StatCard
            label="Aktiva projekt"
            value={String(stats.activeProjects)}
            subtext={`${stats.waitingProjects} väntar på andra`}
            icon={<IconFolder className="size-4 text-blue-400" />}
          />
          <StatCard
            label="Kundjobb"
            value={String(stats.clientJobsCount)}
            subtext={`${stats.clientJobsDeadlineThisWeek} deadline denna vecka`}
            icon={<IconUsers className="size-4 text-purple-400" />}
          />
          <StatCard
            label="Min kostnad"
            value={formatCurrency(stats.myCostsThisMonth, "SEK", true)}
            subtext={`${formatCurrency(stats.monthlyCosts, "SEK", true)} projekt totalt`}
            trend={{ value: stats.monthlyCostsChange, invert: true }}
            icon={<IconCurrency className="size-4 text-red-400" />}
          />
          <StatCard
            label="Intäkter denna månad"
            value={formatCurrency(stats.monthlyRevenue, "SEK", true)}
            trend={{ value: stats.monthlyRevenueChange }}
            icon={<IconCurrency className="size-4 text-emerald-400" />}
          />
        </div>

        {/* Vecka + Fokus + Aktivitet */}
        <div className="grid gap-4 xl:grid-cols-3">
          <CcCard title="Min vecka" className="xl:col-span-1">
            <WeeklyMiniCalendar
              weekDays={weekDays}
              tasks={weeklyTasks}
              selectedDay={selectedDay}
            />
            <div className="mt-4 border-t border-border pt-4">
              <p className="mb-3 text-xs font-medium text-muted">
                {formatDayLabel(weekDays[selectedDay])}
              </p>
              <ul className="space-y-2">
                {todayTasks.length === 0 ? (
                  <li className="text-sm text-muted">Inga uppgifter idag</li>
                ) : (
                  todayTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2 text-sm">
                      <span
                        className={`size-3.5 shrink-0 rounded border ${task.completed ? "border-emerald-500 bg-emerald-500/20" : "border-border"}`}
                      />
                      <span className={task.completed ? "text-muted line-through" : ""}>
                        {task.title}
                      </span>
                      {task.projectName && (
                        <Badge variant="neutral" className="ml-auto shrink-0">
                          {task.projectName}
                        </Badge>
                      )}
                      <span className="shrink-0 text-xs text-muted">
                        {formatMinutes(task.estimatedMinutes)}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </CcCard>

          <div className="space-y-4 xl:col-span-1">
            <CcCard title="Fokus denna vecka">
              {weekFocus ? (
                <div>
                  <p className="font-display text-base font-semibold">{weekFocus.title}</p>
                  {weekFocus.description && (
                    <p className="mt-1 text-sm text-muted">{weekFocus.description}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted">Inget veckofokus satt ännu.</p>
              )}
              <Link
                href="/command-center/vecka"
                className="mt-3 inline-block text-xs text-lime hover:underline"
              >
                Redigera veckofokus →
              </Link>
            </CcCard>

            <CcCard title="Väntar på andra">
              <ul className="space-y-3">
                {waitingItems.length === 0 ? (
                  <li className="text-sm text-muted">Inget att vänta på just nu.</li>
                ) : (
                  waitingItems.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{item.projectName ?? item.title}</p>
                        <p className="text-xs text-muted">{item.description ?? item.title}</p>
                      </div>
                      <Badge variant="waiting">Väntar</Badge>
                    </li>
                  ))
                )}
              </ul>
              <Link
                href="/command-center/vantar"
                className="mt-3 inline-block text-xs text-lime hover:underline"
              >
                Visa alla →
              </Link>
            </CcCard>
          </div>

          <CcCard title="Senaste aktivitet" className="xl:col-span-1">
            <ul className="space-y-3">
              {activity.map((entry) => (
                <li key={entry.id} className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lime/60" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{entry.description}</p>
                    <p className="text-xs text-muted">{formatRelativeTime(entry.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CcCard>
        </div>

        {/* Projekt */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Projekt</h2>
            <Link href="/command-center/projekt" className="text-xs text-lime hover:underline">
              Visa alla →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeProjects.slice(0, 6).map((project) => (
              <Link key={project.id} href={`/command-center/projekt/${project.id}`}>
                <CcCard className="cc-card-premium h-full transition-colors hover:border-lime/20">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: project.color ?? "#d4ff3f" }}
                      />
                      <span className="font-display font-semibold">{project.name}</span>
                    </div>
                    <Badge variant={statusBadgeVariant(project.status)}>
                      {PROJECT_STATUS_LABELS[project.status]}
                    </Badge>
                  </div>
                  <ProgressBar value={project.progress} color={project.color ?? "#d4ff3f"} showLabel />
                  {project.description && (
                    <p className="mt-3 line-clamp-2 text-xs text-muted">{project.description}</p>
                  )}
                  <p className="mt-2 text-xs text-muted">
                    {project.weeklyTaskCount} uppgifter denna vecka
                  </p>
                </CcCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Kundjobb-tabell */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Kundjobb</h2>
            <Link href="/command-center/kundjobb" className="text-xs text-lime hover:underline">
              Hantera →
            </Link>
          </div>
          <CcCard padding="sm">
            <div className="overflow-x-auto">
              <table className="cc-table w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted">
                    <th className="pb-3 pr-4 font-medium">Kund</th>
                    <th className="pb-3 pr-4 font-medium">Projekt</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Deadline</th>
                    <th className="pb-3 pr-4 font-medium">Pris</th>
                    <th className="pb-3 pr-4 font-medium">Betalt</th>
                    <th className="pb-3 pr-4 font-medium">Kvar</th>
                    <th className="pb-3 font-medium">Betalning</th>
                  </tr>
                </thead>
                <tbody>
                  {clientJobs.map((job) => {
                    const paymentStatus = resolveClientJobPaymentStatus(job);
                    return (
                    <tr key={job.id} className="border-b border-border/50">
                      <td className="py-3 pr-4 font-medium">{job.clientName}</td>
                      <td className="py-3 pr-4 text-muted">{job.projectName}</td>
                      <td className="py-3 pr-4">
                        <Badge variant={statusBadgeVariant(job.status)}>
                          {CLIENT_JOB_STATUS_LABELS[job.status]}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 tabular-nums text-muted">{job.deadline ?? "—"}</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(job.price)}</td>
                      <td className="py-3 pr-4 tabular-nums text-emerald-400">
                        {formatCurrency(job.paidAmount)}
                      </td>
                      <td className="py-3 pr-4 tabular-nums text-amber-400">
                        {formatCurrency(job.unpaidAmount)}
                      </td>
                      <td className="py-3">
                        <Badge
                          variant={
                            paymentStatus === "paid"
                              ? "done"
                              : paymentStatus === "partial"
                                ? "progress"
                                : "waiting"
                          }
                        >
                          {clientJobPaymentLabel(paymentStatus)}
                        </Badge>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CcCard>
        </section>

        {/* Ekonomi */}
        <CcCard title="Ekonomi">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex items-start gap-6">
              <CostDonut byService={costSummary.byService} total={stats.monthlyCosts} />
              <div className="flex-1 space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-muted">Totala projektkostnader</span>
                  <span className="font-semibold tabular-nums">
                    {formatCurrency(stats.monthlyCosts)}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted">Jag betalar</span>
                  <span className="font-semibold tabular-nums text-red-400">
                    {formatCurrency(stats.myCostsThisMonth)}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted">Annan betalar</span>
                  <span className="font-semibold tabular-nums text-muted">
                    {formatCurrency(stats.othersCostsThisMonth)}
                  </span>
                </div>
                <ul className="space-y-2 border-t border-border pt-3">
                  {Object.entries(costSummary.byService)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([service, amount]) => (
                      <li key={service} className="flex justify-between gap-2">
                        <span className="text-muted">{service}</span>
                        <span className="tabular-nums">{formatCurrency(amount)}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-3">
                  <p className="text-xs text-muted">Intäkter denna månad</p>
                  <p className="font-display text-lg font-bold text-emerald-400">
                    {formatCurrency(stats.monthlyRevenue)}
                  </p>
                </div>
                <div className="rounded-xl bg-amber-500/10 p-3">
                  <p className="text-xs text-muted">Obetalda kundjobb</p>
                  <p className="font-display text-lg font-bold text-amber-400">
                    {formatCurrency(stats.unpaidClientJobs)}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-500/10 p-3">
                  <p className="text-xs text-muted">Betalda kundjobb (totalt)</p>
                  <p className="font-display text-lg font-bold text-blue-400">
                    {formatCurrency(stats.paidClientJobsTotal)}
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-muted">Kommande intäkter</p>
                  <p className="font-display text-lg font-bold">
                    {formatCurrency(revenueSummary.upcomingTotal)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-2 rounded-xl border border-border bg-white/[0.02] p-3">
                <span className="font-medium">Netto för mig denna månad</span>
                <span
                  className={`font-display text-lg font-bold tabular-nums ${stats.monthlyNetto >= 0 ? "text-emerald-400" : "text-red-400"}`}
                >
                  {formatCurrency(stats.monthlyNetto)}
                </span>
              </div>
              <p className="text-xs text-muted">
                Netto = intäkter denna månad − kostnader jag betalar
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/command-center/kostnader" className="text-xs text-lime hover:underline">
                  Kostnader →
                </Link>
                <Link href="/command-center/intakter" className="text-xs text-lime hover:underline">
                  Intäkter →
                </Link>
              </div>
            </div>
          </div>
        </CcCard>
      </div>
    </>
  );
}

function CostDonut({
  byService,
  total,
}: {
  byService: Record<string, number>;
  total: number;
}) {
  const colors = ["#d4ff3f", "#3b82f6", "#a855f7", "#f97316", "#14b8a6", "#ec4899"];
  const entries = Object.entries(byService).sort(([, a], [, b]) => b - a);
  let offset = 0;
  const segments = entries.map(([service, amount], i) => {
    const pct = total > 0 ? (amount / total) * 100 : 0;
    const segment = { service, pct, offset, color: colors[i % colors.length] };
    offset += pct;
    return segment;
  });

  const gradient = segments
    .map((s) => `${s.color} ${s.offset}% ${s.offset + s.pct}%`)
    .join(", ");

  return (
    <div className="relative size-32 shrink-0">
      <div
        className="size-full rounded-full"
        style={{
          background: total > 0 ? `conic-gradient(${gradient})` : "rgba(255,255,255,0.06)",
        }}
      />
      <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-card">
        <span className="font-display text-sm font-bold">{formatCurrency(total, "SEK", true)}</span>
        <span className="text-[10px] text-muted">/månad</span>
      </div>
    </div>
  );
}
