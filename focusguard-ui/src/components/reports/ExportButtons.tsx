import { Download } from "lucide-react";

import {
  useWeeklyReport,
  useMonthlyReport,
} from "../../hooks/useReports";

import { useDashboard } from "../../hooks/useDashboard";

import { exportReportPDF } from "../../utils/pdf";

const ExportButtons = () => {
  const { data: weekly } =
    useWeeklyReport();

  const { data: monthly } =
    useMonthlyReport();

  const { data: dashboard } =
    useDashboard();

  const downloadJSON = (
    filename: string,
    data: unknown
  ) => {
    if (!data) return;

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const downloadCSV = (
    filename: string,
    report: any
  ) => {
    if (!report) return;

    let csv = "Field,Value\n";

    csv += `Report Type,${report.report_type}\n`;
    csv += `Start Date,${report.start_date}\n`;
    csv += `End Date,${report.end_date}\n`;
    csv += `Focus Score,${report.focus_score}\n`;
    csv += `Active Time,${report.active_time}\n`;
    csv += `Idle Time,${report.idle_time}\n`;
    csv += `Total Time,${report.total_time}\n`;

    csv += "\n";

    if (report.daily_breakdown) {
      csv += "Day,Active Time,Idle Time\n";

      report.daily_breakdown.forEach(
        (item: any) => {
          csv += `${item.day},${item.active_time},${item.idle_time}\n`;
        }
      );
    }

    if (report.weekly_breakdown) {
      csv += "Week,Active Time,Idle Time\n";

      report.weekly_breakdown.forEach(
        (item: any) => {
          csv += `${item.week},${item.active_time},${item.idle_time}\n`;
        }
      );
    }

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

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

        sm:p-6
      "
    >
      <h2
        className="
          text-xl
          font-bold
          text-slate-900
          dark:text-white
        "
      >
        Export Reports
      </h2>

      <p
        className="
          mt-1
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        Download your productivity reports in
        different formats.
      </p>

      <div
        className="
          mt-6
          flex
          flex-wrap
          gap-3
          sm:gap-4
        "
      >
        {/* Weekly JSON */}

        <button
          type="button"
          onClick={() =>
            downloadJSON(
              "weekly-report.json",
              weekly
            )
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-indigo-600
            px-4
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-indigo-700
            sm:px-5
          "
        >
          <Download size={18} />
          Weekly JSON
        </button>

        {/* Monthly JSON */}

        <button
          type="button"
          onClick={() =>
            downloadJSON(
              "monthly-report.json",
              monthly
            )
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-4
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-violet-700
            sm:px-5
          "
        >
          <Download size={18} />
          Monthly JSON
        </button>

        {/* Weekly CSV */}

        <button
          type="button"
          onClick={() =>
            downloadCSV(
              "weekly-report.csv",
              weekly
            )
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-slate-200
            dark:hover:bg-slate-700

            sm:px-5
          "
        >
          <Download size={18} />
          Weekly CSV
        </button>

        {/* Monthly CSV */}

        <button
          type="button"
          onClick={() =>
            downloadCSV(
              "monthly-report.csv",
              monthly
            )
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-slate-200
            dark:hover:bg-slate-700

            sm:px-5
          "
        >
          <Download size={18} />
          Monthly CSV
        </button>

        {/* Weekly PDF */}

        <button
          type="button"
          onClick={() => {
            if (
              weekly &&
              dashboard?.user
            ) {
              exportReportPDF(
                weekly,
                dashboard.user
              );
            }
          }}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-600
            px-4
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-red-700
            sm:px-5
          "
        >
          <Download size={18} />
          Weekly PDF
        </button>

        {/* Monthly PDF */}

        <button
          type="button"
          onClick={() => {
            if (
              monthly &&
              dashboard?.user
            ) {
              exportReportPDF(
                monthly,
                dashboard.user
              );
            }
          }}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-rose-600
            px-4
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-rose-700
            sm:px-5
          "
        >
          <Download size={18} />
          Monthly PDF
        </button>
      </div>
    </div>
  );
};

export default ExportButtons;