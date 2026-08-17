import { useState } from "react";

import toast from "react-hot-toast";

import {
  useRequestDeactivation,
} from "../../../hooks/useOrganization";

interface Props {
  open: boolean;
  onClose: () => void;
}

const RequestDeactivationModal = ({
  open,
  onClose,
}: Props) => {
  const [reason, setReason] = useState("");

  const requestMutation =
    useRequestDeactivation();

  if (!open) {
    return null;
  }

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error("Reason is required.");
      return;
    }

    try {
      await requestMutation.mutateAsync({
        reason,
      });

      toast.success(
        "Request sent successfully."
      );

      setReason("");

      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ??
          "Unable to send request."
      );
    }
  };

  return (
    /* =====================================================
       OVERLAY
    ===================================================== */

    <div
      className="
        fixed
        inset-0
        z-[60]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-slate-900/50
        p-3
        backdrop-blur-sm

        sm:p-5
      "
    >
      {/* =================================================
          MODAL
      ================================================= */}

      <div
        className="
          my-auto
          w-full
          max-w-lg
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl

          sm:rounded-3xl
        "
      >
        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="p-5 sm:p-8">
          <h2
            className="
              break-words
              text-xl
              font-bold
              text-slate-900

              sm:text-2xl
            "
          >
            Organization Deactivation
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500

              sm:text-base
            "
          >
            Tell the Super Admin why your
            organization should be deactivated.
          </p>

          {/* Reason */}

          <textarea
            rows={5}
            value={reason}
            onChange={(e) =>
              setReason(e.target.value)
            }
            placeholder="Enter reason..."
            className="
              mt-5
              min-h-[130px]
              w-full
              resize-none
              rounded-2xl
              border
              border-slate-300
              p-3
              text-sm
              outline-none
              transition

              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-100

              sm:mt-6
              sm:p-4
              sm:text-base
            "
          />

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-6
              flex
              flex-col-reverse
              gap-3

              sm:mt-8
              sm:flex-row
              sm:justify-end
              sm:gap-4
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-5
                py-3
                text-sm
                font-medium
                transition
                hover:bg-slate-50

                sm:w-auto
                sm:px-6
                sm:text-base
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                requestMutation.isPending
              }
              className="
                w-full
                rounded-2xl
                bg-red-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-700

                disabled:cursor-not-allowed
                disabled:opacity-60

                sm:w-auto
                sm:px-6
                sm:text-base
              "
            >
              {requestMutation.isPending
                ? "Sending..."
                : "Send Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDeactivationModal;