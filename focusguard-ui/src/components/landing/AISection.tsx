import {
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const AISection = () => {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left */}

        <div>

          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            AI Powered Insights
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
            Personalized
            <br />
            AI Recommendations
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            FocusGuard AI studies your productivity patterns,
            browser activity, planner progress, and focus score
            to generate intelligent recommendations that help
            you work more efficiently.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              <span>Adaptive AI Recommendations</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              <span>Focus Score Improvement</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              <span>Behaviour Pattern Analysis</span>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-violet-50 to-white p-8 shadow-xl">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <BrainCircuit className="text-violet-600" />

              <div>

                <h3 className="font-semibold">
                  AI Insight
                </h3>

                <p className="text-sm text-slate-500">
                  Generated just now
                </p>

              </div>

            </div>

            <Sparkles className="text-violet-600" />

          </div>

          <div className="mt-8 rounded-2xl bg-white p-6">

            <h3 className="text-xl font-semibold">
              Excellent work today!
            </h3>

            <p className="mt-4 text-slate-600">
              Your focus score has increased by 12% compared to
              yesterday.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-600" />
                <span>Focus Score +12%</span>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-600" />
                <span>Reduced distracting websites by 28%</span>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-600" />
                <span>Best productivity: 09:00–11:30 AM</span>
              </div>

            </div>

            <div className="mt-8 rounded-2xl bg-violet-100 p-5">

              <p className="text-sm font-semibold text-violet-700">
                Recommendation
              </p>

              <p className="mt-2 text-slate-700">
                Continue your current coding session for another
                25 minutes, then take a 10-minute break.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AISection;