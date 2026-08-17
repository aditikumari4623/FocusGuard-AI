import {
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  useDeactivationRequests,
} from "../../../hooks/useOrganization";

const RequestHistory = () => {
  const {
    data,
    isLoading,
  } = useDeactivationRequests();

  /* =====================================================
      LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <div
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm

          sm:rounded-3xl
          sm:p-6
        "
      >
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 rounded bg-slate-200" />

          <div className="h-16 w-full rounded-2xl bg-slate-100" />

          <div className="h-16 w-full rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  /* =====================================================
      EMPTY
  ===================================================== */

  if (!data || data.length === 0) {
    return (
      <div
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm

          sm:rounded-3xl
          sm:p-6
        "
      >
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          No Requests
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          You haven't submitted any
          organization deactivation requests.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm

        sm:rounded-3xl
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          border-b
          border-slate-200
          p-5

          sm:p-6
        "
      >
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Request History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Previous organization deactivation requests
        </p>
      </div>

      {/* =================================================
          REQUESTS
      ================================================= */}

      <div className="divide-y divide-slate-200">
        {data.map((request) => {
          const badge =
            request.status === "APPROVED"
              ? {
                  icon: CheckCircle2,
                  className:
                    "bg-green-100 text-green-700",
                }
              : request.status === "REJECTED"
              ? {
                  icon: XCircle,
                  className:
                    "bg-red-100 text-red-700",
                }
              : {
                  icon: Clock3,
                  className:
                    "bg-yellow-100 text-yellow-700",
                };

          const Icon = badge.icon;

          return (
            <div
              key={request.id}
              className="
                flex
                min-w-0
                flex-col
                gap-4
                p-5

                sm:p-6

                md:flex-row
                md:items-center
                md:justify-between
                md:gap-6
              "
            >
              {/* Request information */}

              <div className="min-w-0 flex-1">
                <h3
                  className="
                    break-words
                    text-sm
                    font-semibold
                    leading-6
                    text-slate-900

                    sm:text-base
                  "
                >
                  {request.reason}
                </h3>

                <p className="mt-1 break-words text-xs text-slate-500 sm:text-sm">
                  Requested on{" "}
                  {new Date(
                    request.requested_at
                  ).toLocaleString()}
                </p>
              </div>

              {/* Status */}

              <span
                className={`
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-2
                  rounded-full
                  px-3
                  py-2
                  text-xs
                  font-semibold

                  sm:px-4
                  sm:text-sm

                  ${badge.className}
                `}
              >
                <Icon size={16} />

                {request.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RequestHistory;