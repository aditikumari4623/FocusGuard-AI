import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import {
  useTodayPlanner,
} from "../../../hooks/usePlanner";

const PlannerPreview = () => {
  const {
    data,
    isLoading,
  } = useTodayPlanner();

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
        Loading planner...
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

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20

          sm:p-6
        "
      >

        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">

          <CalendarDays
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          Today's Planner

        </h2>

        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
          No planner created for today.
        </p>

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

          <CalendarDays
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          Today's Planner

        </h2>

      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">

        {data.plans.length === 0 && (
          <p className="p-5 text-sm text-slate-500 dark:text-slate-400 sm:p-6">
            No planner created for today.
          </p>
        )}

        {data.plans.map((task, index) => (
          <div
            key={index}
            className="
              flex
              flex-col
              gap-4
              p-5
              transition
              hover:bg-slate-50

              dark:hover:bg-slate-800/50

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-6
            "
          >

            <div className="min-w-0">

              <h3 className="break-words font-semibold text-slate-900 dark:text-slate-100">
                {task.category}
              </h3>

              <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

                <Clock3
                  size={14}
                  className="shrink-0"
                />

                <span>
                  {task.start_time}
                  {" - "}
                  {task.end_time}
                </span>

              </p>

            </div>

            <span
              className="
                w-fit
                shrink-0
                rounded-xl
                bg-indigo-50
                px-4
                py-2
                text-sm
                font-semibold
                text-indigo-700

                dark:bg-indigo-950/40
                dark:text-indigo-400
              "
            >
              {task.planned_minutes} min
            </span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default PlannerPreview;