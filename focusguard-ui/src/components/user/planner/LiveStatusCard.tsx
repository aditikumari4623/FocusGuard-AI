import {
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import {
  useLiveStatus,
} from "../../../hooks/usePlanner";

const LiveStatusCard = () => {
  const {
    data,
    isLoading,
  } = useLiveStatus();

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
          Loading live status...
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
          Live Status
        </h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          No live status available.
        </p>
      </div>
    );
  }

  const onTrack =
    data.status === "ON_TRACK";

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

          <Activity
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          <span>
            Live Status
          </span>

        </h2>

      </div>

      {/* Body */}

      <div className="space-y-5 p-5 sm:p-6">

        {/* Status */}

        <div
          className={`flex items-start gap-3 rounded-2xl px-4 py-4 sm:px-5 ${
            onTrack
              ? `
                bg-green-100
                dark:border
                dark:border-green-900/40
                dark:bg-green-950/40
              `
              : `
                bg-red-100
                dark:border
                dark:border-red-900/40
                dark:bg-red-950/40
              `
          }`}
        >

          {onTrack ? (
            <CheckCircle2
              className="mt-0.5 shrink-0 text-green-700 dark:text-green-400"
              size={22}
            />
          ) : (
            <AlertTriangle
              className="mt-0.5 shrink-0 text-red-700 dark:text-red-400"
              size={22}
            />
          )}

          <span
            className={`break-words font-semibold ${
              onTrack
                ? "text-green-700 dark:text-green-400"
                : "text-red-700 dark:text-red-400"
            }`}
          >
            {data.status.replace(
              "_",
              " "
            )}
          </span>

        </div>

        {/* Planned Category */}

        <div className="min-w-0">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Planned Category
          </p>

          <h3 className="mt-1 break-words font-semibold text-slate-900 dark:text-slate-100">
            {data.planned_category || "-"}
          </h3>

        </div>

        {/* Current Category */}

        <div className="min-w-0">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Current Category
          </p>

          <h3 className="mt-1 break-words font-semibold text-slate-900 dark:text-slate-100">
            {data.current_category || "-"}
          </h3>

        </div>

        {/* Website */}

        <div className="min-w-0">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Website
          </p>

          <h3 className="mt-1 break-all font-semibold text-slate-900 dark:text-slate-100">
            {data.website || "-"}
          </h3>

        </div>

        {/* Message */}

        <div
          className="
            rounded-2xl
            bg-slate-100
            p-4

            dark:bg-slate-800
          "
        >

          <p className="break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
            {data.message}
          </p>

        </div>

      </div>

    </div>
  );
};

export default LiveStatusCard;