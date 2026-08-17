import {
  BrainCircuit,
  Sparkles,
  Lightbulb,
} from "lucide-react";

import Card from "../common/Card";
import Skeleton from "../common/Skeleton";

import {
  usePlannerRecommendation,
} from "../../hooks/usePlanner";

const PlannerRecommendationCard = () => {
  const {
    data,
    isLoading,
  } = usePlannerRecommendation();

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-24 w-full rounded-2xl" />

        <Skeleton className="mt-6 h-4 w-full" />

        <Skeleton className="mt-3 h-4 w-11/12" />

        <Skeleton className="mt-3 h-4 w-10/12" />
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="flex min-h-[250px] items-center justify-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No recommendation available.
        </p>
      </Card>
    );
  }

  const cleaned =
    data.recommendation.replaceAll(
      "**",
      ""
    );

  const paragraphs = cleaned
    .split("\n\n")
    .filter(Boolean);

  const preview =
    paragraphs.slice(0, 3);

  return (
    <Card className="min-w-0">

      {/* Header */}

      <div className="mb-6 flex min-w-0 items-center justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">

          <div className="shrink-0 rounded-xl bg-violet-100 p-3 dark:bg-violet-950/50">

            <BrainCircuit
              size={22}
              className="text-violet-600 dark:text-violet-400"
            />

          </div>

          <div className="min-w-0">

            <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-white">
              AI Planner Insights
            </h2>

            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
              Personalized recommendations
            </p>

          </div>

        </div>

        <Sparkles
          className="shrink-0 text-violet-600 dark:text-violet-400"
          size={20}
        />

      </div>

      {/* Focus Score */}

      <div className="rounded-2xl bg-violet-50 p-5 dark:bg-violet-950/30">

        <p className="text-sm font-medium text-violet-700 dark:text-violet-400">
          Focus Score
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {data.focus_score}%
        </h2>

      </div>

      {/* AI Summary */}

      <div className="mt-6">

        <div className="mb-3 flex items-center gap-2">

          <Lightbulb
            size={18}
            className="shrink-0 text-amber-500"
          />

          <span className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
            AI Summary
          </span>

        </div>

        <div className="space-y-4">

          {preview.map(
            (
              paragraph,
              index
            ) => (
              <p
                key={index}
                className="
                  break-words
                  rounded-xl
                  bg-slate-50
                  p-4
                  text-sm
                  leading-7
                  text-slate-700
                  dark:bg-slate-800/70
                  dark:text-slate-300
                "
              >
                {paragraph}
              </p>
            )
          )}

        </div>

      </div>

      {/* Planner Stats */}

      <div className="mt-6 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2">

        <div className="rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/30">

          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Goal
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            {data.goal_minutes} min
          </h3>

        </div>

        <div className="rounded-2xl bg-green-50 p-4 dark:bg-green-950/30">

          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Completed
          </p>

          <h3 className="mt-2 text-xl font-bold text-green-700 dark:text-green-400">
            {data.completed_minutes} min
          </h3>

        </div>

      </div>

      {/* Planner Items */}

      <div className="mt-6">

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Today's Planner
        </h3>

        <div className="space-y-3">

          {data.planner.map(
            (item) => (
              <div
                key={item.category}
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  p-4
                  dark:border-slate-700
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div className="min-w-0">

                  <h4 className="break-words font-semibold text-slate-900 dark:text-white">
                    {item.category}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Planned:{" "}
                    {item.planned_minutes}{" "}
                    min
                  </p>

                </div>

                <span
                  className={`
                    inline-flex
                    w-fit
                    shrink-0
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${
                      item.status ===
                      "Behind"
                        ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                        : "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                    }
                  `}
                >
                  {item.status}
                </span>

              </div>
            )
          )}

        </div>

      </div>

    </Card>
  );
};

export default PlannerRecommendationCard;