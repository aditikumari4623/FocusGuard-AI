import {
  BarChart3,
  Clock3,
  Globe,
  TrendingUp,
} from "lucide-react";

const AnalyticsSection = () => {
  return (
    <section className="py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* Left Dashboard */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold">
                Weekly Analytics
              </h3>

              <p className="text-sm text-slate-500">
                Productivity Overview
              </p>

            </div>

            <TrendingUp className="text-indigo-600" />

          </div>

          {/* Fake Chart */}

          <div className="mt-10 flex h-48 items-end justify-between gap-3">

            {[55, 82, 65, 90, 78, 96, 88].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-xl bg-indigo-500 transition hover:bg-indigo-600"
                style={{
                  height: `${height}%`,
                }}
              />
            ))}

          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-slate-50 p-5">

              <Clock3 className="mb-3 text-cyan-600" />

              <h4 className="font-semibold">
                Active Time
              </h4>

              <p className="mt-2 text-3xl font-bold">
                6.4h
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 p-5">

              <Globe className="mb-3 text-green-600" />

              <h4 className="font-semibold">
                Websites
              </h4>

              <p className="mt-2 text-3xl font-bold">
                18
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Productivity Analytics
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight">
            Visualize
            <br />
            Your Productivity
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Understand where your time goes with interactive
            productivity reports, website insights,
            focus trends, and performance analytics.
          </p>

          <div className="mt-10 space-y-6">

            <div className="flex items-center gap-4">

              <BarChart3 className="text-indigo-600" />

              <span>Interactive Productivity Reports</span>

            </div>

            <div className="flex items-center gap-4">

              <TrendingUp className="text-green-600" />

              <span>Daily & Weekly Focus Trends</span>

            </div>

            <div className="flex items-center gap-4">

              <Globe className="text-cyan-600" />

              <span>Website Category Breakdown</span>

            </div>

            <div className="flex items-center gap-4">

              <Clock3 className="text-orange-500" />

              <span>Active vs Idle Analysis</span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AnalyticsSection;