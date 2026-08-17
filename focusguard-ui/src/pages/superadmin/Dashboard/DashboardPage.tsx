import AppLayout from "../../../layouts/AppLayout";

import SuperAdminStatsGrid from "../../../components/superadmin/dashboard/SuperAdminStatsGrid";

import PlannerCard from "../../../components/dashboard/PlannerCard";

import AIRecommendationCard from "../../../components/dashboard/AIRecommendationCard";

import WebsiteCard from "../../../components/dashboard/WebsiteCard";

import SuperAdminWeeklyActivityChart from "../../../components/superadmin/dashboard/SuperAdminWeeklyActivityChart";

import SuperAdminMonthlyActivityChart from "../../../components/superadmin/dashboard/SuperAdminMonthlyActivityChart";

import OrganizationAIRecommendationCard from "../../../components/superadmin/OrganizationAIRecommendationCard";

const DashboardPage = () => {
  return (
    <AppLayout>

      <div className="w-full min-w-0 overflow-x-hidden">

        {/* ================================
            Super Admin Statistics
            ================================ */}

        <div className="w-full min-w-0">
          <SuperAdminStatsGrid />
        </div>

        {/* ================================
            Organization Activity
            ================================ */}

        <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-2">

          <div className="min-w-0">
            <SuperAdminWeeklyActivityChart />
          </div>

          <div className="min-w-0">
            <SuperAdminMonthlyActivityChart />
          </div>

        </div>

        {/* ================================
            Planner + Personal AI
            ================================ */}

        <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-2">

          <div className="min-w-0">
            <PlannerCard />
          </div>

          <div className="min-w-0">
            <AIRecommendationCard />
          </div>

        </div>

        {/* ================================
            Organization AI Insights
            ================================ */}

        <div className="mt-6 w-full min-w-0">
          <OrganizationAIRecommendationCard />
        </div>

        {/* ================================
            Organization Websites
            ================================ */}

        <div className="mt-6 w-full min-w-0">
          <WebsiteCard />
        </div>

      </div>

    </AppLayout>
  );
};

export default DashboardPage;