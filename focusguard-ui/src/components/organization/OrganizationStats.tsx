import {
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  useOrganizations,
} from "../../hooks/useOrganization";

const OrganizationStats = () => {
  const {
    data,
    isLoading,
  } = useOrganizations();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              h-32
              animate-pulse
              rounded-3xl
              border
              border-slate-200
              bg-slate-100

              dark:border-slate-700
              dark:bg-slate-800
            "
          />
        ))}
      </div>
    );
  }

  const organizations =
    data ?? [];

  const totalOrganizations =
    organizations.length;

  const activeOrganizations =
    organizations.filter(
      (organization) =>
        organization.is_active
    ).length;

  const inactiveOrganizations =
    totalOrganizations -
    activeOrganizations;

  const stats = [
    {
      title: "Total Organizations",
      value: totalOrganizations,
      icon: Building2,
      bg: "bg-indigo-100 dark:bg-indigo-950/50",
      color:
        "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Active",
      value: activeOrganizations,
      icon: CheckCircle2,
      bg: "bg-green-100 dark:bg-green-950/50",
      color:
        "text-green-600 dark:text-green-400",
    },
    {
      title: "Inactive",
      value: inactiveOrganizations,
      icon: XCircle,
      bg: "bg-red-100 dark:bg-red-950/50",
      color:
        "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-lg

              dark:border-slate-700
              dark:bg-slate-900
              dark:shadow-black/20

              sm:p-6
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`shrink-0 rounded-2xl p-3 sm:p-4 ${stat.bg}`}
              >
                <Icon
                  size={27}
                  className={stat.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrganizationStats;