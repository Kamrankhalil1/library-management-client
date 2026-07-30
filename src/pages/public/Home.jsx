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
        <h1 className="text-3xl font-bold dark:text-white">Loading...</h1>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
          <FaBookOpen className="mb-8 text-7xl md:text-8xl" />

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Library Management System
          </h1>

          <p className="mb-10 max-w-3xl text-lg text-slate-200 md:text-2xl">
            A complete digital solution for managing books, members,
            borrowing records, and library activities with a clean and modern
            interface.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/login"
              className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition duration-300 hover:scale-105 hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold transition duration-300 hover:scale-105 hover:bg-white hover:text-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-14 text-center text-4xl font-bold text-slate-800 dark:text-white">
          Features
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900">
            <FaBookOpen className="mb-5 text-5xl text-blue-600" />

            <h3 className="mb-3 text-2xl font-bold dark:text-white">
              Book Management
            </h3>

            <p className="text-slate-600 dark:text-slate-400">
              Add, edit, delete and organize books with ease.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900">
            <FaUsers className="mb-5 text-5xl text-green-600" />

            <h3 className="mb-3 text-2xl font-bold dark:text-white">
              Member Management
            </h3>

            <p className="text-slate-600 dark:text-slate-400">
              Keep track of registered library members.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900">
            <FaExchangeAlt className="mb-5 text-5xl text-orange-500" />

            <h3 className="mb-3 text-2xl font-bold dark:text-white">
              Borrow & Return
            </h3>

            <p className="text-slate-600 dark:text-slate-400">
              Manage borrowing history with automatic updates.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900">
            <FaChartBar className="mb-5 text-5xl text-purple-600" />

            <h3 className="mb-3 text-2xl font-bold dark:text-white">
              Dashboard Analytics
            </h3>

            <p className="text-slate-600 dark:text-slate-400">
              View statistics, reports and insights in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-100 py-20 dark:bg-slate-900">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-600">500+</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Books
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-green-600">100+</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Members
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-orange-500">1000+</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Borrows
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-purple-600">24/7</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Access
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">
            Library Management System
          </h3>

          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Built with React, Node.js, Express and MongoDB.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-500">
            © 2026 Library Management System. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;