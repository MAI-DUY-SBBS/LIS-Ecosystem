import {
  ArrowRight,
  Brain,
  Clock3,
  GitBranch,
  Layers3,
  Network,
  Sparkles,
} from "lucide-react";

const nowCapabilities = [
  "Create & Manage Rooms",
  "Student Access Link",
  "QR Code Access",
  "Teacher Message",
  "Message Stream",
];

const nextCapabilities = [
  "AI Learning Assistant",
  "Learning Analytics",
  "Student Learning Profile",
];

const horizonCapabilities = [
  "Knowledge Graph",
  "Knowledge Flow",
  "Grammar Engine",
  "AI Reasoning",
  "Living Book",
  "Knowledge Evolution",
];

export function HorizonPanel() {
  return (
    <section
      aria-labelledby="lis-horizon-title"
      className="mt-10 animate-lis-slide-up"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />

        <div className="flex items-center gap-2 px-3">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />

          <h2
            id="lis-horizon-title"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
          >
            LIS Horizon
          </h2>
        </div>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* NOW */}
        <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-5 shadow-[0_1px_3px_rgb(15_23_42/0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_12px_30px_rgb(15_23_42/0.07)] lg:col-span-4">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-50 blur-2xl" />

          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Layers3 className="h-3.5 w-3.5" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                    Tier 1
                  </p>

                  <h3 className="text-sm font-semibold text-slate-900">
                    Now
                  </h3>
                </div>
              </div>

              <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                <span className="h-1.5 w-1.5 animate-lis-pulse rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-slate-500">
              The working core of SBBox-LIS-Room.
            </p>

            <div className="space-y-2">
              {nowCapabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-2.5 text-xs font-medium text-slate-700"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[9px] font-bold text-indigo-600">
                    ✓
                  </span>

                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEXT */}
        <div className="group relative overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5 transition-all duration-300 hover:border-slate-400 hover:bg-white lg:col-span-4">
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                  <Clock3 className="h-3.5 w-3.5" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Tier 2
                  </p>

                  <h3 className="text-sm font-semibold text-slate-700">
                    Next
                  </h3>
                </div>
              </div>

              <span className="rounded-full bg-slate-200 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Coming Soon
              </span>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-slate-500">
              Intelligence capabilities that will grow from
              the current learning space.
            </p>

            <div className="space-y-2">
              {nextCapabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-2.5 text-xs font-medium text-slate-500"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300 text-[9px] text-slate-400">
                    ○
                  </span>

                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LIS HORIZON */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-5 shadow-[0_8px_30px_rgb(15_23_42/0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgb(15_23_42/0.14)] lg:col-span-4">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -left-12 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-indigo-300 ring-1 ring-white/10">
                <Network className="h-3.5 w-3.5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Tier 3
                </p>

                <h3 className="text-sm font-semibold text-white">
                  LIS Horizon
                </h3>
              </div>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-slate-400">
              From learning communication toward a
              Learning Intelligence Infrastructure.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {horizonCapabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-[9px] font-medium uppercase tracking-wider text-slate-300"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-indigo-400" />

                  <span>{capability}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
              <Brain className="h-3.5 w-3.5 text-indigo-300" />

              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Small core · Large horizon
              </span>

              <ArrowRight className="ml-auto h-3 w-3 text-slate-500 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400">
        <GitBranch className="h-3 w-3" />

        <span>Knowledge · Relations · Grammar · Reasoning</span>
      </div>
    </section>
  );
}