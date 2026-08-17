import {
  Building2,
  Users,
  FileText,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import OrganizationGrid from "./OrganizationGrid";
import UsersTable from "../admin/UsersTable";
import DeactivationRequests from "./DeactivationRequests";

interface Props {
  tab:
    | "organizations"
    | "users"
    | "requests";
}

const tabs = [
  {
    key: "organizations",
    label: "Organizations",
    icon: Building2,
  },
  {
    key: "users",
    label: "Users",
    icon: Users,
  },
  {
    key: "requests",
    label: "Requests",
    icon: FileText,
  },
] as const;

const OrganizationTabs = ({
  tab,
}: Props) => {
  return (
    <div>
      {/* Tabs */}

      <div
        className="
          mb-6
          overflow-x-auto
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-2
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20

          sm:mb-8
          sm:p-3
        "
      >
        <div className="flex min-w-max gap-2">
          {tabs.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.key}
                to={`/superadmin/organization/${item.key}`}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-200

                  sm:px-6

                  ${
                    tab === item.key
                      ? `
                        bg-indigo-600
                        text-white
                        shadow-md
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900

                        dark:text-slate-400
                        dark:hover:bg-slate-800
                        dark:hover:text-white
                      `
                  }
                `}
              >
                <Icon size={18} />

                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Content */}

      <div>
        {tab === "organizations" && (
          <OrganizationGrid />
        )}

        {tab === "users" && (
          <UsersTable />
        )}

        {tab === "requests" && (
          <DeactivationRequests />
        )}
      </div>
    </div>
  );
};

export default OrganizationTabs;