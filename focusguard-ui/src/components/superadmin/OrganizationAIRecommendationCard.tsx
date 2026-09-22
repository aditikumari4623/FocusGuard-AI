import {
  BrainCircuit,
  Sparkles,
  Lightbulb,
} from "lucide-react";

import {
  useOrganizationAI,
} from "../../hooks/useOrganizationAI";

import Skeleton from "../common/Skeleton";

import {
  useTranslation,
} from "../../hooks/useTranslation";

const OrganizationAIRecommendationCard = () => {
  const {
    data,
    isLoading,
    isError,
  } = useOrganizationAI();

  const organizationAIInsights =
    useTranslation(
      "Organization AI Insights"
    );

  const unableToLoadOrganizationAIInsights =
    useTranslation(
      "Unable to load organization AI insights."
    );

  const basedOnOrganizationActivity =
    useTranslation(
      "Based on organization users' activity"
    );

  const organizationFocusScore =
    useTranslation(
      "Organization Focus Score"
    );

  const aiRecommendation =
    useTranslation(
      "AI Recommendation"
    );

  const noOrganizationRecommendation =
    useTranslation(
      "No organization recommendation available."
    );

  const activeTime =
    useTranslation("Active Time");

  const idleTime =
    useTranslation("Idle Time");

  const browserTime =
    useTranslation("Browser Time");

  const tabSwitches =
    useTranslation("Tab Switches");

  /*
   * Dynamic AI recommendation.
   *
   * Keep this as a separate child component so the hook
   * is never called conditionally or inside the render body.
   */

  const DynamicRecommendation = ({
    text,
  }: {
    text: string;
  }) => {
    const translatedText =
      useTranslation(text);

    return (
      <>
        {translatedText}
      </>
    );
  };

  if (isLoading) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900

          sm:p-6
        "
      >
        <Skeleton className="h-6 w-48" />

        <Skeleton
          className="
            mt-4
            h-4
            w-32
          "
        />

        <Skeleton
          className="
            mt-4
            h-20
            w-full
          "
        />
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
          p-5
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900

          sm:p-6
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          {organizationAIInsights}
        </h2>

        <p
          className="
            mt-3
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          {unableToLoadOrganizationAIInsights}
        </p>
      </div>
    );
  }

  const cleanedRecommendation =
    data.recommendation
      ?.replaceAll("**", "")
      ?? "";

  return (
    <div
      className="
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/20

        sm:p-6
      "
    >
      {/* Header */}

      <div
        className="
          mb-5
          flex
          min-w-0
          items-start
          justify-between
          gap-3
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          <div
            className="
              shrink-0
              rounded-xl
              bg-violet-100
              p-3
              dark:bg-violet-950/50
            "
          >
            <BrainCircuit
              size={22}
              className="
                text-violet-600
                dark:text-violet-400
              "
            />
          </div>

          <div className="min-w-0">
            <h2
              className="
                text-lg
                font-bold
                leading-tight
                text-slate-900
                dark:text-white

                sm:text-xl
              "
            >
              {organizationAIInsights}
            </h2>

            <p
              className="
                mt-1
                text-sm
                leading-5
                text-slate-500
                dark:text-slate-400
              "
            >
              {basedOnOrganizationActivity}
            </p>
          </div>
        </div>

        <Sparkles
          size={20}
          className="
            mt-1
            shrink-0
            text-violet-600
            dark:text-violet-400
          "
        />
      </div>

      {/* Focus Score */}

      <div
        className="
          rounded-2xl
          bg-violet-50
          p-4
          dark:bg-violet-950/30

          sm:p-5
        "
      >
        <p
          className="
            text-sm
            font-semibold
            text-violet-700
            dark:text-violet-400
          "
        >
          {organizationFocusScore}
        </p>

        <h1
          className="
            mt-1
            text-3xl
            font-bold
            text-slate-900
            dark:text-white

            sm:text-4xl
          "
        >
          {data.focus_score.toFixed(1)}%
        </h1>
      </div>

      {/* Summary */}

      <div className="mt-6">
        <div
          className="
            mb-2
            flex
            items-center
            gap-2
          "
        >
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
            {aiRecommendation}
          </p>
        </div>

        <p
          className="
            break-words
            text-sm
            leading-7
            text-slate-700
            dark:text-slate-300
          "
        >
          {cleanedRecommendation ? (
            <DynamicRecommendation
              text={cleanedRecommendation}
            />
          ) : (
            noOrganizationRecommendation
          )}
        </p>
      </div>

      {/* Metrics */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-3

          sm:grid-cols-2
          sm:gap-4
        "
      >
        <div
          className="
            min-w-0
            rounded-xl
            bg-slate-50
            p-4
            dark:bg-slate-800/70
          "
        >
          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            {activeTime}
          </p>

          <p
            className="
              mt-1
              break-words
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {data.active_time}
          </p>
        </div>

        <div
          className="
            min-w-0
            rounded-xl
            bg-slate-50
            p-4
            dark:bg-slate-800/70
          "
        >
          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            {idleTime}
          </p>

          <p
            className="
              mt-1
              break-words
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {data.idle_time}
          </p>
        </div>

        <div
          className="
            min-w-0
            rounded-xl
            bg-slate-50
            p-4
            dark:bg-slate-800/70
          "
        >
          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            {browserTime}
          </p>

          <p
            className="
              mt-1
              break-words
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {data.browser_time}
          </p>
        </div>

        <div
          className="
            min-w-0
            rounded-xl
            bg-slate-50
            p-4
            dark:bg-slate-800/70
          "
        >
          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            {tabSwitches}
          </p>

          <p
            className="
              mt-1
              break-words
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {data.tab_switches}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationAIRecommendationCard;