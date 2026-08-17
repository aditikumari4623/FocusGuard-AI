import PlannerForm from "./PlannerForm";

import toast from "react-hot-toast";

import {
  useCreatePlanner,
  useTodayPlanner,
  useUpdatePlanner,
} from "../../hooks/usePlanner";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreatePlannerModal = ({
  open,
  onClose,
}: Props) => {
  const createPlanner =
    useCreatePlanner();

  const updatePlanner =
    useUpdatePlanner();

  const {
    data: planner,
  } = useTodayPlanner();

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-start
        justify-center
        overflow-y-auto
        bg-slate-900/50
        p-3
        backdrop-blur-sm
        sm:p-6
        lg:items-center
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          my-2
          w-full
          max-w-3xl
          min-w-0
          rounded-2xl
          bg-white
          p-5
          shadow-2xl
          dark:bg-slate-900
          dark:ring-1
          dark:ring-slate-700
          sm:my-6
          sm:rounded-3xl
          sm:p-7
          lg:p-8
        "
      >
        {/* Header */}

        <div className="mb-6 flex items-start justify-between gap-4">

          <h2
            className="
              min-w-0
              text-xl
              font-bold
              text-slate-900
              dark:text-white
              sm:text-2xl
            "
          >
            {planner
              ? "Edit Focus Plan"
              : "Create Focus Plan"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close planner modal"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-lg
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            ✕
          </button>

        </div>

        <PlannerForm
          loading={
            createPlanner.isPending ||
            updatePlanner.isPending
          }
          defaultValues={
            planner
              ? {
                  plan_date:
                    planner.date,
                  total_goal_minutes:
                    planner.total_goal_minutes,
                  plans: planner.plans,
                }
              : undefined
          }
          onSubmit={async (values) => {
            try {
              if (planner) {
                await updatePlanner.mutateAsync(
                  {
                    planId:
                      planner.plan_id,

                    payload: {
                      total_goal_minutes:
                        values.total_goal_minutes,

                      plans: values.plans,
                    },
                  }
                );

                toast.success(
                  "Planner updated successfully."
                );
              } else {
                await createPlanner.mutateAsync(
                  {
                    ...values,

                    plan_date: `${values.plan_date}T00:00:00`,
                  }
                );

                toast.success(
                  "Planner created successfully."
                );
              }

              onClose();
            } catch (error: any) {
              console.error(error);

              toast.error(
                error?.response?.data
                  ?.detail ??
                  "Unable to save planner."
              );
            }
          }}
        />

      </div>
    </div>
  );
};

export default CreatePlannerModal;