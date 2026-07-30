import { Link, Navigate } from "react-router-dom";
import {
  FaBookOpen,
  FaUsers,
  FaExchangeAlt,
  FaChartBar,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
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
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
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
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white py-20 lg:py-32">
        {/* Animated Glow Effects */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none animate-pulse duration-1000" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center">
          
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/15">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-200">Full-Stack Library Management System</span>
          </div>

          {/* Animated Main Icon */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600/30 text-blue-400 ring-1 ring-white/20 backdrop-blur-xl shadow-2xl transition-transform duration-500 hover:scale-110 hover:rotate-3">
            <FaBookOpen className="text-5xl" />
          </div>

          <h1 className="mb-8 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl md:text-7xl leading-tight">
            Manage Your Library <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Effortlessly & Modernly
            </span>
          </h1>

          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            A powerful digital platform for managing books, member profiles,
            borrowing records, and analytics with real-time insights.
          </p>

          <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
            <Link
              to="/login"
              className="group flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95"
            >
              Sign In to Dashboard
              <FaArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            <Link
              to="/register"
              className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/40 active:scale-95"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <div className="mb-20 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Core Capabilities
          </h2>
          <p className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Everything you need to run a modern library
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/50 dark:text-blue-400">
                <FaBookOpen className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Book Catalog</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Organize, add, edit, and track book availability across categories seamlessly.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/50 dark:text-emerald-400">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Member Control</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Manage member registrations, contact records, and active memberships effortlessly.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white dark:bg-amber-950/50 dark:text-amber-400">
                <FaExchangeAlt className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Borrow & Return</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Track active loans, return dates, and automated status updates with zero friction.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-950/50 dark:text-purple-400">
                <FaChartBar className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Live Analytics</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Visualize key stats, library activity logs, and overview metrics in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200/80 bg-slate-100/70 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          <div className="flex flex-col items-center rounded-3xl bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
            <FaBookOpen className="mb-4 text-3xl text-blue-600" />
            <h3 className="text-4xl font-black sm:text-5xl">500+</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Books Cataloged
            </p>
          </div>

          <div className="flex flex-col items-center rounded-3xl bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
            <FaUsers className="mb-4 text-3xl text-emerald-600" />
            <h3 className="text-4xl font-black sm:text-5xl">100+</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Members
            </p>
          </div>

          <div className="flex flex-col items-center rounded-3xl bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
            <FaCheckCircle className="mb-4 text-3xl text-amber-500" />
            <h3 className="text-4xl font-black sm:text-5xl">1000+</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Borrows Completed
            </p>
          </div>

          <div className="flex flex-col items-center rounded-3xl bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
            <FaClock className="mb-4 text-3xl text-purple-600" />
            <h3 className="text-4xl font-black sm:text-5xl">24/7</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              System Availability
            </p>
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="bg-white py-14 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 text-center md:flex-row md:text-left">
          <div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm text-white shadow-md shadow-blue-500/20">
                📚
              </span>
              <h3 className="text-xl font-bold">Library Management System</h3>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Built with React, Express, Node.js, and MongoDB.
            </p>
          </div>

          {/* Social Icons (Prominent Size & Hover Animations) */}
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <a
              href="https://github.com/Kamrankhalil1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-900 hover:text-white hover:shadow-lg dark:bg-slate-900 dark:hover:bg-slate-800"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/kamran-khalil-950963266/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-[#0A66C2] hover:text-white hover:shadow-lg dark:bg-slate-900 dark:hover:bg-slate-800"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 text-center text-xs font-medium text-slate-400 dark:border-slate-900 dark:text-slate-600">
          © {new Date().getFullYear()} Library Management System. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;