import {
  BrainCircuit,
  Sparkles,
  Lightbulb,
} from "lucide-react";

import { useOrganizationAI } from "../../hooks/useOrganizationAI";

import Skeleton from "../common/Skeleton";

const OrganizationAIRecommendationCard = () => {
  const {
    data,
    isLoading,
    isError,
  } = useOrganizationAI();

  if (isLoading) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        <Skeleton className="h-6 w-48" />

        <Skeleton className="mt-4 h-4 w-32" />

        <Skeleton className="mt-4 h-20 w-full" />

      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Organization AI Insights
        </h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Unable to load organization AI insights.
        </p>

      </div>
    );
  }

  const cleanedRecommendation =
    data.recommendation?.replaceAll("**", "") ?? "";

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex min-w-0 items-center gap-3">

          <div className="shrink-0 rounded-xl bg-violet-100 p-3 dark:bg-violet-950/50">

            <BrainCircuit
              size={22}
              className="text-violet-600 dark:text-violet-400"
            />

          </div>

          <div className="min-w-0">

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Organization AI Insights
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Based on organization users' activity
            </p>

          </div>

        </div>

        <Sparkles
          size={20}
          className="shrink-0 text-violet-600 dark:text-violet-400"
        />

      </div>

      {/* Focus Score */}

      <div className="rounded-2xl bg-violet-50 p-5 dark:bg-violet-950/30">

        <p className="text-sm font-semibold text-violet-700 dark:text-violet-400">
          Organization Focus Score
        </p>

        <h1 className="mt-1 text-4xl font-bold text-slate-900 dark:text-white">
          {data.focus_score.toFixed(1)}%
        </h1>

      </div>

      {/* Summary */}

      <div className="mt-6">

        <div className="mb-2 flex items-center gap-2">

          <Lightbulb
            size={18}
            className="text-amber-500"
          />

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-slate-600
              dark:text-slate-300
            "
          >
            AI Recommendation
          </p>

        </div>

        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          {cleanedRecommendation ||
            "No organization recommendation available."}
        </p>

      </div>

      {/* Metrics */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Active Time
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {data.active_time}
          </p>

        </div>

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Idle Time
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {data.idle_time}
          </p>

        </div>

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browser Time
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {data.browser_time}
          </p>

        </div>

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tab Switches
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {data.tab_switches}
          </p>

        </div>

      </div>

    </div>
  );
};

export default OrganizationAIRecommendationCard;