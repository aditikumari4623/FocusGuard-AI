import AppLayout from "../../../layouts/AppLayout";

import ReportsHeader from "../../../components/reports/ReportsHeader";
import WeeklyReportCard from "../../../components/reports/WeeklyReportCard";
import MonthlyReportCard from "../../../components/reports/MonthlyReportCard";
import ExportButtons from "../../../components/reports/ExportButtons";

import WeeklyActivityChart from "../../../components/dashboard/charts/WeeklyActivityChart";
import MonthlyActivityChart from "../../../components/dashboard/charts/MonthlyActivityChart";

const ReportsPage = () => {
  return (
    <AppLayout>

      <ReportsHeader />

      <div className="mt-6 grid gap-6 xl:grid-cols-2">

        <WeeklyReportCard />

        <MonthlyReportCard />

      </div>

      <div className="mt-6">
        <WeeklyActivityChart />
      </div>

      <div className="mt-6">
        <MonthlyActivityChart />
      </div>

      <div className="mt-6">
        <ExportButtons />
      </div>

    </AppLayout>
  );
};

export default ReportsPage;