import { useState } from "react";

import {
  Search,
  Activity,
} from "lucide-react";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import {
  useOrganizationUsers,
  useDeactivateOrganizationUser,
} from "../../../hooks/useOrganization";

import UserStatusBadge from "./UserStatusBadge";

const UsersTable = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
  } = useOrganizationUsers();

  const deactivateMutation =
    useDeactivateOrganizationUser();

  const [search, setSearch] =
    useState("");

  if (isLoading) {
    return (
      <div className="p-5 sm:p-6">
        <p className="text-sm text-slate-500 sm:text-base">
          Loading users...
        </p>
      </div>
    );
  }

  const filteredUsers =
    data?.filter((user) => {
      const value =
        search.toLowerCase();

      return (
        user.full_name
          .toLowerCase()
          .includes(value) ||
        user.email
          .toLowerCase()
          .includes(value)
      );
    }) ?? [];

  return (
    <div className="min-w-0">

      {/* Search */}

      <div className="border-b border-slate-200 p-4 sm:p-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 sm:left-4"
          />

          <input
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="h-11 w-full rounded-2xl border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:h-12 sm:pl-12 sm:text-base"
          />

        </div>

      </div>

      {/* Users */}

      {filteredUsers.length === 0 ? (
        <div className="p-8 text-center text-sm text-slate-500 sm:p-10 sm:text-base">
          No users found.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="border-b bg-slate-50">

              <tr>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold sm:px-6">
                  Name
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold sm:px-6">
                  Email
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold sm:px-6">
                  Role
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold sm:px-6">
                  Status
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold sm:px-6">
                  Activity
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold sm:px-6">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map(
                (user) => (
                  <tr
                    key={user.id}
                    className="border-b transition hover:bg-slate-50"
                  >

                    <td className="max-w-[180px] truncate px-4 py-4 text-sm font-medium sm:px-6 sm:text-base">
                      {user.full_name}
                    </td>

                    <td className="max-w-[240px] truncate px-4 py-4 text-sm sm:px-6 sm:text-base">
                      {user.email}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm sm:px-6 sm:text-base">
                      {user.role}
                    </td>

                    <td className="px-4 py-4 sm:px-6">

                      <UserStatusBadge
                        active={
                          user.is_active
                        }
                      />

                    </td>

                    {/* View Activity */}

                    <td className="px-4 py-4 sm:px-6">

                      <button
                        onClick={() =>
                          navigate(
                            `/subadmin/users/${user.id}/activity`
                          )
                        }
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-700 sm:px-4 sm:text-sm"
                      >
                        <Activity
                          size={16}
                        />

                        View Activity
                      </button>

                    </td>

                    {/* Deactivate */}

                    <td className="px-4 py-4 sm:px-6">

                      {user.is_active ? (
                        <button
                          onClick={async () => {
                            const ok =
                              window.confirm(
                                `Deactivate ${user.full_name}?`
                              );

                            if (!ok)
                              return;

                            try {
                              await deactivateMutation.mutateAsync(
                                user.id
                              );

                              toast.success(
                                "User deactivated."
                              );
                            } catch (
                              error: any
                            ) {
                              toast.error(
                                error
                                  ?.response
                                  ?.data
                                  ?.detail ??
                                  "Unable to deactivate."
                              );
                            }
                          }}
                          className="whitespace-nowrap rounded-xl bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700 sm:px-4 sm:text-sm"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <span className="text-slate-400">
                          —
                        </span>
                      )}

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default UsersTable;