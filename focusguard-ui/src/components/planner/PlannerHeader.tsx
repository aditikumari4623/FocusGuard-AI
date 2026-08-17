import { useState } from "react";

import {
  CalendarDays,
  Plus,
  Pencil,
} from "lucide-react";

import CreatePlannerModal from "./CreatePlannerModal";

import { useTodayPlanner } from "../../hooks/usePlanner";

const PlannerHeader = () => {
  const [open, setOpen] = useState(false);

  const { data: planner } = useTodayPlanner();

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <>
      <div
        className="
          flex
          w-full
          min-w-0
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* =================================================
            TITLE
        ================================================= */}

        <div className="min-w-0">

          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
              sm:text-3xl
            "
          >
            Focus Planner
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            Organize your day and stay focused.
          </p>

        </div>

        {/* =================================================
            DATE + BUTTON
        ================================================= */}

        <div
          className="
            flex
            w-full
            min-w-0
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            lg:w-auto
          "
        >

          {/* Date */}

          <div
            className="
              flex
              min-w-0
              w-full
              items-center
              gap-2
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
              dark:border-slate-700
              dark:bg-slate-900
              sm:w-auto
            "
          >

            <CalendarDays
              size={18}
              className="shrink-0 text-indigo-600 dark:text-indigo-400"
            />

            <span
              className="
                truncate
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              {today}
            </span>

          </div>

          {/* Create / Edit */}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-indigo-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-indigo-700
              active:bg-indigo-800
              sm:w-auto
            "
          >

            {planner ? (
              <>
                <Pencil size={18} />

                <span>Edit Plan</span>
              </>
            ) : (
              <>
                <Plus size={18} />

                <span>Create Plan</span>
              </>
            )}

          </button>

        </div>

      </div>

      <CreatePlannerModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
};

export default PlannerHeader;