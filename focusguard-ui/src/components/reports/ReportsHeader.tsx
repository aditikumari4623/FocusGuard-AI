import { FileBarChart2 } from "lucide-react";

const ReportsHeader = () => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="min-w-0">
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Reports
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Weekly and monthly productivity
          reports.
        </p>
      </div>

      <div
        className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          self-start
          rounded-2xl
          bg-indigo-100
          dark:bg-indigo-950/50
          sm:self-center
        "
      >
        <FileBarChart2
          size={28}
          className="text-indigo-600 dark:text-indigo-400"
        />
      </div>
    </div>
  );
};

export default ReportsHeader;