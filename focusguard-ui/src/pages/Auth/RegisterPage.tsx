import { useState } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  Calendar,
  UserPlus,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  useRegister,
} from "../../hooks/useAuth";


const RegisterPage = () => {

  const navigate = useNavigate();

  const registerMutation =
    useRegister();


  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [age, setAge] =
    useState("");

  const [occupation, setOccupation] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const handleSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();


    /* ----------------------------- */
    /* Basic Validation */
    /* ----------------------------- */

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !age ||
      !occupation.trim()
    ) {

      toast.error(
        "Please fill in all fields."
      );

      return;
    }


    /* ----------------------------- */
    /* Password Validation */
    /* ----------------------------- */

    if (password.length < 6) {

      toast.error(
        "Password must be at least 6 characters."
      );

      return;
    }


    if (password !== confirmPassword) {

      toast.error(
        "Passwords do not match."
      );

      return;
    }


    /* ----------------------------- */
    /* Age Validation */
    /* ----------------------------- */

    const numericAge =
      Number(age);


    if (
      !Number.isInteger(numericAge) ||
      numericAge <= 0 ||
      numericAge > 120
    ) {

      toast.error(
        "Please enter a valid age."
      );

      return;
    }


    /* ----------------------------- */
    /* Register */
    /* ----------------------------- */

    try {

      const response =
        await registerMutation.mutateAsync({

          full_name:
            fullName.trim(),

          email:
            email.trim(),

          password,

          age:
            numericAge,

          occupation:
            occupation.trim(),

        });


      toast.success(
        response.message ??
        "Registration successful."
      );


      setTimeout(() => {

        navigate("/login");

      }, 800);


    } catch (error: any) {

      const errorMessage =
        error?.response?.data?.detail ??
        "Registration failed. Please try again.";

      toast.error(
        errorMessage
      );

    }

  };


  return (

    <div className="min-h-screen bg-slate-50">

      <div className="flex min-h-screen">


        {/* ================================= */}
        {/* Left Branding Section */}
        {/* ================================= */}

        <div className="hidden w-1/2 bg-indigo-600 lg:flex">

          <div className="flex w-full flex-col justify-center px-16 text-white">

            <div className="mb-8 flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

                <UserPlus
                  size={30}
                />

              </div>

              <h1 className="text-3xl font-bold">
                FocusGuard AI
              </h1>

            </div>


            <h2 className="max-w-xl text-5xl font-bold leading-tight">

              Build a more focused and productive organization.

            </h2>


            <p className="mt-6 max-w-lg text-lg leading-8 text-indigo-100">

              Create the first Super Admin account
              to start managing organizations,
              users, productivity analytics and
              AI-powered insights.

            </p>


            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">

                <div className="h-2 w-2 rounded-full bg-white" />

                Organization management

              </div>


              <div className="flex items-center gap-3">

                <div className="h-2 w-2 rounded-full bg-white" />

                Productivity analytics

              </div>


              <div className="flex items-center gap-3">

                <div className="h-2 w-2 rounded-full bg-white" />

                AI-powered recommendations

              </div>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* Registration Form */}
        {/* ================================= */}

        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">

          <div className="w-full max-w-lg">


            {/* Header */}

            <div className="mb-8">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">

                <UserPlus
                  size={24}
                  className="text-indigo-600"
                />

              </div>


              <h1 className="text-3xl font-bold text-slate-900">

                Create Super Admin

              </h1>


              <p className="mt-2 text-slate-500">

                Create the initial administrator account
                for FocusGuard AI.

              </p>

            </div>


            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >


              {/* Full Name */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">

                  Full Name

                </label>


                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />


                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(
                        event.target.value
                      )
                    }
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                </div>

              </div>


              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">

                  Email

                </label>


                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />


                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                </div>

              </div>


              {/* Age + Occupation */}

              <div className="grid gap-5 sm:grid-cols-2">


                {/* Age */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">

                    Age

                  </label>


                  <div className="relative">

                    <Calendar
                      size={18}
                      className="absolute left-4 top-3.5 text-slate-400"
                    />


                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={age}
                      onChange={(event) =>
                        setAge(
                          event.target.value
                        )
                      }
                      placeholder="Age"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>


                {/* Occupation */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">

                    Occupation

                  </label>


                  <div className="relative">

                    <Briefcase
                      size={18}
                      className="absolute left-4 top-3.5 text-slate-400"
                    />


                    <input
                      type="text"
                      value={occupation}
                      onChange={(event) =>
                        setOccupation(
                          event.target.value
                        )
                      }
                      placeholder="Occupation"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>

              </div>


              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">

                  Password

                </label>


                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />


                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Create a password"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-3 text-slate-400 hover:text-slate-600"
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {/* Confirm Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">

                  Confirm Password

                </label>


                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />


                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Confirm your password"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-3 text-slate-400 hover:text-slate-600"
                  >

                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {/* Submit */}

              <button
                type="submit"
                disabled={
                  registerMutation.isPending
                }
                className="flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >

                {registerMutation.isPending
                  ? "Creating Account..."
                  : "Create Super Admin Account"}

              </button>


            </form>


            {/* Login */}

            <p className="mt-6 text-center text-sm text-slate-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Login
              </Link>

            </p>


            {/* Notice */}

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">

              <p className="text-center text-xs leading-5 text-amber-700">

                Registration is available only for the
                initial Super Admin account. Once an
                administrator exists, new users must be
                created through the administrator.

              </p>

            </div>


          </div>

        </div>

      </div>

    </div>
  );
};


export default RegisterPage;