import { Link, Navigate } from "react-router-dom";
import {
  FaBookOpen,
  FaUsers,
  FaExchangeAlt,
  FaChartBar,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function Home() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-base font-medium text-slate-600 dark:text-slate-300 sm:text-lg">
            Loading Library System...
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 py-16 text-white sm:py-24 lg:py-32">
        {/* Animated Background Glow Effects */}
        <div className="absolute -left-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-blue-500/20 blur-3xl pointer-events-none sm:h-96 sm:w-96" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 animate-pulse rounded-full bg-indigo-500/20 blur-3xl pointer-events-none sm:h-96 sm:w-96" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          
          {/* Badge */}
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md ring-1 ring-white/20 sm:mb-8 sm:px-5 sm:py-2 sm:text-sm">
            <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-ping" />
            <span className="truncate text-slate-200">
              Full-Stack Library Management System
            </span>
          </div>

          {/* Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/30 text-blue-400 ring-1 ring-white/20 backdrop-blur-xl shadow-2xl transition-transform duration-500 hover:scale-110 sm:mb-8 sm:h-24 sm:w-24 sm:rounded-3xl">
            <FaBookOpen className="text-3xl sm:text-5xl" />
          </div>

          {/* Heading */}
          <h1 className="mb-6 max-w-5xl text-3xl font-black tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Manage Your Library <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Effortlessly & Modernly
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:mb-12 sm:text-xl">
            A powerful digital platform for managing books, member profiles,
            borrowing records, and analytics with real-time insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:gap-6">
            <Link
              to="/login"
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95 sm:w-auto sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg"
            >
              Sign In to Dashboard
              <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            <Link
              to="/register"
              className="flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/40 active:scale-95 sm:w-auto sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg"
            >
              Create Account
            </Link>
          </div>

        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mb-12 text-center sm:mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 sm:text-sm">
            Core Capabilities
          </h2>
          <p className="mt-2 text-2xl font-extrabold tracking-tight sm:mt-3 sm:text-4xl lg:text-5xl">
            Everything you need to run a modern library
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Card 1 */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl sm:p-8">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/50 dark:text-blue-400 sm:mb-8 sm:h-14 sm:w-14 sm:rounded-2xl">
                <FaBookOpen className="text-xl sm:text-2xl" />
              </div>
              <h3 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">Book Catalog</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Organize, add, edit, and track book availability across categories seamlessly.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl sm:p-8">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/50 dark:text-emerald-400 sm:mb-8 sm:h-14 sm:w-14 sm:rounded-2xl">
                <FaUsers className="text-xl sm:text-2xl" />
              </div>
              <h3 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">Member Control</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Manage member registrations, contact records, and active memberships effortlessly.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl sm:p-8">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white dark:bg-amber-950/50 dark:text-amber-400 sm:mb-8 sm:h-14 sm:w-14 sm:rounded-2xl">
                <FaExchangeAlt className="text-xl sm:text-2xl" />
              </div>
              <h3 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">Borrow & Return</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Track active loans, return dates, and automated status updates with zero friction.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl sm:p-8">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-950/50 dark:text-purple-400 sm:mb-8 sm:h-14 sm:w-14 sm:rounded-2xl">
                <FaChartBar className="text-xl sm:text-2xl" />
              </div>
              <h3 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">Live Analytics</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Visualize key stats, library activity logs, and overview metrics in real time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200/80 bg-slate-100/70 py-12 dark:border-slate-800 dark:bg-slate-900/40 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 lg:grid-cols-4 lg:gap-8">
          
          <div className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800 sm:rounded-3xl sm:p-8">
            <FaBookOpen className="mb-2 text-2xl text-blue-600 sm:mb-4 sm:text-3xl" />
            <h3 className="text-3xl font-black sm:text-4xl lg:text-5xl">500+</h3>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
              Books Cataloged
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800 sm:rounded-3xl sm:p-8">
            <FaUsers className="mb-2 text-2xl text-emerald-600 sm:mb-4 sm:text-3xl" />
            <h3 className="text-3xl font-black sm:text-4xl lg:text-5xl">100+</h3>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
              Active Members
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800 sm:rounded-3xl sm:p-8">
            <FaCheckCircle className="mb-2 text-2xl text-amber-500 sm:mb-4 sm:text-3xl" />
            <h3 className="text-3xl font-black sm:text-4xl lg:text-5xl">1000+</h3>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
              Borrows Completed
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800 sm:rounded-3xl sm:p-8">
            <FaClock className="mb-2 text-2xl text-purple-600 sm:mb-4 sm:text-3xl" />
            <h3 className="text-3xl font-black sm:text-4xl lg:text-5xl">24/7</h3>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
              System Availability
            </p>
          </div>

        </div>
      </section>

</div>
  );
}

export default Home;