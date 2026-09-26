import { IconBell, IconSearch } from "../icons";

type Props = {
  greeting?: string;
  subtitle?: string;
};

export function TopBar({ greeting, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between gap-4 px-6">
        <div className="min-w-0 flex-1">
          {greeting && (
            <h1 className="truncate font-display text-xl font-bold tracking-tight md:text-2xl">
              {greeting}
            </h1>
          )}
          {subtitle && <p className="mt-0.5 truncate text-sm text-muted">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 sm:flex">
            <IconSearch className="size-4 text-muted" />
            <span className="text-sm text-muted">Sök...</span>
          </div>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition-colors hover:text-foreground"
            aria-label="Notifikationer"
          >
            <IconBell className="size-5" />
          </button>
          <div className="flex size-10 items-center justify-center rounded-full bg-lime/15 font-display text-sm font-bold text-lime ring-1 ring-lime/25">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
