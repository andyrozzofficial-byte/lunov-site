export function HeroLaptopMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-[540px] md:max-w-none"
      aria-hidden
    >
      <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(212,255,63,0.18),transparent_72%)] blur-2xl" />

      <div className="relative md:[perspective:1400px] md:[perspective-origin:50%_40%]">
        <div className="relative md:-translate-y-2 md:rotate-x-[6deg] md:rotate-y-[-10deg] md:transform-gpu md:transition-transform md:duration-500 md:hover:rotate-x-[4deg] md:hover:rotate-y-[-6deg]">
          {/* Screen / lid */}
          <div className="rounded-[1.35rem] border border-zinc-600/70 bg-gradient-to-b from-zinc-700/90 via-zinc-900 to-zinc-950 p-[11px] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-black/40">
            <div className="overflow-hidden rounded-xl bg-black ring-1 ring-white/[0.07]">
              {/* Dashboard */}
              <div className="flex aspect-[16/10] flex-col gap-3 bg-gradient-to-br from-[#070708] via-[#050506] to-black p-3.5 sm:p-4">
                {/* Title bar */}
                <div className="flex shrink-0 items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]/90 shadow-[0_0_6px_rgba(255,95,87,0.35)]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]/90 shadow-[0_0_6px_rgba(254,188,46,0.35)]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]/90 shadow-[0_0_6px_rgba(40,200,64,0.35)]" />
                  </div>
                  <div className="h-7 flex-1 rounded-lg bg-zinc-900/80 ring-1 ring-white/[0.06]" />
                  <div className="flex size-9 items-center justify-center rounded-lg bg-lime/12 ring-1 ring-lime/25">
                    <span className="size-2 rounded-full bg-lime shadow-[0_0_12px_rgba(212,255,63,0.65)]" />
                  </div>
                </div>

                {/* Body */}
                <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-2.5 sm:gap-3">
                  {/* Sidebar */}
                  <div className="flex min-h-0 flex-col gap-2 rounded-lg border border-white/[0.06] bg-zinc-950/60 p-2.5 ring-1 ring-white/[0.03]">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-display text-[11px] font-bold tracking-wide text-white">
                        Pulse
                      </span>
                      <span className="rounded bg-lime/15 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-lime ring-1 ring-lime/20">
                        Live
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-md bg-white/[0.04] px-2 py-2 ring-1 ring-lime/25">
                        <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                          Sessions
                        </div>
                        <div className="font-display mt-1 text-base font-bold tabular-nums text-lime">
                          12.4k
                        </div>
                      </div>
                      <div className="rounded-md px-2 py-2 ring-1 ring-transparent">
                        <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                          Latency
                        </div>
                        <div className="font-display mt-1 text-base font-bold tabular-nums text-white">
                          142ms
                        </div>
                      </div>
                      <div className="rounded-md px-2 py-2 ring-1 ring-transparent">
                        <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                          Errors
                        </div>
                        <div className="font-display mt-1 text-base font-bold tabular-nums text-zinc-300">
                          0.02%
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto flex gap-1 pt-1">
                      {[40, 65, 45, 80, 55, 90].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-zinc-800/80"
                          style={{ height: `${Math.max(14, h * 0.22)}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Main panel */}
                  <div className="flex min-h-0 flex-col gap-2">
                    <div className="grid shrink-0 grid-cols-2 gap-2">
                      <div className="rounded-lg border border-white/[0.06] bg-gradient-to-br from-zinc-900/70 to-black/80 p-2.5 ring-1 ring-white/[0.04]">
                        <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                          Conversion
                        </div>
                        <div className="mt-1 flex items-end justify-between gap-2">
                          <span className="font-display text-lg font-bold tabular-nums text-white">
                            4.8%
                          </span>
                          <span className="rounded-full bg-lime/15 px-2 py-0.5 text-[10px] font-semibold text-lime ring-1 ring-lime/25">
                            +2.1
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/[0.06] bg-gradient-to-br from-zinc-900/70 to-black/80 p-2.5 ring-1 ring-white/[0.04]">
                        <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                          Uptime
                        </div>
                        <div className="mt-1 flex items-end justify-between gap-2">
                          <span className="font-display text-lg font-bold tabular-nums text-white">
                            99.99
                          </span>
                          <span className="text-[10px] font-medium text-zinc-500">
                            SLA
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-white/[0.06] bg-zinc-950/35 p-2.5 ring-1 ring-white/[0.03]">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Traffic
                        </span>
                        <span className="text-[9px] text-zinc-600">24h</span>
                      </div>
                      <div className="flex flex-1 items-end gap-1.5">
                        {[35, 52, 44, 68, 58, 76, 49, 82, 71, 88, 64, 94].map(
                          (v, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t-sm bg-gradient-to-t from-lime/85 via-lime/35 to-lime/10 ring-1 ring-lime/15"
                              style={{
                                height: `${Math.max(18, v * 0.65)}%`,
                              }}
                            />
                          ),
                        )}
                      </div>
                    </div>

                    <div className="grid shrink-0 grid-cols-3 gap-1.5">
                      {[
                        { label: "API", w: "w-[82%]" },
                        { label: "CDN", w: "w-[64%]" },
                        { label: "Edge", w: "w-[73%]" },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="rounded-md bg-black/40 px-2 py-2 ring-1 ring-white/[0.05]"
                        >
                          <div className="text-[9px] font-medium uppercase tracking-wider text-zinc-600">
                            {row.label}
                          </div>
                          <div className="mt-2 h-1.5 rounded-full bg-zinc-800">
                            <div
                              className={`h-full rounded-full bg-lime/90 shadow-[0_0_10px_rgba(212,255,63,0.35)] ${row.w}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard deck */}
          <div className="relative mx-auto mt-1 flex justify-center">
            <div className="h-4 w-[104%] max-w-[560px] rounded-b-xl bg-gradient-to-b from-zinc-800 via-zinc-950 to-black shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)] ring-1 ring-zinc-700/50">
              <div className="mx-auto mt-1 h-px w-[88%] rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
          {/* Surface reflection */}
          <div className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[88%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(212,255,63,0.14),transparent_70%)] blur-xl" />
        </div>
      </div>
    </div>
  );
}
