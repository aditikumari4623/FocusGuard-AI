import toast from "react-hot-toast";

import InviteSubAdminForm from "./InviteSubAdminForm";

import {
  useInviteSubAdmin,
} from "../../hooks/useAdmin";

interface Props {
  open: boolean;
  onClose: () => void;
}

const InviteSubAdminModal = ({
  open,
  onClose,
}: Props) => {
  const invite =
    useInviteSubAdmin();

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
        dark:bg-black/60
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          border-transparent
          bg-white
          p-8
          shadow-2xl
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Invite Sub Admin
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-xl
              px-3
              py-2
              text-slate-600
              hover:bg-slate-100

              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            ✕
          </button>
        </div>

        <InviteSubAdminForm
          loading={invite.isPending}
          onSubmit={async (
            fullName,
            email
          ) => {
            try {
              const response =
                await invite.mutateAsync({
                  full_name:
                    fullName,
                  email,
                });

              toast.success(
                response.message ??
                  "Invitation sent successfully."
              );

              onClose();
            } catch (error: any) {
              toast.error(
                error?.response?.data
                  ?.detail ??
                  "Unable to send invitation."
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default InviteSubAdminModal;