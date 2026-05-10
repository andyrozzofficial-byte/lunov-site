const spectralHeights = [
  22, 35, 28, 42, 38, 48, 44, 52, 46, 58, 50, 62, 54, 66, 58, 52, 46, 40, 48,
  44, 38, 32, 28, 36,
];

const miniWave = [4, 9, 14, 22, 18, 26, 30, 24, 16, 12, 18, 22];

export function HeroLaptopMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-[min(100%,520px)] md:max-w-none lg:max-w-[560px]"
      aria-hidden
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(212,255,63,0.16),transparent_72%)] blur-2xl sm:-inset-8" />

      <div className="relative max-sm:mx-auto max-sm:w-[min(100%,380px)] sm:w-full md:[perspective:1400px] md:[perspective-origin:55%_38%]">
        <div className="relative md:-translate-y-1 md:rotate-x-[5deg] md:rotate-y-[-9deg] md:transform-gpu md:transition-[transform,filter] md:duration-500 md:ease-out md:hover:rotate-x-[3deg] md:hover:rotate-y-[-6deg] md:hover:drop-shadow-[0_28px_56px_rgba(212,255,63,0.07)]">
          <div className="rounded-[1.25rem] border border-zinc-600/75 bg-gradient-to-b from-zinc-600/95 via-zinc-900 to-zinc-950 p-2 shadow-[0_32px_70px_-22px_rgba(0,0,0,0.88),0_0_0_1px_rgba(255,255,255,0.07)_inset] ring-1 ring-black/45 transition-[box-shadow,border-color] duration-500 ease-out md:hover:shadow-[0_36px_80px_-22px_rgba(0,0,0,0.9),0_0_42px_-24px_rgba(212,255,63,0.06)] sm:rounded-[1.35rem] sm:p-[11px]">
            <div className="overflow-hidden rounded-[10px] bg-black ring-1 ring-white/[0.08] sm:rounded-xl">
              <div className="relative flex aspect-[16/11] max-sm:aspect-[4/3] flex-col bg-gradient-to-br from-[#060607] via-[#040405] to-black sm:aspect-[16/10]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_0%,rgba(212,255,63,0.07),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.035)_0%,transparent_45%,transparent_60%,rgba(0,0,0,0.55)_100%)]" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                <div className="relative flex min-h-0 flex-1 flex-col gap-2 p-2.5 sm:gap-2.5 sm:p-3 md:gap-3 md:p-3.5 lg:p-4">
                  {/* Window chrome */}
                  <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <div className="flex shrink-0 gap-1 sm:gap-1.5">
                      <span className="size-2 rounded-full bg-[#ff5f57]/90 shadow-[0_0_6px_rgba(255,95,87,0.35)] sm:size-2.5" />
                      <span className="size-2 rounded-full bg-[#febc2e]/90 shadow-[0_0_6px_rgba(254,188,46,0.35)] sm:size-2.5" />
                      <span className="size-2 rounded-full bg-[#28c840]/90 shadow-[0_0_6px_rgba(40,200,64,0.35)] sm:size-2.5" />
                    </div>
                    <div className="flex h-6 min-w-0 flex-1 items-center gap-2 truncate rounded-md bg-zinc-900/88 px-2 ring-1 ring-white/[0.06] sm:h-7 sm:rounded-lg sm:px-2.5">
                      <span className="truncate font-mono text-[8px] tracking-wide text-zinc-500 sm:text-[9px]">
                        NMIX_master_v4.wav · 48 kHz · 24-bit
                      </span>
                    </div>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-lime/10 ring-1 ring-lime/25 sm:size-9 sm:rounded-lg">
                      <span
                        className="lunov-soft-pulse size-1.5 rounded-full bg-lime shadow-[0_0_12px_rgba(212,255,63,0.55)] sm:size-2"
                        style={{ animationDelay: "0.8s" }}
                      />
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/[0.045] pb-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {["Session", "Meters", "Delivery"].map((t, i) => (
                        <span
                          key={t}
                          className={`rounded px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.12em] ring-1 sm:text-[8px] ${i === 0 ? "bg-white/[0.06] text-white ring-white/12" : "text-zinc-500 ring-transparent"}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[7px] tabular-nums text-zinc-600 sm:text-[8px]">
                      <span className="flex items-center gap-1">
                        <span
                          className="lunov-soft-pulse size-1 rounded-full bg-lime shadow-[0_0_6px_rgba(212,255,63,0.45)]"
                          style={{ animationDelay: "0.15s" }}
                        />
                        Monitoring
                      </span>
                      <span className="hidden text-zinc-700 sm:inline">·</span>
                      <span className="hidden sm:inline">Buffer OK</span>
                    </div>
                  </div>

                  <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 min-[380px]:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] sm:gap-2.5 md:gap-3">
                    {/* Track list / metering */}
                    <div className="flex min-h-0 flex-col gap-2 rounded-lg border border-white/[0.065] bg-zinc-950/60 p-2 ring-1 ring-white/[0.035] sm:p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-[10px] font-bold tracking-wide text-white sm:text-[11px]">
                          Console
                        </span>
                        <span className="rounded bg-lime/12 px-1.5 py-px text-[7px] font-semibold uppercase tracking-wider text-lime ring-1 ring-lime/20">
                          ARM
                        </span>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="rounded-md bg-white/[0.045] px-2 py-1.5 ring-1 ring-lime/22 sm:py-2">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Integrated
                          </div>
                          <div className="font-display mt-0.5 flex items-baseline justify-between gap-2 font-mono tabular-nums sm:mt-1">
                            <span className="text-sm font-bold text-lime sm:text-base">
                              −13.8
                            </span>
                            <span className="text-[9px] text-zinc-500">
                              LUFS
                            </span>
                          </div>
                        </div>
                        <div className="rounded-md bg-black/28 px-2 py-1.5 ring-1 ring-white/[0.045] sm:py-2">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            True peak
                          </div>
                          <div className="font-display mt-0.5 flex items-baseline justify-between gap-2 font-mono sm:mt-1">
                            <span className="text-sm font-bold tabular-nums text-white sm:text-base">
                              −0.8
                            </span>
                            <span className="text-[9px] text-zinc-600">
                              dBTP
                            </span>
                          </div>
                        </div>
                        <div className="rounded-md bg-black/28 px-2 py-1.5 ring-1 ring-white/[0.045] sm:py-2">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Crest
                          </div>
                          <div className="font-display mt-0.5 flex items-baseline justify-between gap-2 sm:mt-1">
                            <span className="text-sm font-bold tabular-nums text-zinc-200 sm:text-base">
                              11.2
                            </span>
                            <span className="text-[9px] text-zinc-600">
                              dB
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-1 space-y-1.5 border-t border-white/[0.045] pt-2">
                        <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                          Ingest queue
                        </div>
                        {[
                          { name: "vocals_stem.wav", state: "Analyzing" },
                          { name: "reference_mix.wav", state: "Ready" },
                        ].map((row) => (
                          <div
                            key={row.name}
                            className="flex items-center gap-2 rounded-md bg-black/38 px-2 py-1.5 ring-1 ring-white/[0.035]"
                          >
                            <div className="flex h-6 flex-1 items-end gap-px opacity-90">
                              {miniWave.map((h, i) => (
                                <div
                                  key={i}
                                  className="flex-1 rounded-[1px] bg-lime/55"
                                  style={{ height: `${h}%` }}
                                />
                              ))}
                            </div>
                            <div className="min-w-0 text-right">
                              <div className="truncate font-mono text-[7px] text-zinc-400">
                                {row.name}
                              </div>
                              <div
                                className={`text-[7px] font-medium uppercase tracking-wide ${row.state === "Ready" ? "text-lime/90" : "text-amber-400/90"}`}
                              >
                                {row.state}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/[0.045] pt-2">
                        <span className="text-[7px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                          Phase
                        </span>
                        <span className="font-mono text-[8px] tabular-nums text-zinc-400">
                          corr −0.02
                        </span>
                      </div>
                    </div>

                    {/* Waveform & spectral */}
                    <div className="flex min-h-0 flex-col gap-2 sm:gap-2">
                      <div className="relative min-h-[72px] flex-1 rounded-lg border border-white/[0.065] bg-black/55 p-2 ring-1 ring-white/[0.035] sm:min-h-[84px] sm:p-2.5">
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                            Waveform
                          </span>
                          <span className="font-mono text-[7px] tabular-nums text-zinc-600">
                            −18 FS · clip-safe
                          </span>
                        </div>
                        <div className="relative h-[calc(100%-1.25rem)] min-h-[44px] rounded-md bg-black/70 ring-1 ring-white/[0.05]">
                          <svg
                            className="absolute inset-x-1 inset-y-2 h-[calc(100%-16px)] w-[calc(100%-8px)] overflow-visible"
                            viewBox="0 0 200 48"
                            preserveAspectRatio="none"
                            aria-hidden
                          >
                            <defs>
                              <linearGradient
                                id="wfGlow"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#d4ff3f" stopOpacity="0.25" />
                                <stop offset="40%" stopColor="#d4ff3f" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#d4ff3f" stopOpacity="0.35" />
                              </linearGradient>
                            </defs>
                            <path
                              fill="none"
                              stroke="url(#wfGlow)"
                              strokeWidth="1.2"
                              vectorEffect="non-scaling-stroke"
                              d="M0,28 C16,12 28,40 44,22 S72,36 88,18 S116,38 132,20 S156,34 172,16 S188,30 200,24"
                            />
                            <path
                              fill="none"
                              stroke="#d4ff3f"
                              strokeOpacity="0.35"
                              strokeWidth="0.6"
                              vectorEffect="non-scaling-stroke"
                              d="M0,30 C20,18 36,42 56,24 S92,40 112,22 S140,36 160,20 S182,32 200,26"
                            />
                          </svg>
                          <div className="pointer-events-none absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-white/[0.06]" />
                        </div>
                      </div>

                      <div className="rounded-lg border border-white/[0.065] bg-zinc-950/40 p-2 ring-1 ring-white/[0.035] sm:p-2.5">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                            Spectrum
                          </span>
                          <span className="font-mono text-[7px] text-zinc-600">
                            FFT · avg
                          </span>
                        </div>
                        <div className="flex h-11 items-end gap-px sm:h-12">
                          {spectralHeights.map((h, i) => (
                            <div
                              key={i}
                              className="lunov-dash-breathe flex-1 rounded-t-[2px] bg-gradient-to-t from-lime/85 via-lime/35 to-lime/10 shadow-[0_-4px_12px_-6px_rgba(212,255,63,0.25)] ring-1 ring-lime/15"
                              style={{
                                height: `${h}%`,
                                animationDelay: `${i * 0.08}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid shrink-0 grid-cols-2 gap-2">
                        <div className="rounded-lg border border-white/[0.065] bg-gradient-to-br from-zinc-900/72 to-black/88 px-2 py-2 ring-1 ring-white/[0.04] sm:px-2.5">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Stereo field
                          </div>
                          <div className="mt-2 flex items-end justify-center gap-3">
                            {[
                              { label: "L", h: 72 },
                              { label: "R", h: 68 },
                            ].map((ch) => (
                              <div
                                key={ch.label}
                                className="flex flex-col items-center gap-1"
                              >
                                <div className="flex h-14 w-3 justify-end rounded-full bg-zinc-800/90 p-0.5 ring-1 ring-white/[0.06]">
                                  <div
                                    className="mt-auto w-full rounded-full bg-gradient-to-t from-lime/95 via-lime/45 to-lime/15 shadow-[0_0_12px_rgba(212,255,63,0.25)]"
                                    style={{ height: `${ch.h}%` }}
                                  />
                                </div>
                                <span className="font-mono text-[8px] text-zinc-600">
                                  {ch.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-lg border border-white/[0.065] bg-gradient-to-br from-zinc-900/72 to-black/88 px-2 py-2 ring-1 ring-white/[0.04] sm:px-2.5">
                          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            Offline bounce
                          </div>
                          <div className="mt-2 space-y-2">
                            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                              <div className="lunov-progress-glow h-full w-[68%] rounded-full bg-gradient-to-r from-lime/95 to-lime/65 shadow-[0_0_10px_rgba(212,255,63,0.28)]" />
                            </div>
                            <div className="flex items-center justify-between font-mono text-[7px] text-zinc-500">
                              <span>Pass 2 / 4</span>
                              <span className="text-zinc-600">dither on</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-2 rounded-md border border-white/[0.055] bg-black/50 px-2 py-1.5 ring-1 ring-white/[0.035]">
                        <div className="flex items-center gap-2">
                          <span className="relative flex size-4 items-center justify-center rounded-md bg-lime/10 ring-1 ring-lime/20">
                            <span className="lunov-soft-pulse absolute size-1.5 rounded-full bg-lime shadow-[0_0_8px_rgba(212,255,63,0.5)]" />
                          </span>
                          <span className="text-[8px] font-medium text-zinc-400">
                            Limiting chain idle · latencies nominal
                          </span>
                        </div>
                        <span className="font-mono text-[7px] text-zinc-600">
                          build 4.2
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
