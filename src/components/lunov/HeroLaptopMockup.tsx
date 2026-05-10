export function HeroLaptopMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-[min(100%,520px)] md:max-w-none lg:max-w-[560px]"
      aria-hidden
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(212,255,63,0.16),transparent_72%)] blur-2xl sm:-inset-8" />

      <div className="relative max-sm:mx-auto max-sm:w-[min(100%,380px)] sm:w-full md:[perspective:1400px] md:[perspective-origin:55%_38%]">
        <div className="relative md:-translate-y-1 md:rotate-x-[5deg] md:rotate-y-[-9deg] md:transform-gpu md:transition-transform md:duration-500 md:hover:rotate-x-[3deg] md:hover:rotate-y-[-6deg]">
          {/* Screen / lid */}
          <div className="rounded-[1.25rem] border border-zinc-600/75 bg-gradient-to-b from-zinc-600/95 via-zinc-900 to-zinc-950 p-2 shadow-[0_32px_70px_-22px_rgba(0,0,0,0.88),0_0_0_1px_rgba(255,255,255,0.07)_inset] ring-1 ring-black/45 sm:rounded-[1.35rem] sm:p-[11px]">
            <div className="overflow-hidden rounded-[10px] bg-black ring-1 ring-white/[0.08] sm:rounded-xl">
              {/* Dashboard */}
              <div className="relative flex aspect-[16/11] max-sm:aspect-[4/3] flex-col bg-gradient-to-br from-[#080809] via-[#050506] to-black sm:aspect-[16/10]">
                {/* Depth & vignette */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(212,255,63,0.09),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.045)_0%,transparent_42%,transparent_58%,rgba(0,0,0,0.5)_100%)]" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.045]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative flex min-h-0 flex-1 flex-col gap-2 p-2.5 sm:gap-2.5 sm:p-3 md:gap-3 md:p-3.5 lg:p-4">
                  {/* Title bar */}
                  <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <div className="flex shrink-0 gap-1 sm:gap-1.5">
                      <span className="size-2 rounded-full bg-[#ff5f57]/90 shadow-[0_0_6px_rgba(255,95,87,0.35)] sm:size-2.5" />
                      <span className="size-2 rounded-full bg-[#febc2e]/90 shadow-[0_0_6px_rgba(254,188,46,0.35)] sm:size-2.5" />
                      <span className="size-2 rounded-full bg-[#28c840]/90 shadow-[0_0_6px_rgba(40,200,64,0.35)] sm:size-2.5" />
                    </div>
                    <div className="flex h-6 min-w-0 flex-1 items-center gap-2 rounded-md bg-zinc-900/85 px-2 ring-1 ring-white/[0.07] sm:h-7 sm:rounded-lg sm:px-2.5">
                      <span className="size-1 shrink-0 rounded-sm bg-lime/70 shadow-[0_0_6px_rgba(212,255,63,0.4)]" />
                      <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-zinc-700/90 via-zinc-600/60 to-zinc-700/90 opacity-80" />
                      <span className="hidden text-[8px] font-medium uppercase tracking-[0.18em] text-zinc-600 sm:inline">
                        Secure
                      </span>
                    </div>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-lime/12 ring-1 ring-lime/28 sm:size-9 sm:rounded-lg">
                      <span className="size-1.5 rounded-full bg-lime shadow-[0_0_12px_rgba(212,255,63,0.65)] sm:size-2" />
                    </div>
                  </div>

                  {/* Context strip */}
                  <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/[0.05] pb-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {["Overview", "Realtime", "Incidents"].map((t, i) => (
                        <span
                          key={t}
                          className={`rounded px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.12em] ring-1 sm:text-[8px] ${i === 0 ? "bg-white/[0.07] text-white ring-white/15" : "text-zinc-500 ring-transparent"}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[7px] tabular-nums text-zinc-600 sm:text-[8px]">
                      <span className="flex items-center gap-1">
                        <span className="size-1 rounded-full bg-lime shadow-[0_0_6px_rgba(212,255,63,0.5)]" />
                        Live
                      </span>
                      <span className="hidden text-zinc-700 sm:inline">|</span>
                      <span className="hidden sm:inline">EU-West</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 min-[380px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] sm:gap-2.5 md:gap-3">
                    {/* Sidebar */}
                    <div className="flex min-h-0 flex-col gap-2 rounded-lg border border-white/[0.07] bg-zinc-950/65 p-2 ring-1 ring-white/[0.04] sm:p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-[10px] font-bold tracking-wide text-white sm:text-[11px]">
                            Pulse
                          </span>
                          <span className="rounded bg-lime/15 px-1.5 py-px text-[8px] font-semibold uppercase tracking-wider text-lime ring-1 ring-lime/22">
                            Live
                          </span>
                        </div>
                        <span className="rounded bg-black/50 px-1.5 py-0.5 text-[7px] font-medium uppercase tracking-wider text-zinc-500 ring-1 ring-white/[0.06]">
                          Now
                        </span>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="rounded-md bg-white/[0.05] px-2 py-1.5 ring-1 ring-lime/28 sm:py-2">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Sessions
                          </div>
                          <div className="font-display mt-0.5 flex items-baseline justify-between gap-2 tabular-nums sm:mt-1">
                            <span className="text-sm font-bold text-lime sm:text-base">
                              12.4k
                            </span>
                            <span className="text-[9px] font-semibold text-lime/90">
                              +6%
                            </span>
                          </div>
                        </div>
                        <div className="rounded-md bg-black/25 px-2 py-1.5 ring-1 ring-white/[0.05] sm:py-2">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Latency
                          </div>
                          <div className="font-display mt-0.5 flex items-baseline justify-between gap-2 sm:mt-1">
                            <span className="text-sm font-bold tabular-nums text-white sm:text-base">
                              142ms
                            </span>
                            <span className="text-[9px] font-medium text-emerald-400/90">
                              p95
                            </span>
                          </div>
                        </div>
                        <div className="rounded-md bg-black/25 px-2 py-1.5 ring-1 ring-white/[0.05] sm:py-2">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Errors
                          </div>
                          <div className="font-display mt-0.5 flex items-baseline justify-between gap-2 sm:mt-1">
                            <span className="text-sm font-bold tabular-nums text-zinc-200 sm:text-base">
                              0.02%
                            </span>
                            <span className="text-[9px] text-zinc-600">
                              stable
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-1 space-y-1.5 border-t border-white/[0.05] pt-2">
                        <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                          Activity
                        </div>
                        {[
                          { t: "Deploy · api-gateway", s: "ok" },
                          { t: "CDN · cache purge", s: "queued" },
                        ].map((row) => (
                          <div
                            key={row.t}
                            className="flex items-center gap-2 rounded-md bg-black/35 px-2 py-1 ring-1 ring-white/[0.04]"
                          >
                            <span
                              className={`size-1 shrink-0 rounded-full ${row.s === "ok" ? "bg-lime shadow-[0_0_6px_rgba(212,255,63,0.45)]" : "bg-amber-400/90"}`}
                            />
                            <span className="truncate text-[8px] text-zinc-400">
                              {row.t}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex gap-0.5 pt-1.5 sm:gap-1">
                        {[40, 65, 45, 80, 55, 90].map((h, i) => (
                          <div
                            key={i}
                            className="relative flex-1 overflow-hidden rounded-sm bg-zinc-800/75 ring-1 ring-white/[0.04]"
                            style={{ height: `${Math.max(16, h * 0.26)}px` }}
                          >
                            <div
                              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-lime/55 via-lime/15 to-transparent"
                              style={{ height: `${Math.min(100, h)}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main panel */}
                    <div className="flex min-h-0 flex-col gap-2 sm:gap-2">
                      <div className="grid shrink-0 grid-cols-2 gap-1.5 sm:gap-2">
                        <div className="rounded-lg border border-white/[0.07] bg-gradient-to-br from-zinc-900/75 to-black/85 p-2 ring-1 ring-white/[0.05] sm:p-2.5">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Conversion
                          </div>
                          <div className="mt-1 flex items-end justify-between gap-2">
                            <span className="font-display text-base font-bold tabular-nums text-white sm:text-lg">
                              4.8%
                            </span>
                            <span className="rounded-full bg-lime/15 px-2 py-0.5 text-[9px] font-semibold text-lime ring-1 ring-lime/25">
                              +2.1
                            </span>
                          </div>
                        </div>
                        <div className="rounded-lg border border-white/[0.07] bg-gradient-to-br from-zinc-900/75 to-black/85 p-2 ring-1 ring-white/[0.05] sm:p-2.5">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Uptime
                          </div>
                          <div className="mt-1 flex items-end justify-between gap-2">
                            <span className="font-display text-base font-bold tabular-nums text-white sm:text-lg">
                              99.99
                            </span>
                            <span className="text-[9px] font-medium text-zinc-500">
                              SLA
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative flex min-h-[96px] flex-1 flex-col rounded-lg border border-white/[0.07] bg-zinc-950/45 p-2 ring-1 ring-white/[0.04] sm:min-h-[108px] sm:p-2.5">
                        <div className="relative mb-1 flex flex-1 flex-col">
                          <div className="absolute inset-x-0 bottom-6 top-6 flex flex-col justify-between">
                            {[0, 1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="h-px w-full bg-white/[0.04]"
                              />
                            ))}
                          </div>
                          <div className="relative mb-1 flex items-center justify-between gap-2">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                              Traffic
                            </span>
                            <div className="flex items-center gap-2 text-[8px] text-zinc-600">
                              <span className="rounded bg-black/40 px-1 py-px ring-1 ring-white/[0.06]">
                                24h
                              </span>
                              <span className="hidden sm:inline">Peak · now</span>
                            </div>
                          </div>
                          <div className="relative flex flex-1 items-end gap-1 px-0.5 sm:gap-1.5">
                            {[35, 52, 44, 68, 58, 76, 49, 82, 71, 88, 64, 94].map(
                              (v, i) => (
                                <div
                                  key={i}
                                  className="flex-1 rounded-t-[3px] bg-gradient-to-t from-lime/88 via-lime/38 to-lime/12 shadow-[0_-6px_16px_-8px_rgba(212,255,63,0.35)] ring-1 ring-lime/18"
                                  style={{
                                    height: `${Math.max(22, v * 0.62)}%`,
                                  }}
                                />
                              ),
                            )}
                          </div>
                          <div className="relative mt-1 flex justify-between text-[7px] tabular-nums text-zinc-700">
                            <span>00</span>
                            <span className="hidden min-[380px]:inline">06</span>
                            <span>12</span>
                            <span className="hidden min-[380px]:inline">18</span>
                            <span>24</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid shrink-0 grid-cols-3 gap-1 sm:gap-1.5">
                        {[
                          { label: "API", w: "w-[82%]" },
                          { label: "CDN", w: "w-[64%]" },
                          { label: "Edge", w: "w-[73%]" },
                        ].map((row) => (
                          <div
                            key={row.label}
                            className="rounded-md bg-black/45 px-1.5 py-1.5 ring-1 ring-white/[0.06] sm:px-2 sm:py-2"
                          >
                            <div className="text-[8px] font-medium uppercase tracking-wider text-zinc-600">
                              {row.label}
                            </div>
                            <div className="mt-1.5 h-1.5 rounded-full bg-zinc-800 sm:mt-2">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r from-lime/95 to-lime/70 shadow-[0_0_10px_rgba(212,255,63,0.38)] ${row.w}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-2 rounded-md border border-white/[0.06] bg-black/55 px-2 py-1.5 ring-1 ring-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <span className="relative flex size-4 items-center justify-center rounded-md bg-lime/12 ring-1 ring-lime/22">
                            <span className="absolute size-1.5 rounded-full bg-lime opacity-90 shadow-[0_0_8px_rgba(212,255,63,0.55)]" />
                          </span>
                          <span className="text-[8px] font-medium text-zinc-400">
                            All systems nominal
                          </span>
                        </div>
                        <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                          v2.14
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard deck */}
          <div className="relative mx-auto mt-1 flex justify-center">
            <div className="h-3.5 w-[103%] max-w-[540px] rounded-b-[11px] bg-gradient-to-b from-zinc-800 via-zinc-950 to-black shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)] ring-1 ring-zinc-700/55 sm:h-4 sm:rounded-b-xl">
              <div className="mx-auto mt-1 h-px w-[88%] rounded-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-8 left-1/2 h-14 w-[88%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(212,255,63,0.13),transparent_72%)] blur-xl sm:-bottom-10 sm:h-16" />
        </div>
      </div>
    </div>
  );
}
