import { useState } from "react";
import type { FormEvent } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import AuthHeader from "./AuthHeader";
import PasswordField from "./PasswordField";

import {
  loginUser,
  getCurrentUser,
} from "../../api/auth.api";

import { useAuth } from "../../context/AuthContext";

import {
  setStorageItem,
} from "../../utils/extensionStorage";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: async (data) => {
      try {
        // ----------------------------------
        // Save Tokens
        // ----------------------------------

        await setStorageItem(
          "access_token",
          data.access_token
        );

        await setStorageItem(
          "refresh_token",
          data.refresh_token
        );

        // ----------------------------------
        // Get Logged In User
        // ----------------------------------

        const user =
          await getCurrentUser();

        // ----------------------------------
        // Save User In Context
        // ----------------------------------

        login(user);

        // ----------------------------------
        // Save User
        // ----------------------------------

        await setStorageItem(
          "user",
          JSON.stringify(user)
        );

        // ----------------------------------
        // Redirect According To Role
        // ----------------------------------

        switch (user.role) {
          case "SUPER_ADMIN":
            navigate(
              "/superadmin/dashboard",
              {
                replace: true,
              }
            );
            break;

          case "SUB_ADMIN":
            navigate(
              "/subadmin/dashboard",
              {
                replace: true,
              }
            );
            break;

          case "USER":
            navigate(
              "/user/dashboard",
              {
                replace: true,
              }
            );
            break;

          default:
            navigate("/", {
              replace: true,
            });
        }
      } catch (error) {
        console.error(error);

        alert(
          "Unable to fetch user details."
        );
      }
    },

    onError: (error: any) => {
      console.error(error);

      alert(
        error?.response?.data?.detail ??
          "Invalid email or password."
      );
    },
  });

  const handleLogin = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-lg
        transition-colors
        duration-300
        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-slate-950/40
      "
    >

      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to your FocusGuard account"
      />

      <form
        onSubmit={handleLogin}
        className="mt-8 space-y-6"
      >

        {/* Email */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Email
          </label>

          <input
            type="email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-4
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-100
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-100
              dark:placeholder:text-slate-500
              dark:focus:border-indigo-400
              dark:focus:ring-indigo-500/20
            "
          />

        </div>

        {/* Password */}

        <PasswordField
          value={password}
          onChange={setPassword}
        />

        {/* Forgot Password */}

        <div className="flex justify-end">

          <Link
            to="/forgot-password"
            className="
              text-sm
              text-indigo-600
              transition
              hover:underline
              dark:text-indigo-400
              dark:hover:text-indigo-300
            "
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login */}

        <button
          type="submit"
          disabled={
            loginMutation.isPending
          }
          className="
            h-12
            w-full
            rounded-2xl
            bg-indigo-600
            font-semibold
            text-white
            transition
            hover:bg-indigo-700
            disabled:cursor-not-allowed
            disabled:bg-indigo-400
            dark:bg-indigo-500
            dark:hover:bg-indigo-600
          "
        >
          {loginMutation.isPending
            ? "Signing In..."
            : "Login"}
        </button>

        {/* Register */}

        <p
          className="
            text-center
            text-sm
            text-slate-600
            dark:text-slate-400
          "
        >
          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              font-semibold
              text-indigo-600
              hover:underline
              dark:text-indigo-400
            "
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
};

export default LoginForm;