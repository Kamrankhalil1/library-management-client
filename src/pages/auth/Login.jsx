import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaBookOpen,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { loginSchema } from "../../schemas/authSchema";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 font-sans text-slate-100">
      
      {/* Dynamic Animated Glows */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950/40 to-indigo-950/60 pointer-events-none" />
      <div className="fixed -left-40 -top-40 h-[450px] w-[450px] animate-pulse rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="fixed -right-40 -bottom-40 h-[450px] w-[450px] animate-pulse rounded-full bg-indigo-500/15 blur-[120px] pointer-events-none duration-1000" />

      {/* Floating Home Back Button */}
      <Link
        to="/"
        className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white sm:left-8 sm:top-8 sm:text-sm"
      >
        <FaArrowLeft className="text-xs" />
        Back to Home
      </Link>

      <div className="relative z-10 flex min-h-screen w-full flex-col lg:flex-row">
        
        {/* Left Branding Side (Desktop & Tablet Large) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 text-center lg:p-16">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30 backdrop-blur-2xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-3">
            <FaBookOpen className="text-5xl" />
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-white xl:text-5xl">
            Library System
          </h1>

          <p className="max-w-md text-base leading-relaxed text-slate-300 xl:text-lg">
            Manage books, member profiles, and borrowing records from one intuitive, modern dashboard.
          </p>

          <div className="mt-10 flex items-center gap-3 rounded-full bg-slate-900/60 px-5 py-2.5 text-xs font-medium text-slate-400 ring-1 ring-slate-800 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Real-Time Synchronization
          </div>
        </div>

        {/* Right Form Side (All Viewports) */}
        <div className="flex flex-1 items-center justify-center px-4 py-20 sm:px-8 lg:p-12">
          <div className="w-full max-w-md transform rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80">
            
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30 lg:hidden">
                <FaBookOpen className="text-2xl" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Welcome Back
              </h2>
              <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
              
              {/* Email Address */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Email Address
                </label>
                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 transition-all duration-200 focus-within:border-blue-500 focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500/20">
                  <FaEnvelope className="text-slate-400 shrink-0 text-sm sm:text-base" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className="h-full w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-400 animate-shake">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                </div>
                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 transition-all duration-200 focus-within:border-blue-500 focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500/20">
                  <FaLock className="text-slate-400 shrink-0 text-sm sm:text-base" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="h-full w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white transition-colors focus:outline-none p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin text-base sm:text-lg" />
                    <span className="text-sm sm:text-base">Signing In...</span>
                  </>
                ) : (
                  <span className="text-sm sm:text-base">Sign In</span>
                )}
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-8 text-center text-xs text-slate-400 sm:text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-400 transition-colors hover:text-blue-300 hover:underline"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;