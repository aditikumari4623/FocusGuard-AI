import {
  Activity,
  Clock3,
  Timer,
} from "lucide-react";

import Card from "../common/Card";

import { useMonthlyReport } from "../../hooks/useReports";

const MonthlyReportCard = () => {
  const { data, isLoading } =
    useMonthlyReport();

  if (isLoading) {
    return (
      <Card>
        <p className="text-slate-600 dark:text-slate-300">
          Loading Monthly Report...
        </p>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <p className="text-slate-600 dark:text-slate-300">
          No monthly report available.
        </p>
      </Card>
    );
  }

  return (
    <Card
      className="
        border
        border-slate-200
        shadow-sm
        dark:border-slate-700
      "
    >
      <div className="mb-6">
        <h2
          className="
            text-xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Monthly Report
        </h2>

        <p
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Last 30 days summary
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
        "
      >
        {/* Focus */}

        <div
          className="
            rounded-2xl
            bg-indigo-50
            p-4
            dark:bg-indigo-950/40
          "
        >
          <Activity
            className="text-indigo-600 dark:text-indigo-400"
            size={22}
          />

          <p
            className="
              mt-3
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Focus Score
          </p>

          <h3
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {data.focus_score.toFixed(2)}%
          </h3>
        </div>

        {/* Active */}

        <div
          className="
            rounded-2xl
            bg-green-50
            p-4
            dark:bg-green-950/40
          "
        >
          <Clock3
            className="text-green-600 dark:text-green-400"
            size={22}
          />

          <p
            className="
              mt-3
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Active Time
          </p>

          <h3
            className="
              text-xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {data.active_time}
          </h3>
        </div>

        {/* Idle */}

        <div
          className="
            rounded-2xl
            bg-orange-50
            p-4
            dark:bg-orange-950/40
          "
        >
          <Clock3
            className="text-orange-500 dark:text-orange-400"
            size={22}
          />

          <p
            className="
              mt-3
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Idle Time
          </p>

          <h3
            className="
              text-xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {data.idle_time}
          </h3>
        </div>

        {/* Total */}

        <div
          className="
            rounded-2xl
            bg-violet-50
            p-4
            dark:bg-violet-950/40
          "
        >
          <Timer
            className="text-violet-600 dark:text-violet-400"
            size={22}
          />

          <p
            className="
              mt-3
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Total Time
          </p>

          <h3
            className="
              text-xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {data.total_time}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyReportCard;