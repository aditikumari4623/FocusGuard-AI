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

import { useTheme } from "next-themes";

import Card from "../../common/Card";
import Skeleton from "../../common/Skeleton";

import {
  useRoleMonthlyReport,
} from "../../../hooks/useReports";

const formatMinutes = (seconds: number) => {
  const mins = Math.round(seconds / 60);

  return `${mins}m`;
};

const SuperAdminMonthlyActivityChart = () => {
  const {
    data,
    isLoading,
    isError,
  } = useRoleMonthlyReport();

  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const chartColors = {
    grid: isDark ? "#475569" : "#E2E8F0",
    axis: isDark ? "#94A3B8" : "#64748B",
    cursor: isDark ? "#334155" : "#E2E8F0",
    tooltipBg: isDark ? "#0F172A" : "#FFFFFF",
    tooltipBorder: isDark ? "#475569" : "#CBD5E1",
    tooltipText: isDark ? "#F8FAFC" : "#0F172A",
    tooltipItem: isDark ? "#E2E8F0" : "#334155",
  };

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-5 w-40" />

        <Skeleton className="mt-8 h-56 w-full rounded-2xl" />
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Unable to load overall monthly activity.
        </p>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 overflow-hidden">

      {/* Header */}

      <div className="mb-5 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex min-w-0 items-start gap-3">

          <div className="shrink-0 rounded-xl bg-indigo-100 p-3 dark:bg-indigo-950/50">

            <Activity
              size={22}
              className="text-indigo-600 dark:text-indigo-400"
            />

          </div>

          <div className="min-w-0">

            <h2
              className="
                text-lg
                font-semibold
                leading-tight
                text-slate-900
                dark:text-white
                sm:text-xl
              "
            >
              Overall Monthly Activity
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Last 30 Days · All Organization Users
            </p>

          </div>

        </div>

        {/* Focus */}

        <div
          className="
            w-fit
            shrink-0
            rounded-2xl
            bg-indigo-50
            px-4
            py-3
            text-left
            dark:bg-indigo-950/40
            sm:text-center
          "
        >

          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-indigo-700
              dark:text-indigo-400
            "
          >
            Focus
          </p>

          <h3
            className="
              mt-1
              text-2xl
              font-bold
              text-indigo-700
              dark:text-indigo-400
            "
          >
            {data.focus_score.toFixed(1)}%
          </h3>

        </div>

      </div>

      {/* Legend */}

      <div
        className="
          mb-5
          flex
          flex-wrap
          items-center
          gap-x-6
          gap-y-2
          text-sm
          text-slate-700
          dark:text-slate-300
        "
      >

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 shrink-0 rounded-full bg-indigo-500" />

          Active

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 shrink-0 rounded-full bg-red-400" />

          Idle

        </div>

      </div>

      {/* Chart */}

      <div className="h-[220px] w-full min-w-0">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data.weekly_breakdown}
            margin={{
              top: 5,
              right: 5,
              left: -10,
              bottom: 5,
            }}
          >

            <CartesianGrid
              stroke={chartColors.grid}
              strokeOpacity={isDark ? 0.35 : 0.8}
              vertical={false}
            />

            <XAxis
              dataKey="week"
              tick={{
                fontSize: 12,
                fill: chartColors.axis,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickFormatter={formatMinutes}
              tick={{
                fontSize: 12,
                fill: chartColors.axis,
              }}
              tickLine={false}
              axisLine={false}
              width={42}
            />

            <Tooltip
              cursor={{
                fill: chartColors.cursor,
                fillOpacity: isDark ? 0.25 : 0.35,
              }}
              contentStyle={{
                borderRadius: 12,
                border: `1px solid ${chartColors.tooltipBorder}`,
                backgroundColor: chartColors.tooltipBg,
                color: chartColors.tooltipText,
                fontSize: 13,
              }}
              labelStyle={{
                color: chartColors.tooltipText,
                fontWeight: 600,
              }}
              itemStyle={{
                color: chartColors.tooltipItem,
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

            <defs>

              <linearGradient
                id="superAdminActiveGradient"
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
                id="superAdminIdleGradient"
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
              fill="url(#superAdminActiveGradient)"
            />

            <Area
              type="monotone"
              dataKey="idle_time_seconds"
              name="Idle Time"
              stroke="#EF4444"
              strokeWidth={3}
              fill="url(#superAdminIdleGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div
        className="
          mt-5
          flex
          items-start
          gap-2
          border-t
          border-slate-200
          pt-4
          text-sm
          leading-5
          text-slate-500
          dark:border-slate-700
          dark:text-slate-400
        "
      >

        <TrendingUp
          size={16}
          className="mt-0.5 shrink-0"
        />

        <span>
          Overall activity of all organization users
          for the last 30 days
        </span>

      </div>

    </Card>
  );
};

export default SuperAdminMonthlyActivityChart;