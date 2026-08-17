import {
  Clock3,
  PlayCircle,
} from "lucide-react";

import {
  useCurrentSession,
} from "../../../hooks/usePlanner";

const CurrentSessionCard = () => {
  const {
    data,
    isLoading,
  } = useCurrentSession();

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
          Loading current session...
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
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Current Session
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          No active session.
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

          <PlayCircle
            size={22}
            className="shrink-0 text-green-600 dark:text-green-400"
          />

          <span>
            Current Session
          </span>

        </h2>

      </div>

      {/* Body */}

      <div className="space-y-5 p-5 sm:p-6">

        {/* Category */}

        <div className="min-w-0">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Current Category
          </p>

          <h3 className="mt-1 break-words text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {data.category}
          </h3>

        </div>

        {/* Time */}

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300 sm:gap-4">

          <Clock3
            size={18}
            className="shrink-0 text-slate-500 dark:text-slate-400"
          />

          <span className="whitespace-nowrap">
            {data.start_time}
          </span>

          <span>
            →
          </span>

          <span className="whitespace-nowrap">
            {data.end_time}
          </span>

        </div>

        {/* Remaining Time */}

        <div
          className="
            rounded-2xl
            bg-indigo-50
            p-4

            dark:bg-indigo-950/40

            sm:p-5
          "
        >

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Remaining Time
          </p>

          <h2 className="mt-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400 sm:text-3xl">
            {data.remaining_minutes} min
          </h2>

        </div>

      </div>

    </div>
  );
};

export default CurrentSessionCard;