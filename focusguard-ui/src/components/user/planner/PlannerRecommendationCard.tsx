import {
  BrainCircuit,
  Sparkles,
} from "lucide-react";

import {
  usePlannerRecommendation,
} from "../../../hooks/usePlanner";

const PlannerRecommendationCard = () => {
  const {
    data,
    isLoading,
  } = usePlannerRecommendation();

  if (isLoading) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20

          sm:p-6
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading AI recommendation...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20

          sm:p-6
        "
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          AI Recommendation
        </h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          No recommendation available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/20
      "
    >

      {/* Header */}

      <div className="border-b border-slate-200 p-5 dark:border-slate-700 sm:p-6">

        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">

          <BrainCircuit
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          <span>
            AI Recommendation
          </span>

        </h2>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 p-5 sm:gap-5 sm:p-6">

        <div className="min-w-0">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Goal
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {data.goal_minutes} min
          </h3>

        </div>

        <div className="min-w-0">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Completed
          </p>

          <h3 className="mt-1 text-xl font-bold text-green-600 dark:text-green-400 sm:text-2xl">
            {data.completed_minutes} min
          </h3>

        </div>

        <div className="min-w-0">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Focus Score
          </p>

          <h3 className="mt-1 text-xl font-bold text-indigo-700 dark:text-indigo-400 sm:text-2xl">
            {data.focus_score}%
          </h3>

        </div>

        <div className="min-w-0">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tasks
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {data.planner.length}
          </h3>

        </div>

      </div>

      {/* Recommendation */}

      <div className="border-t border-slate-200 p-5 dark:border-slate-700 sm:p-6">

        <div className="mb-4 flex items-center gap-2">

          <Sparkles
            size={18}
            className="shrink-0 text-yellow-500 dark:text-yellow-400"
          />

          <h3 className="font-semibold text-slate-900 dark:text-white">
            AI Suggestion
          </h3>

        </div>

        <div
          className="
            rounded-2xl
            bg-indigo-50
            p-4

            dark:bg-indigo-950/40

            sm:p-5
          "
        >

          <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 dark:text-slate-300">
            {data.recommendation}
          </p>

        </div>

      </div>

    </div>
  );
};

export default PlannerRecommendationCard;