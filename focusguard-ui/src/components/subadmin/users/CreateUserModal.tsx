import { useState } from "react";

import toast from "react-hot-toast";

import {
  useCreateOrganizationUser,
} from "../../../hooks/useOrganization";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateUserModal = ({
  open,
  onClose,
}: Props) => {
  const createUser =
    useCreateOrganizationUser();

  const [form, setForm] =
    useState({
      full_name: "",
      email: "",
      password: "",
      age: "",
      occupation: "",
    });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.full_name ||
      !form.email ||
      !form.password
    ) {
      toast.error(
        "Please fill all required fields."
      );
      return;
    }

    try {
      await createUser.mutateAsync({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        age: Number(form.age),
        occupation: form.occupation,
      });

      toast.success(
        "User created successfully."
      );

      setForm({
        full_name: "",
        email: "",
        password: "",
        age: "",
        occupation: "",
      });

      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ??
          "Unable to create user."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 p-3 sm:p-5">

      <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8">

        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Create Organization User
        </h2>

        <div className="mt-6 space-y-4 sm:mt-8">

          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:text-base"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:text-base"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:text-base"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:text-base"
          />

          <input
            name="occupation"
            placeholder="Occupation"
            value={form.occupation}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:text-base"
          />

        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:justify-end sm:gap-4">

          <button
            onClick={onClose}
            className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={
              createUser.isPending
            }
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
          >
            {createUser.isPending
              ? "Creating..."
              : "Create User"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateUserModal;