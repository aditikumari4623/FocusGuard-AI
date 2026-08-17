import {
  Building2,
} from "lucide-react";

import OrganizationCard from "./OrganizationCard";

import {
  useOrganizations,
} from "../../hooks/useOrganization";

const OrganizationGrid = () => {
  const {
    data,
    isLoading,
    error,
  } = useOrganizations();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(
          (item) => (
            <div
              key={item}
              className="
                h-64
                animate-pulse
                rounded-3xl
                border
                border-slate-200
                bg-slate-100

                dark:border-slate-700
                dark:bg-slate-800
              "
            />
          )
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-red-200
          bg-red-50
          p-8
          text-center

          dark:border-red-900/50
          dark:bg-red-950/30
        "
      >
        <h2 className="text-lg font-bold text-red-700 dark:text-red-300">
          Failed to Load Organizations
        </h2>

        <p className="mt-2 text-sm text-red-600/80 dark:text-red-400">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-dashed
          border-slate-300
          bg-white
          p-10
          text-center

          dark:border-slate-700
          dark:bg-slate-900

          sm:p-12
        "
      >
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-indigo-50

            dark:bg-indigo-950/40
          "
        >
          <Building2
            size={36}
            className="text-indigo-500 dark:text-indigo-400"
          />
        </div>

        <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          No Organizations Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Create your first organization to start managing teams and organization users.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {data.map((organization) => (
        <OrganizationCard
          key={organization.id}
          organization={organization}
        />
      ))}
    </div>
  );
};

export default OrganizationGrid;