import {
  Timer,
} from "lucide-react";

import {
  useCurrentSession,
} from "../../../hooks/usePlanner";

const CurrentSessionPreview = () => {
  const {
    data,
    isLoading,
  } = useCurrentSession();

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
        Loading session...
      </div>
    );
  }

  if (!data) {
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
        No active session.
      </div>
    );
  }

  return (
    <div
      className="
        min-w-0
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

      <div className="border-b border-slate-200 p-5 dark:border-slate-700 sm:p-6">

        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">

          <Timer
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          Current Session

        </h2>

      </div>

      <div className="space-y-5 p-5 sm:p-6">

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Category
          </p>

          <h3 className="mt-1 break-words text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
            {data.category}
          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Remaining Time
          </p>

          <h3 className="mt-1 text-lg font-bold text-indigo-700 dark:text-indigo-400 sm:text-xl">
            {data.remaining_minutes} mins
          </h3>

        </div>

      </div>

    </div>
  );
};

export default CurrentSessionPreview;