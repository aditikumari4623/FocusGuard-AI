import {
  Building2,
  Plus,
} from "lucide-react";

import { useState } from "react";

import CreateOrganizationModal from "./CreateOrganizationModal";

import {
  useOrganizations,
} from "../../hooks/useOrganization";

const OrganizationHeader = () => {
  const [open, setOpen] =
    useState(false);

  const { data } =
    useOrganizations();

  const total =
    data?.length ?? 0;

  return (
    <>
      <div
        className="
          mb-6
          flex
          min-w-0
          flex-col
          gap-5

          sm:mb-8

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        {/* Title */}

        <div className="flex min-w-0 items-start gap-4">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-3xl
              bg-indigo-100

              dark:bg-indigo-950/50
            "
          >
            <Building2
              size={30}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>

          <div className="min-w-0">
            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900

                dark:text-white

                sm:text-3xl
                lg:text-4xl
              "
            >
              Organizations
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Manage organizations, assign sub-admins and monitor organization status.
            </p>

            <div
              className="
                mt-4
                inline-flex
                rounded-full
                bg-indigo-50
                px-4
                py-2
                text-sm
                font-semibold
                text-indigo-700

                dark:bg-indigo-950/50
                dark:text-indigo-300
              "
            >
              {total} Organization
              {total !== 1 && "s"}
            </div>
          </div>
        </div>

        {/* Create */}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-indigo-600
            px-6
            font-semibold
            text-white
            shadow-sm
            transition

            hover:bg-indigo-700
            hover:shadow-lg

            active:scale-[0.99]

            md:w-auto
          "
        >
          <Plus size={20} />

          Create Organization
        </button>
      </div>

      <CreateOrganizationModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default OrganizationHeader;