import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaBookOpen,
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { registerSchema } from "../../schemas/authSchema";

function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      {/* Background Gradient & Glow Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 pointer-events-none" />
      <div className="fixed -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="fixed -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex w-full min-h-screen">
        {/* Left Branding Side */}
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 backdrop-blur-xl shadow-2xl">
            <FaBookOpen className="text-5xl" />
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-white xl:text-5xl">
            Join Our Library
          </h1>

          <p className="max-w-md text-base leading-relaxed text-slate-300">
            Create your account to unlock access to thousands of books and seamless borrowing tools.
          </p>
        </div>

        {/* Right Form Side */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
            
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Register to get started with your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Full Name
                </label>
                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 transition-colors focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <FaUser className="text-slate-400 shrink-0 text-base" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    className="h-full w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Email Address
                </label>
                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 transition-colors focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <FaEnvelope className="text-slate-400 shrink-0 text-base" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className="h-full w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 transition-colors focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <FaLock className="text-slate-400 shrink-0 text-base" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="h-full w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white transition-colors focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Confirm Password
                </label>
                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 transition-colors focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <FaLock className="text-slate-400 shrink-0 text-base" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="h-full w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-slate-400 hover:text-white transition-colors focus:outline-none"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:bg-emerald-500 hover:shadow-emerald-500/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;