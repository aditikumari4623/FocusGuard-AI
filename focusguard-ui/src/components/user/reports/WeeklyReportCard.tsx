import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import {
  useWeeklyReport,
} from "../../../hooks/useReports";

const WeeklyReportCard = () => {
  const {
    data,
    isLoading,
  } = useWeeklyReport();

  if (isLoading) {
    return (
      <div
        className="
          rounded-3xl
          border border-slate-200
          bg-white
          p-5
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20
          sm:p-6
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading weekly report...
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-slate-200
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
          <CalendarDays
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          <span>Weekly Report</span>
        </h2>
      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-6 lg:grid-cols-4">
        {/* Active */}

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 sm:p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {data.active_time}
          </h3>
        </div>

        {/* Idle */}

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 sm:p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Idle
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {data.idle_time}
          </h3>
        </div>

        {/* Total */}

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 sm:p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {data.total_time}
          </h3>
        </div>

        {/* Focus */}

        <div className="rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/40 sm:p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Focus Score
          </p>

          <h3 className="mt-1 text-2xl font-bold text-indigo-700 dark:text-indigo-400 sm:text-3xl">
            {data.focus_score}%
          </h3>
        </div>
      </div>

      {/* Daily Breakdown */}

      <div className="divide-y divide-slate-100 border-t border-slate-100 dark:divide-slate-800 dark:border-slate-800">
        {data.daily_breakdown.map((day) => (
          <div
            key={day.day}
            className="
              flex
              flex-col
              gap-3
              p-4
              transition
              hover:bg-slate-50
              dark:hover:bg-slate-800/50
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-5
            "
          >
            {/* Day */}

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/50">
                <Clock3
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>

              <span className="font-medium text-slate-800 dark:text-slate-200">
                {day.day}
              </span>
            </div>

            {/* Time */}

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400 sm:justify-end">
              <span>
                Active:{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {day.active_time}
                </span>
              </span>

              <span>
                Idle:{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {day.idle_time}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyReportCard;