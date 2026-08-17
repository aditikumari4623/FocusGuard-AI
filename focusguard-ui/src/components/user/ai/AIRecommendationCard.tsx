import {
  Sparkles,
  BrainCircuit,
} from "lucide-react";

import {
  useAIRecommendation,
} from "../../../hooks/useAI";

const AIRecommendationCard = () => {
  const {
    data,
    isLoading,
  } = useAIRecommendation();

  if (isLoading) {
    return (
      <div
        className="
          rounded-3xl
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
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900

          sm:p-6
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No AI recommendation available.
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

      {/* =========================================
          HEADER
      ========================================= */}

      <div
        className="
          border-b
          border-slate-200
          p-5

          dark:border-slate-700

          sm:p-6
        "
      >
        <h2
          className="
            flex
            items-center
            gap-2
            text-lg
            font-bold
            text-slate-900

            dark:text-white

            sm:text-xl
          "
        >
          <BrainCircuit
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          <span>
            AI Recommendation
          </span>
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Personalized guidance based on your activity
        </p>
      </div>


      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="p-5 sm:p-6">

        {/* Insight heading */}

        <div className="mb-4 flex items-center gap-2">

          <Sparkles
            className="shrink-0 text-yellow-500 dark:text-yellow-400"
            size={20}
          />

          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Personalized Insight
          </span>

        </div>


        {/* Recommendation */}

        <div
          className="
            rounded-2xl
            border
            border-indigo-100
            bg-indigo-50
            p-4

            dark:border-indigo-900/50
            dark:bg-indigo-950/40

            sm:p-6
          "
        >
          <p
            className="
              whitespace-pre-wrap
              text-sm
              leading-7
              text-slate-700

              dark:text-slate-200

              sm:text-base
              sm:leading-8
            "
          >
            {data.recommendation}
          </p>
        </div>

      </div>

    </div>
  );
};

export default AIRecommendationCard;