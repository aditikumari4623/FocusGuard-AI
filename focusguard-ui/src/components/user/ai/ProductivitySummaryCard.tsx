import {
  BrainCircuit,
  Clock3,
  Target,
} from "lucide-react";

import {
  useAIRecommendation,
} from "../../../hooks/useAI";

const ProductivitySummaryCard = () => {
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
        <div className="animate-pulse">

          <div className="h-5 w-56 rounded bg-slate-200 dark:bg-slate-700" />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-28
                  rounded-2xl
                  bg-slate-100
                  dark:bg-slate-800
                "
              />
            ))}

          </div>

        </div>
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
          No productivity summary available.
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
      "
    >

      {/* Header */}

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
            Today's Productivity Summary
          </span>
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          A quick overview of your current productivity.
        </p>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          p-5
          sm:grid-cols-2
          sm:gap-5
          sm:p-6
          md:grid-cols-3
        "
      >

        {/* Active */}

        <div
          className="
            rounded-2xl
            border
            border-indigo-100
            bg-indigo-50
            p-5
            dark:border-indigo-900/50
            dark:bg-indigo-950/40
          "
        >
          <Clock3
            className="mb-3 text-indigo-600 dark:text-indigo-400"
            size={24}
          />

          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Active Time
          </p>

          <h3
            className="
              mt-1
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
              sm:text-3xl
            "
          >
            {data.active_time}
          </h3>
        </div>

        {/* Idle */}

        <div
          className="
            rounded-2xl
            border
            border-yellow-100
            bg-yellow-50
            p-5
            dark:border-yellow-900/40
            dark:bg-yellow-950/30
          "
        >
          <Clock3
            className="mb-3 text-yellow-600 dark:text-yellow-400"
            size={24}
          />

          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Idle Time
          </p>

          <h3
            className="
              mt-1
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
              sm:text-3xl
            "
          >
            {data.idle_time}
          </h3>
        </div>

        {/* Focus */}

        <div
          className="
            rounded-2xl
            border
            border-green-100
            bg-green-50
            p-5
            dark:border-green-900/40
            dark:bg-green-950/30
            sm:col-span-2
            md:col-span-1
          "
        >
          <Target
            className="mb-3 text-green-600 dark:text-green-400"
            size={24}
          />

          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Focus Score
          </p>

          <h3
            className="
              mt-1
              text-2xl
              font-bold
              text-green-700
              dark:text-green-400
              sm:text-3xl
            "
          >
            {data.focus_score}%
          </h3>
        </div>

      </div>
    </div>
  );
};

export default ProductivitySummaryCard;