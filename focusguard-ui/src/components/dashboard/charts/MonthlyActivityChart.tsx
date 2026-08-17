import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Activity,
  TrendingUp,
} from "lucide-react";

import Card from "../../common/Card";
import Skeleton from "../../common/Skeleton";

import {
  useMonthlyReport,
} from "../../../hooks/useReports";

const formatHours = (seconds: number) => {
  if (seconds < 3600) {
    return `${Math.round(seconds / 60)}m`;
  }

  return `${Math.round(seconds / 3600)}h`;
};

const MonthlyActivityChart = () => {
  const {
    data,
    isLoading,
  } = useMonthlyReport();

  /* =========================
     Loading State
  ========================= */

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-5 w-40" />

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

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 sm:h-12 sm:w-12">
            <Activity
              size={21}
              className="text-indigo-600 sm:h-[22px] sm:w-[22px]"
            />
          </div>

          <div className="min-w-0">

            <h2 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
              Monthly Activity
            </h2>

            <p className="text-sm text-slate-500">
              Last 30 Days
            </p>

          </div>

        </div>

        {/* Focus */}

        <div className="w-full rounded-2xl bg-indigo-50 px-4 py-3 text-center sm:w-auto sm:min-w-[100px]">

          <p className="text-xs font-medium uppercase tracking-wide text-indigo-700">
            Focus
          </p>

          <h3 className="mt-1 text-xl font-bold text-indigo-700 sm:text-2xl">
            {(data?.focus_score ?? 0).toFixed(1)}%
          </h3>

        </div>

      </div>

      {/* =========================
          Legend
      ========================= */}

      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 sm:gap-6 sm:text-sm">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 shrink-0 rounded-full bg-indigo-500" />

          <span>
            Active
          </span>

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 shrink-0 rounded-full bg-red-400" />

          <span>
            Idle
          </span>

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
          <AreaChart
            data={data?.weekly_breakdown ?? []}
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
              dataKey="week"
              tick={{
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />

            <YAxis
              tickFormatter={formatHours}
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
                  formatHours(seconds),
                  name,
                ];
              }}
            />

            <defs>

              <linearGradient
                id="personalActiveGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#6366F1"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#6366F1"
                  stopOpacity={0}
                />

              </linearGradient>

              <linearGradient
                id="personalIdleGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#F87171"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#F87171"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <Area
              type="monotone"
              dataKey="active_time_seconds"
              name="Active Time"
              stroke="#4F46E5"
              strokeWidth={3}
              fill="url(#personalActiveGradient)"
            />

            <Area
              type="monotone"
              dataKey="idle_time_seconds"
              name="Idle Time"
              stroke="#EF4444"
              strokeWidth={3}
              fill="url(#personalIdleGradient)"
            />

          </AreaChart>
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
          Your activity for the last 30 days
        </span>

      </div>

    </Card>
  );
};

export default MonthlyActivityChart;