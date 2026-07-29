import { Link, Navigate } from "react-router-dom";
import {
  FaBookOpen,
  FaUsers,
  FaExchangeAlt,
  FaChartBar,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function Home() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
        <h1 className="text-2xl font-bold dark:text-white">
          Loading...
        </h1>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">

          <FaBookOpen className="mb-8 text-7xl" />

          <h1 className="mb-6 text-5xl font-extrabold lg:text-6xl">
            Library Management System
          </h1>

          <p className="mb-10 max-w-3xl text-xl text-slate-200">
            A complete digital solution for managing books,
            members, borrowing records, and library activities
            with a clean and modern interface.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <Link
              to="/login"
              className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 transition hover:scale-105"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-blue-700"
            >
              Register
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="mb-12 text-center text-4xl font-bold text-slate-800 dark:text-white">
          Features
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl dark:bg-slate-900">
            <FaBookOpen className="mb-5 text-5xl text-blue-600" />
            <h3 className="mb-3 text-xl font-bold dark:text-white">
              Book Management
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Add, edit, delete and organize books with ease.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl dark:bg-slate-900">
            <FaUsers className="mb-5 text-5xl text-green-600" />
            <h3 className="mb-3 text-xl font-bold dark:text-white">
              Member Management
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Keep track of registered library members.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl dark:bg-slate-900">
            <FaExchangeAlt className="mb-5 text-5xl text-orange-500" />
            <h3 className="mb-3 text-xl font-bold dark:text-white">
              Borrow & Return
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Manage borrowing history with automatic updates.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl dark:bg-slate-900">
            <FaChartBar className="mb-5 text-5xl text-purple-600" />
            <h3 className="mb-3 text-xl font-bold dark:text-white">
              Dashboard
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              View real-time statistics and reports instantly.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          © 2026 Library Management System. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default Home;