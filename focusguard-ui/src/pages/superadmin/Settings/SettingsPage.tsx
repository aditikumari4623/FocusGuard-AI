import AppLayout from "../../../layouts/AppLayout";

import {
  User,
  Mail,
  Shield,
  LogOut,
  Settings,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../api/auth.api";

const SettingsPage = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />
        </div>
      </AppLayout>
    );
  }

  if (isError || !user) {
    return (
      <AppLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-700">
            Unable to load account settings.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-3xl bg-indigo-100 p-4">
          <Settings
            size={32}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your Super Admin account and security settings.
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-indigo-100 p-3">
            <User
              size={22}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Profile Information
            </h2>

            <p className="text-sm text-slate-500">
              Your FocusGuard account information
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <User
                size={18}
                className="text-slate-400"
              />

              <span className="font-medium text-slate-800">
                {user.full_name || "Not available"}
              </span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Mail
                size={18}
                className="text-slate-400"
              />

              <span className="font-medium text-slate-800">
                {user.email}
              </span>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Account Role
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Shield
                size={18}
                className="text-indigo-500"
              />

              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Account Security
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your current session and account access.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-800">
              Sign out of FocusGuard
            </p>

            <p className="mt-1 text-sm text-slate-500">
              You will need to log in again to access your account.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;