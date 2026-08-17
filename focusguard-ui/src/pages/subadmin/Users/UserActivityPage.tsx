import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Activity,
  Clock3,
  Globe,
  Moon,
  Target,
  Circle,
} from "lucide-react";

import AppLayout from "../../../layouts/AppLayout";

import {
  useUserStatus,
  useUserActivity,
  useUserActivitySummary,
  useUserWebsiteAnalytics,
  useUserCategoryAnalytics,
  useUserTabSwitchAnalytics,
  useUserWeeklyReport,
  useUserMonthlyReport,
} from "../../../hooks/useUserAnalytics";

import { formatDuration } from "../../../utils/time";

const UserActivityPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const id = userId
    ? Number(userId)
    : undefined;

  const activities = useUserActivity(id);

  const userStatus = useUserStatus(id);

  const summary = useUserActivitySummary(id);

  const websites = useUserWebsiteAnalytics(id);

  const categories = useUserCategoryAnalytics(id);

  const tabSwitches = useUserTabSwitchAnalytics(id);

  const weekly = useUserWeeklyReport(id);

  const monthly = useUserMonthlyReport(id);

  if (summary.isLoading) {
    return (
      <AppLayout>
        <div className="flex min-h-[400px] items-center justify-center px-4">
          <p className="text-center text-base font-medium text-slate-500 sm:text-lg">
            Loading user activity...
          </p>
        </div>
      </AppLayout>
    );
  }

  if (summary.isError || !summary.data) {
    return (
      <AppLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center sm:p-8">

          <p className="font-medium text-red-600">
            Unable to load user activity.
          </p>

          <button
            onClick={() =>
              navigate("/subadmin/users")
            }
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Back to Users
          </button>

        </div>
      </AppLayout>
    );
  }

  const user = summary.data.user;

  const currentStatus =
    userStatus.data?.status ?? "IDLE";

  const stats = [
    {
      title: "Browser Time",
      value: formatDuration(
        summary.data.browser_time_seconds
      ),
      icon: Globe,
      iconClass: "text-indigo-600",
      bgClass: "bg-indigo-100",
    },
    {
      title: "Active Time",
      value: formatDuration(
        summary.data.active_time_seconds
      ),
      icon: Activity,
      iconClass: "text-green-600",
      bgClass: "bg-green-100",
    },
    {
      title: "Idle Time",
      value: formatDuration(
        summary.data.idle_time_seconds
      ),
      icon: Moon,
      iconClass: "text-orange-500",
      bgClass: "bg-orange-100",
    },
    {
      title: "Focus Score",
      value: `${summary.data.focus_score.toFixed(1)}%`,
      icon: Target,
      iconClass: "text-violet-600",
      bgClass: "bg-violet-100",
    },
  ];

  return (
    <AppLayout>

      {/* =====================================================
          Header
      ===================================================== */}

      <div className="mb-5 sm:mb-6">

        <button
          onClick={() =>
            navigate("/subadmin/users")
          }
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 sm:mb-5"
        >
          <ArrowLeft size={18} />
          Back to Users
        </button>


        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* User Information */}

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                <h1 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
                  {user.full_name}
                </h1>

                <span
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    currentStatus === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >

                  <Circle
                    size={9}
                    fill="currentColor"
                  />

                  {currentStatus}

                </span>

              </div>


              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email}
              </p>


              <div className="mt-3 flex flex-wrap gap-2">

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {user.role}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Organization #{user.organization_id}
                </span>

              </div>

            </div>


            {/* Focus Score */}

            <div className="w-full rounded-2xl bg-violet-50 px-5 py-4 text-center sm:px-6 lg:w-auto lg:min-w-[150px]">

              <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
                Focus Score
              </p>

              <p className="mt-1 text-3xl font-bold text-violet-700">
                {summary.data.focus_score.toFixed(1)}%
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          Stats
      ===================================================== */}

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">

        {stats.map((stat) => {

          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 break-words text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>

                </div>

                <div
                  className={`shrink-0 rounded-2xl p-3 ${stat.bgClass}`}
                >
                  <Icon
                    size={22}
                    className={stat.iconClass}
                  />
                </div>

              </div>

            </div>
          );
        })}

      </div>


      {/* =====================================================
          Weekly + Monthly
      ===================================================== */}

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-2">


        {/* Weekly */}

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5 flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h2 className="text-lg font-semibold">
                Weekly Activity
              </h2>

              <p className="text-sm text-slate-500">
                Last 7 days
              </p>

            </div>

            <Clock3
              size={22}
              className="shrink-0 text-indigo-600"
            />

          </div>


          {weekly.isLoading ? (

            <p className="text-sm text-slate-500">
              Loading weekly report...
            </p>

          ) : (

            <>

              <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-green-50 p-3 text-center">
                  <p className="text-xs text-slate-500">
                    Active
                  </p>

                  <p className="mt-1 font-bold text-green-700">
                    {weekly.data?.active_time}
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-3 text-center">
                  <p className="text-xs text-slate-500">
                    Idle
                  </p>

                  <p className="mt-1 font-bold text-orange-600">
                    {weekly.data?.idle_time}
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-center">
                  <p className="text-xs text-slate-500">
                    Focus
                  </p>

                  <p className="mt-1 font-bold text-indigo-700">
                    {weekly.data?.focus_score.toFixed(1)}%
                  </p>
                </div>

              </div>


              <div className="space-y-3">

                {weekly.data?.daily_breakdown.map(
                  (day) => {

                    const total =
                      day.active_time_seconds +
                      day.idle_time_seconds;

                    const activePercent =
                      total > 0
                        ? (day.active_time_seconds / total) * 100
                        : 0;

                    return (
                      <div key={day.day}>

                        <div className="mb-1 flex justify-between gap-3 text-xs">

                          <span className="font-medium">
                            {day.day}
                          </span>

                          <span className="shrink-0 text-slate-500">
                            {day.active_time}
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{
                              width: `${activePercent}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </>
          )}

        </div>


        {/* Monthly */}

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5 flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h2 className="text-lg font-semibold">
                Monthly Activity
              </h2>

              <p className="text-sm text-slate-500">
                Last 30 days
              </p>

            </div>

            <Activity
              size={22}
              className="shrink-0 text-violet-600"
            />

          </div>


          {monthly.isLoading ? (

            <p className="text-sm text-slate-500">
              Loading monthly report...
            </p>

          ) : (

            <>

              <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-green-50 p-3 text-center">
                  <p className="text-xs text-slate-500">
                    Active
                  </p>

                  <p className="mt-1 font-bold text-green-700">
                    {monthly.data?.active_time}
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-3 text-center">
                  <p className="text-xs text-slate-500">
                    Idle
                  </p>

                  <p className="mt-1 font-bold text-orange-600">
                    {monthly.data?.idle_time}
                  </p>
                </div>

                <div className="rounded-xl bg-violet-50 p-3 text-center">
                  <p className="text-xs text-slate-500">
                    Focus
                  </p>

                  <p className="mt-1 font-bold text-violet-700">
                    {monthly.data?.focus_score.toFixed(1)}%
                  </p>
                </div>

              </div>


              <div className="space-y-4">

                {monthly.data?.weekly_breakdown.map(
                  (week) => {

                    const total =
                      week.active_time_seconds +
                      week.idle_time_seconds;

                    const activePercent =
                      total > 0
                        ? (week.active_time_seconds / total) * 100
                        : 0;

                    return (
                      <div key={week.week}>

                        <div className="mb-1 flex justify-between gap-3 text-xs">

                          <span className="font-medium">
                            {week.week}
                          </span>

                          <span className="shrink-0 text-slate-500">
                            {week.active_time}
                          </span>

                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-violet-500"
                            style={{
                              width: `${activePercent}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </>
          )}

        </div>

      </div>


      {/* =====================================================
          Websites + Categories
      ===================================================== */}

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-2">


        {/* Websites */}

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5 flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h2 className="text-lg font-semibold">
                Website Usage
              </h2>

              <p className="text-sm text-slate-500">
                Most visited websites
              </p>

            </div>

            <Globe
              size={22}
              className="shrink-0 text-indigo-600"
            />

          </div>


          {websites.isLoading ? (

            <p className="text-sm text-slate-500">
              Loading websites...
            </p>

          ) : websites.data?.length ? (

            <div className="space-y-3">

              {websites.data
                .slice(0, 8)
                .map((site) => {

                  const max =
                    Math.max(
                      ...websites.data!.map(
                        (item) =>
                          item.duration_seconds
                      ),
                      1
                    );

                  const percentage =
                    (site.duration_seconds / max) *
                    100;

                  return (
                    <div
                      key={site.website}
                      className="min-w-0"
                    >

                      <div className="mb-1 flex items-start justify-between gap-3 text-sm">

                        <span className="min-w-0 break-all font-medium text-slate-700">
                          {site.website}
                        </span>

                        <span className="shrink-0 text-slate-500">
                          {formatDuration(
                            site.duration_seconds
                          )}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

            </div>

          ) : (

            <p className="text-sm text-slate-500">
              No website activity available.
            </p>

          )}

        </div>


        {/* Categories */}

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">

            <h2 className="text-lg font-semibold">
              Category Usage
            </h2>

            <p className="text-sm text-slate-500">
              Time spent by category
            </p>

          </div>


          {categories.isLoading ? (

            <p className="text-sm text-slate-500">
              Loading categories...
            </p>

          ) : categories.data?.length ? (

            <div className="space-y-3">

              {categories.data
                .slice(0, 8)
                .map((category) => {

                  const max =
                    Math.max(
                      ...categories.data!.map(
                        (item) =>
                          item.duration_seconds
                      ),
                      1
                    );

                  const percentage =
                    (category.duration_seconds / max) *
                    100;

                  return (
                    <div
                      key={category.category}
                      className="min-w-0"
                    >

                      <div className="mb-1 flex items-start justify-between gap-3 text-sm">

                        <span className="min-w-0 break-words font-medium text-slate-700">
                          {category.category}
                        </span>

                        <span className="shrink-0 text-slate-500">
                          {formatDuration(
                            category.duration_seconds
                          )}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

            </div>

          ) : (

            <p className="text-sm text-slate-500">
              No category activity available.
            </p>

          )}

        </div>

      </div>


      {/* =====================================================
          Detailed Activity History
      ===================================================== */}

      <div className="mt-5 min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-6 sm:p-6">

        <div className="mb-5 flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold">
              Activity History
            </h2>

            <p className="text-sm text-slate-500">
              Detailed website and application activity
            </p>

          </div>

          <Activity
            size={22}
            className="shrink-0 text-indigo-600"
          />

        </div>


        {activities.isLoading ? (

          <p className="text-sm text-slate-500">
            Loading activity history...
          </p>

        ) : activities.data?.length ? (

          <div className="w-full overflow-x-auto">

            <table className="min-w-[760px] w-full text-sm">

              <thead>

                <tr className="border-b text-left text-slate-500">

                  <th className="px-3 pb-3">
                    Website
                  </th>

                  <th className="px-3 pb-3">
                    Category
                  </th>

                  <th className="px-3 pb-3">
                    Productivity
                  </th>

                  <th className="px-3 pb-3">
                    Duration
                  </th>

                  <th className="px-3 pb-3">
                    Start Time
                  </th>

                  <th className="px-3 pb-3">
                    End Time
                  </th>

                </tr>

              </thead>

              <tbody>

                {activities.data.map((activity) => (

                  <tr
                    key={activity.id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >

                    <td className="px-3 py-4">

                      <div className="max-w-[220px] truncate font-medium text-slate-800">
                        {activity.website_name}
                      </div>

                      <div className="max-w-[220px] truncate text-xs text-slate-400">
                        {activity.tab_title}
                      </div>

                    </td>


                    <td className="px-3 py-4">

                      <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                        {activity.category || "Unknown"}
                      </span>

                    </td>


                    <td className="px-3 py-4">

                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                          activity.productivity === "Productive"
                            ? "bg-green-100 text-green-700"
                            : activity.productivity === "Non-Productive"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {activity.productivity || "Unknown"}
                      </span>

                    </td>


                    <td className="px-3 py-4 font-medium">
                      {formatDuration(
                        activity.duration_seconds
                      )}
                    </td>


                    <td className="px-3 py-4 whitespace-nowrap text-slate-500">
                      {new Date(
                        activity.start_time
                      ).toLocaleTimeString()}
                    </td>


                    <td className="px-3 py-4 whitespace-nowrap text-slate-500">
                      {activity.end_time
                        ? new Date(
                            activity.end_time
                          ).toLocaleTimeString()
                        : "Ongoing"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <p className="text-sm text-slate-500">
            No activity history available.
          </p>

        )}

      </div>


      {/* =====================================================
          Tab Switching
      ===================================================== */}

      <div className="mt-5 min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-6 sm:p-6">

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold">
              Tab Switching
            </h2>

            <p className="text-sm text-slate-500">
              Recent tab switching activity
            </p>

          </div>

          <div className="w-fit rounded-xl bg-orange-100 px-4 py-2">

            <span className="whitespace-nowrap text-sm font-semibold text-orange-700">

              {tabSwitches.data?.total_switches ?? 0}
              {" "}
              switches

            </span>

          </div>

        </div>


        {tabSwitches.isLoading ? (

          <p className="text-sm text-slate-500">
            Loading tab switches...
          </p>

        ) : tabSwitches.data?.recent_switches.length ? (

          <div className="w-full overflow-x-auto">

            <table className="min-w-[520px] w-full text-sm">

              <thead>

                <tr className="border-b text-left text-slate-500">

                  <th className="pb-3">
                    From
                  </th>

                  <th className="pb-3">
                    To
                  </th>

                  <th className="pb-3">
                    Time
                  </th>

                </tr>

              </thead>

              <tbody>

                {tabSwitches.data.recent_switches.map(
                  (item, index) => (

                    <tr
                      key={`${item.time}-${index}`}
                      className="border-b last:border-0"
                    >

                      <td className="py-3 pr-4 font-medium">
                        {item.from}
                      </td>

                      <td className="py-3 pr-4">
                        {item.to}
                      </td>

                      <td className="whitespace-nowrap py-3 text-slate-500">
                        {new Date(
                          item.time
                        ).toLocaleString()}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <p className="text-sm text-slate-500">
            No tab switching activity available.
          </p>

        )}

      </div>

    </AppLayout>
  );
};

export default UserActivityPage;