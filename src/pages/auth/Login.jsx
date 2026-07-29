import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { FaBookOpen, FaEnvelope, FaLock } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { loginSchema } from "../../schemas/authSchema";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center px-16 text-white">

        <FaBookOpen className="mb-8 text-8xl" />

        <h1 className="mb-6 text-5xl font-extrabold">
          Library Management
        </h1>

        <p className="max-w-lg text-center text-xl leading-9 text-blue-100">
          Manage books, members and borrowing records from one
          modern dashboard.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-8">

        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/90 p-10 shadow-2xl backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/90">

          <h2 className="mb-2 text-center text-4xl font-bold text-slate-800 dark:text-white">
            Welcome Back
          </h2>

          <p className="mb-8 text-center text-slate-500 dark:text-slate-400">
            Login to continue
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

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

            <button
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting ? "Signing In..." : "Login"}
            </button>

          </form>

          <p className="mt-8 text-center text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;