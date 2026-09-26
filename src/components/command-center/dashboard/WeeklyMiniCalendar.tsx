import { DAY_NAMES_SHORT } from "@/lib/command-center/types";
import type { WeeklyTaskWithRelations } from "@/lib/command-center/types";
import { formatDayShort } from "@/lib/command-center/utils/date";
import { formatMinutes } from "@/lib/command-center/utils/format";

type Props = {
  weekDays: Date[];
  tasks: WeeklyTaskWithRelations[];
  selectedDay: number;
};

export function WeeklyMiniCalendar({ weekDays, tasks, selectedDay }: Props) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, i) => {
          const dayTasks = tasks.filter((t) => t.dayOfWeek === i);
          const totalMinutes = dayTasks.reduce((s, t) => s + t.estimatedMinutes, 0);
          const completed = dayTasks.filter((t) => t.completed).length;
          const isSelected = i === selectedDay;

          return (
            <div
              key={i}
              className={`rounded-xl p-2 text-center transition-colors ${
                isSelected ? "bg-lime/10 ring-1 ring-lime/25" : "bg-white/[0.02]"
              }`}
            >
              <p className="text-[10px] text-muted">{DAY_NAMES_SHORT[i]}</p>
              <p className={`text-sm font-semibold ${isSelected ? "text-lime" : ""}`}>
                {formatDayShort(day)}
              </p>
              <div className="mt-1 flex justify-center gap-0.5">
                {dayTasks.slice(0, 3).map((t) => (
                  <span
                    key={t.id}
                    className={`size-1.5 rounded-full ${t.completed ? "bg-emerald-400" : "bg-amber-400"}`}
                  />
                ))}
              </div>
              {totalMinutes > 0 && (
                <p className="mt-1 text-[9px] text-muted">{formatMinutes(totalMinutes)}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
