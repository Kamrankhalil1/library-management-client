import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaBookOpen,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { registerSchema } from "../../schemas/authSchema";

function Register() {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-700 via-teal-700 to-slate-900">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center px-16 text-white">

        <FaBookOpen className="mb-8 text-8xl" />

        <h1 className="mb-6 text-center text-5xl font-extrabold">
          Join Our Library
        </h1>

        <p className="max-w-lg text-center text-xl leading-9 text-emerald-100">
          Create your account and start exploring thousands
          of books with our modern Library Management System.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-8">

        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/90 p-10 shadow-2xl backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/90">

          <h2 className="mb-2 text-center text-4xl font-bold text-slate-800 dark:text-white">
            Create Account
          </h2>

          <p className="mb-8 text-center text-slate-500 dark:text-slate-400">
            Register to get started
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 dark:border-slate-700 dark:bg-slate-800">

                <FaUser className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className="w-full bg-transparent p-4 outline-none dark:text-white"
                />

              </div>

              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}

            </div>

            {/* Email */}
            <div>

              <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 dark:border-slate-700 dark:bg-slate-800">

                <FaEnvelope className="text-slate-400" />

                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  className="w-full bg-transparent p-4 outline-none dark:text-white"
                />

              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 dark:border-slate-700 dark:bg-slate-800">

                <FaLock className="text-slate-400" />

                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full bg-transparent p-4 outline-none dark:text-white"
                />

              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* Confirm Password */}
            <div>

              <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 dark:border-slate-700 dark:bg-slate-800">

                <FaLock className="text-slate-400" />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="w-full bg-transparent p-4 outline-none dark:text-white"
                />

              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition hover:scale-[1.02] hover:bg-emerald-700 disabled:opacity-60"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <p className="mt-8 text-center text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;