import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  BarChart3,
  TrendingUp,
} from "lucide-react";

import Card from "../../common/Card";
import Skeleton from "../../common/Skeleton";

import {
  useWeeklyReport,
} from "../../../hooks/useReports";

const formatMinutes = (seconds: number) => {
  const mins = Math.round(seconds / 60);

  return `${mins}m`;
};

const WeeklyActivityChart = () => {
  const {
    data,
    isLoading,
  } = useWeeklyReport();

  /* =========================
     Loading State
  ========================= */

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-5 w-36" />

        <Skeleton className="mt-8 h-52 w-full rounded-2xl sm:h-56" />
      </Card>
    );
  }

  return (
    <Card>
      {/* =========================
          Header
      ========================= */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        {/* Title */}

        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 sm:h-12 sm:w-12">
            <BarChart3
              size={21}
              className="text-green-600 sm:h-[22px] sm:w-[22px]"
            />
          </div>

          <div className="min-w-0">

            <h2 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
              Weekly Activity
            </h2>

            <p className="text-sm text-slate-500">
              Last 7 Days
            </p>

          </div>

        </div>

        {/* Focus */}

        <div className="w-full rounded-2xl bg-green-50 px-4 py-3 text-center sm:w-auto sm:min-w-[100px]">

          <p className="text-xs font-medium uppercase tracking-wide text-green-700">
            Focus
          </p>

          <h3 className="mt-1 text-xl font-bold text-green-700 sm:text-2xl">
            {(data?.focus_score ?? 0).toFixed(1)}%
          </h3>

        </div>

      </div>

      {/* =========================
          Legend
      ========================= */}

      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 sm:gap-6 sm:text-sm">

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 shrink-0 rounded-full bg-green-500" />
          <span>Active</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 shrink-0 rounded-full bg-orange-500" />
          <span>Idle</span>
        </div>

      </div>

      {/* =========================
          Chart
      ========================= */}

      <div className="w-full min-w-0 overflow-hidden">

        <ResponsiveContainer
          width="100%"
          height={220}
          minWidth={0}
        >
          <BarChart
            data={data?.daily_breakdown ?? []}
            margin={{
              top: 5,
              right: 5,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />

            <YAxis
              tickFormatter={formatMinutes}
              tick={{
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={false}
              width={38}
            />

            <Tooltip
              cursor={{
                fill: "#F8FAFC",
              }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E8F0",
                fontSize: 13,
              }}
              formatter={(value, name) => {
                const seconds =
                  typeof value === "number"
                    ? value
                    : 0;

                return [
                  formatMinutes(seconds),
                  name,
                ];
              }}
            />

            <Bar
              dataKey="active_time_seconds"
              name="Active Time"
              fill="#22C55E"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="idle_time_seconds"
              name="Idle Time"
              fill="#F97316"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* =========================
          Footer
      ========================= */}

      <div className="mt-5 flex items-start gap-2 border-t pt-4 text-xs text-slate-500 sm:text-sm">

        <TrendingUp
          size={16}
          className="mt-0.5 shrink-0"
        />

        <span>
          Your activity for the last 7 days
        </span>

      </div>

    </Card>
  );
};

export default WeeklyActivityChart;