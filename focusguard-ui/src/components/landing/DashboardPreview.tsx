import {
  Activity,
  Brain,
  CalendarDays,
  Clock3,
  Globe,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <div className="relative w-full max-w-[520px]">

      {/* Glow */}
      <div className="absolute -left-8 top-12 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="absolute -right-8 bottom-8 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Dashboard
            </h2>

            <p className="text-sm text-slate-500">
              Today's Productivity
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
            <Activity size={16} />
            Active
          </div>

        </div>

        {/* Focus Score */}
        <div className="rounded-3xl bg-indigo-600 p-6 text-white">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm opacity-90">
                Focus Score
              </p>

              <h1 className="mt-2 text-5xl font-bold">
                91%
              </h1>

            </div>

            <TrendingUp size={42} />

          </div>

          <div className="mt-5 h-2 rounded-full bg-white/25">

            <div className="h-2 w-[91%] rounded-full bg-white" />

          </div>

        </div>

        {/* Grid */}
        <div className="mt-5 grid grid-cols-2 gap-4">

          {/* Planner */}

          <div className="rounded-2xl border border-slate-200 p-4">

            <CalendarDays className="mb-3 text-indigo-600" />

            <h3 className="font-semibold">
              Planner
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Backend Development
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Clock3 size={14} />
              09:00 - 11:00
            </div>

          </div>

          {/* AI */}

          <div className="rounded-2xl border border-slate-200 p-4">

            <Brain className="mb-3 text-cyan-600" />

            <h3 className="font-semibold">
              AI Insight
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Excellent focus.
              Continue for another
              25 minutes.
            </p>

          </div>

        </div>

        {/* Websites */}

        <div className="mt-5 rounded-2xl border border-slate-200 p-5">

          <div className="mb-4 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Globe
                size={18}
                className="text-green-600"
              />

              <h3 className="font-semibold">
                Top Websites
              </h3>

            </div>

            <Sparkles
              className="text-indigo-500"
              size={18}
            />

          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between">

              <span className="text-sm">
                GitHub
              </span>

              <span className="text-sm font-medium">
                2h 15m
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-sm">
                VS Code
              </span>

              <span className="text-sm font-medium">
                4h 08m
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-sm">
                ChatGPT
              </span>

              <span className="text-sm font-medium">
                1h 12m
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPreview;