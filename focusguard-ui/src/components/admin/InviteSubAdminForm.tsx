import { useState } from "react";

interface Props {
  loading: boolean;
  onSubmit: (
    fullName: string,
    email: string
  ) => void;
}

const InviteSubAdminForm = ({
  loading,
  onSubmit,
}: Props) => {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !email.trim()
    ) {
      return;
    }

    onSubmit(fullName, email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          className="
            mb-2
            block
            font-medium
            text-slate-700
            dark:text-slate-200
          "
        >
          Full Name
        </label>

        <input
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          placeholder="John Doe"
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-slate-900
            outline-none
            transition

            placeholder:text-slate-400

            focus:border-indigo-500

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-indigo-400
          "
        />
      </div>

      <div>
        <label
          className="
            mb-2
            block
            font-medium
            text-slate-700
            dark:text-slate-200
          "
        >
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="john@gmail.com"
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-slate-900
            outline-none
            transition

            placeholder:text-slate-400

            focus:border-indigo-500

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-indigo-400
          "
        />
      </div>

      <button
        disabled={loading}
        className="
          w-full
          rounded-2xl
          bg-indigo-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-indigo-700
          disabled:opacity-50
          dark:bg-indigo-500
          dark:hover:bg-indigo-600
        "
      >
        {loading
          ? "Sending..."
          : "Send Invitation"}
      </button>
    </form>
  );
};

export default InviteSubAdminForm;