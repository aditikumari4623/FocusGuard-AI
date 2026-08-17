import {
  Globe,
  ExternalLink,
} from "lucide-react";

import {
  useWebsiteAnalytics,
} from "../../../hooks/useAnalytics";

const formatTime = (
  seconds: number
) => {
  const hours = Math.floor(
    seconds / 3600
  );

  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

const WebsiteAnalyticsCard = () => {
  const {
    data,
    isLoading,
  } = useWebsiteAnalytics();

  if (isLoading) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20
        "
      >
        <div className="h-6 w-44 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20

          sm:p-6
        "
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          Website Analytics
        </h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          No website activity found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/20
      "
    >
      <div className="border-b border-slate-200 p-5 dark:border-slate-700 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          <Globe
            size={22}
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          />

          <span>Website Analytics</span>
        </h2>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {data.map(
          (website, index) => (
            <div
              key={index}
              className="
                flex
                flex-col
                gap-4
                p-5
                transition
                hover:bg-slate-50

                dark:hover:bg-slate-800/50

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex min-w-0 items-center gap-3">

                <div
                  className="
                    shrink-0
                    rounded-xl
                    bg-indigo-100
                    p-3

                    dark:bg-indigo-950/40
                  "
                >
                  <ExternalLink
                    size={18}
                    className="text-indigo-600 dark:text-indigo-400"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="break-all font-semibold text-slate-900 dark:text-slate-100">
                    {website.website}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Website
                  </p>
                </div>

              </div>

              <div
                className="
                  self-start
                  rounded-xl
                  bg-indigo-50
                  px-4
                  py-2

                  dark:bg-indigo-950/40

                  sm:self-auto
                "
              >
                <span className="whitespace-nowrap font-semibold text-indigo-700 dark:text-indigo-400">
                  {formatTime(
                    website.duration_seconds
                  )}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WebsiteAnalyticsCard;