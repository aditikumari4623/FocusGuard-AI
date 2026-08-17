import {
  BrainCircuit,
} from "lucide-react";

import {
  useAIRecommendation,
} from "../../../hooks/useAnalytics";

const AIRecommendationCard = () => {
  const {
    data,
    isLoading,
  } = useAIRecommendation();

  if (isLoading) {
    return (
      <div
        className="
          min-w-0
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          text-sm
          text-slate-500

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-400

          sm:p-6
        "
      >
        Loading recommendation...
      </div>
    );
  }

  return (
    <div
      className="
        min-w-0
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-colors

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/20

        sm:p-6
      "
    >

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-indigo-100

            dark:bg-indigo-950/50

            sm:h-14
            sm:w-14
          "
        >

          <BrainCircuit
            size={26}
            className="text-indigo-600 dark:text-indigo-400 sm:h-7 sm:w-7"
          />

        </div>

        <div className="min-w-0">

          <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-2xl">
            AI Recommendation
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Personalized productivity insight
          </p>

        </div>

      </div>

      <div
        className="
          mt-6
          rounded-2xl
          bg-slate-50
          p-4

          dark:bg-slate-800

          sm:mt-8
          sm:p-6
        "
      >

        <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base sm:leading-8">
          {data?.recommendation ||
            "No recommendation available."}
        </p>

      </div>

    </div>
  );
};

export default AIRecommendationCard;