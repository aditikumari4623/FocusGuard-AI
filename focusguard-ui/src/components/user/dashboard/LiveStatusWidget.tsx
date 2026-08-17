import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Globe,
  FolderOpen,
} from "lucide-react";

import { useLiveStatus } from "../../../hooks/usePlanner";

const LiveStatusWidget = () => {
  const {
    data,
    isLoading,
  } = useLiveStatus();

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
        Loading live status...
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
        Live status unavailable.
      </div>
    );
  }

  const isOnTrack =
    data.status === "ON_TRACK";

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

      {/* Header */}

      <div className="border-b border-slate-200 p-5 dark:border-slate-700 sm:p-6">

        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">

          <Activity
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          Live Focus Status

        </h2>

      </div>

      {/* Body */}

      <div className="space-y-6 p-5 sm:p-6">

        {/* Status */}

        <div
          className={`flex items-start gap-3 rounded-2xl p-4 ${
            isOnTrack
              ? `
                bg-green-50
                dark:border
                dark:border-green-900/40
                dark:bg-green-950/40
              `
              : `
                bg-red-50
                dark:border
                dark:border-red-900/40
                dark:bg-red-950/40
              `
          }`}
        >

          {isOnTrack ? (
            <CheckCircle2
              size={24}
              className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
            />
          ) : (
            <AlertTriangle
              size={24}
              className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
            />
          )}

          <div className="min-w-0">

            <h3
              className={`font-semibold ${
                isOnTrack
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {data.status}
            </h3>

            <p className="mt-1 break-words text-sm text-slate-600 dark:text-slate-300">
              {data.message}
            </p>

          </div>

        </div>

        {/* Planned Category */}

        <div className="flex items-start gap-3">

          <FolderOpen
            size={20}
            className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          <div className="min-w-0">

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Planned Category
            </p>

            <h3 className="mt-1 break-words font-semibold text-slate-900 dark:text-slate-100">
              {data.planned_category || "-"}
            </h3>

          </div>

        </div>

        {/* Current Category */}

        <div className="flex items-start gap-3">

          <FolderOpen
            size={20}
            className="mt-1 shrink-0 text-green-600 dark:text-green-400"
          />

          <div className="min-w-0">

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current Category
            </p>

            <h3 className="mt-1 break-words font-semibold text-slate-900 dark:text-slate-100">
              {data.current_category || "-"}
            </h3>

          </div>

        </div>

        {/* Website */}

        <div className="flex items-start gap-3">

          <Globe
            size={20}
            className="mt-1 shrink-0 text-blue-600 dark:text-blue-400"
          />

          <div className="min-w-0">

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current Website
            </p>

            <h3 className="break-all font-semibold text-slate-900 dark:text-slate-100">
              {data.website || "-"}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LiveStatusWidget;