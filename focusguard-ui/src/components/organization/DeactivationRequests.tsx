import { useDeactivationRequests } from "../../hooks/useOrganization";

import DeactivationRequestCard from "./DeactivationRequestCard";

const DeactivationRequests = () => {
  const {
    data,
    isLoading,
    error,
  } = useDeactivationRequests();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Loading requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600">
        Unable to load requests.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        No deactivation requests found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {data.map((request) => (
        <DeactivationRequestCard
          key={request.id}
          request={request}
        />
      ))}

    </div>
  );
};

export default DeactivationRequests;