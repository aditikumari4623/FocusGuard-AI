import AppLayout from "../../../layouts/AppLayout";

import OrganizationHeader from "../../../components/organization/OrganizationHeader";
import OrganizationStats from "../../../components/organization/OrganizationStats";
import OrganizationTabs from "../../../components/organization/OrganizationTabs";

interface Props {
  tab:
    | "organizations"
    | "users"
    | "requests";
}

const OrganizationPage = ({
  tab,
}: Props) => {
  return (
    <AppLayout>
      <div className="min-w-0">
        <OrganizationHeader />

        <div className="mt-6">
          <OrganizationStats />
        </div>

        <div className="mt-6 sm:mt-8">
          <OrganizationTabs
            tab={tab}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default OrganizationPage;