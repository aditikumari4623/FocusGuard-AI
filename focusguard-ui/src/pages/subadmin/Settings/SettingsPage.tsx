import {
  User,
  Mail,
  Briefcase,
  Calendar,
  ShieldCheck,
} from "lucide-react";

import AppLayout from "../../../layouts/AppLayout";
import Card from "../../../components/common/Card";
import Skeleton from "../../../components/common/Skeleton";

import { useCurrentUser } from "../../../hooks/useAuth";

const SettingsPage = () => {
  const {
    data,
    isLoading,
  } = useCurrentUser();

  if (isLoading) {
    return (
      <AppLayout>

        <div className="mb-6 sm:mb-8">

          <Skeleton className="h-8 w-40" />

          <Skeleton className="mt-2 h-4 w-full max-w-xs sm:w-72" />

        </div>


        <div className="grid w-full min-w-0 gap-5 sm:gap-6 xl:grid-cols-3">

          <Card className="min-w-0 xl:col-span-2">

            <Skeleton className="h-6 w-40" />

            <Skeleton className="mt-6 h-12 w-full" />

            <Skeleton className="mt-4 h-12 w-full" />

            <Skeleton className="mt-4 h-12 w-full" />

          </Card>


          <Card className="min-w-0">

            <Skeleton className="h-6 w-32" />

            <Skeleton className="mt-6 h-20 w-20 rounded-full" />

            <Skeleton className="mt-4 h-4 w-32" />

          </Card>

        </div>

      </AppLayout>
    );
  }

  return (
    <AppLayout>

      {/* Header */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account information
        </p>

      </div>


      {/* Main Settings */}

      <div className="grid w-full min-w-0 gap-5 sm:gap-6 xl:grid-cols-3">


        {/* Profile Information */}

        <Card className="min-w-0 xl:col-span-2">

          <div className="mb-6 flex items-start gap-3">

            <div className="shrink-0 rounded-xl bg-indigo-100 p-3">

              <User
                size={22}
                className="text-indigo-600"
              />

            </div>

            <div className="min-w-0">

              <h2 className="text-lg font-semibold text-slate-900">
                Profile Information
              </h2>

              <p className="text-sm text-slate-500">
                Your account details
              </p>

            </div>

          </div>


          <div className="grid min-w-0 gap-4 sm:gap-5 md:grid-cols-2">


            {/* Full Name */}

            <div className="min-w-0 rounded-2xl border border-slate-200 p-4">

              <div className="flex items-start gap-3">

                <User
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <div className="min-w-0">

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Full Name
                  </p>

                  <p className="mt-1 break-words font-medium text-slate-800">
                    {data?.full_name || "Not provided"}
                  </p>

                </div>

              </div>

            </div>


            {/* Email */}

            <div className="min-w-0 rounded-2xl border border-slate-200 p-4">

              <div className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <div className="min-w-0">

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 break-all font-medium text-slate-800">
                    {data?.email || "Not provided"}
                  </p>

                </div>

              </div>

            </div>


            {/* Age */}

            <div className="min-w-0 rounded-2xl border border-slate-200 p-4">

              <div className="flex items-start gap-3">

                <Calendar
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <div className="min-w-0">

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Age
                  </p>

                  <p className="mt-1 font-medium text-slate-800">
                    {data?.age ?? "Not provided"}
                  </p>

                </div>

              </div>

            </div>


            {/* Occupation */}

            <div className="min-w-0 rounded-2xl border border-slate-200 p-4">

              <div className="flex items-start gap-3">

                <Briefcase
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <div className="min-w-0">

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Occupation
                  </p>

                  <p className="mt-1 break-words font-medium text-slate-800">
                    {data?.occupation || "Not provided"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </Card>


        {/* Account Role */}

        <Card className="min-w-0">

          <div className="mb-6 flex items-start gap-3">

            <div className="shrink-0 rounded-xl bg-green-100 p-3">

              <ShieldCheck
                size={22}
                className="text-green-600"
              />

            </div>

            <div className="min-w-0">

              <h2 className="text-lg font-semibold text-slate-900">
                Account
              </h2>

              <p className="text-sm text-slate-500">
                Your access level
              </p>

            </div>

          </div>


          <div className="rounded-2xl bg-green-50 p-5">

            <p className="text-xs font-medium uppercase tracking-wide text-green-700">
              Role
            </p>

            <p className="mt-2 break-words text-xl font-bold text-green-800">
              {data?.role || "SUB_ADMIN"}
            </p>

          </div>


          <div className="mt-5 rounded-2xl border border-slate-200 p-4">

            <p className="text-sm leading-6 text-slate-600">
              You can manage and monitor users belonging
              to your organization while accessing your
              own productivity analytics.
            </p>

          </div>

        </Card>

      </div>

    </AppLayout>
  );
};

export default SettingsPage;