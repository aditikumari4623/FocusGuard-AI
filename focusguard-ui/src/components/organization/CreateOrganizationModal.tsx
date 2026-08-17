import toast from "react-hot-toast";

import CreateOrganizationForm from "./CreateOrganizationForm";

import {
  useCreateOrganization,
} from "../../hooks/useOrganization";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateOrganizationModal = ({
  open,
  onClose,
}: Props) => {
  const createOrganization =
    useCreateOrganization();

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[80]
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-slate-200
            px-6
            py-5

            dark:border-slate-700

            sm:px-7
            sm:py-6
          "
        >
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              Create Organization
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add a new organization to FocusGuard.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-xl
              text-slate-500
              transition

              hover:bg-slate-100
              hover:text-slate-800

              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            ×
          </button>
        </div>

        {/* Body */}

        <div className="p-6 sm:p-7">
          <CreateOrganizationForm
            loading={
              createOrganization.isPending
            }
            onSubmit={async (
              organizationName
            ) => {
              try {
                await createOrganization.mutateAsync(
                  {
                    organization_name:
                      organizationName,
                  }
                );

                toast.success(
                  "Organization created successfully."
                );

                onClose();
              } catch (error: any) {
                toast.error(
                  error?.response?.data
                    ?.detail ??
                    "Unable to create organization."
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateOrganizationModal;