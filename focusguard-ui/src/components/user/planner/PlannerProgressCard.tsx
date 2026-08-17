import {
  Target,
  TrendingUp,
} from "lucide-react";

import {
  usePlannerProgress,
} from "../../../hooks/usePlanner";

const PlannerProgressCard = () => {
  const {
    data,
    isLoading,
  } = usePlannerProgress();

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
          Loading progress...
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
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No progress available.
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

          <Target
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          <span>
            Planner Progress
          </span>

        </h2>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-6">

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Goal
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {data.goal_minutes} min
          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Completed
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400 sm:text-3xl">
            {data.completed_minutes} min
          </h3>

        </div>

      </div>

      {/* Progress */}

      <div className="px-5 sm:px-6">

        <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500 dark:bg-indigo-500"
            style={{
              width: `${Math.min(
                data.goal_completion_percentage,
                100
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Footer */}

      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Goal Completion
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {data.goal_completion_percentage.toFixed(
              1
            )}
            %
          </h3>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-indigo-100
            px-4
            py-3

            dark:bg-indigo-950/40

            sm:px-5
          "
        >

          <TrendingUp
            size={20}
            className="shrink-0 text-indigo-700 dark:text-indigo-400"
          />

          <div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Focus Score
            </p>

            <h3 className="font-bold text-indigo-700 dark:text-indigo-400">
              {data.focus_score}%
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PlannerProgressCard;