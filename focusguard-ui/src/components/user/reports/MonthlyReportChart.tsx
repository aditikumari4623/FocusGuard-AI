import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  useMonthlyReport,
} from "../../../hooks/useReports";

const MonthlyReportChart = () => {
  const {
    data,
    isLoading,
  } = useMonthlyReport();

  if (isLoading) {
    return (
      <div
        className="
          rounded-3xl
          border border-slate-200
          bg-white
          p-5
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20
          sm:p-6
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading monthly report...
        </p>
      </div>
    );
  }

  if (
    !data ||
    data.weekly_breakdown.length === 0
  ) {
    return (
      <div
        className="
          rounded-3xl
          border border-slate-200
          bg-white
          p-5
          dark:border-slate-700
          dark:bg-slate-900
          sm:p-6
        "
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No monthly data available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        min-w-0
        overflow-hidden
        rounded-3xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/20
        sm:p-6
      "
    >
      <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-white sm:mb-6 sm:text-xl">
        Monthly Activity
      </h2>

      <div className="h-[280px] w-full min-w-0 sm:h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data.weekly_breakdown}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="week"
              tick={{
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={false}
              width={40}
            />

            <Tooltip />

            <Legend
              wrapperStyle={{
                fontSize: "12px",
              }}
            />

            <Bar
              dataKey="active_time_seconds"
              name="Active"
              fill="#6366F1"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="idle_time_seconds"
              name="Idle"
              fill="#EF4444"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyReportChart;