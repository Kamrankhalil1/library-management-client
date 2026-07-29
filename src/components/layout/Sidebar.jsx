import { NavLink } from "react-router-dom";
import {
  FaBook,
  FaBookOpen,
  FaChartPie,
  FaUser,
  FaClipboardList,
  FaBookReader,
  FaCircle,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
      isActive
        ? "relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl before:absolute before:left-0 before:top-3 before:h-8 before:w-1 before:rounded-full before:bg-white"
        : "text-slate-700 hover:translate-x-2 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
    }`;

  return (
    <aside className="hidden w-80 min-h-screen flex-col border-r border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:flex">

      {/* Logo */}
      <div className="border-b border-slate-200 px-7 py-8 dark:border-slate-800">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-4xl shadow-xl">
            📚
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Library
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Management System
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-5 py-6">

        <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[4px] text-slate-400">
          Navigation
        </p>

        <nav className="space-y-2">

          <NavLink
            to="/dashboard"
            className={linkClass}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/40">
              <FaChartPie />
            </div>

            <span className="font-semibold">
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/books"
            className={linkClass}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40">
              <FaBook />
            </div>

            <span className="font-semibold">
              Books
            </span>
          </NavLink>

          <NavLink
            to="/books/create"
            className={linkClass}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40">
              <FaBookOpen />
            </div>

            <span className="font-semibold">
              Add Book
            </span>
          </NavLink>

          <NavLink
            to="/borrowed"
            className={linkClass}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40">
              <FaBookReader />
            </div>

            <span className="font-semibold">
              My Borrowed Books
            </span>
          </NavLink>

          <NavLink
            to="/borrow-records"
            className={linkClass}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40">
              <FaClipboardList />
            </div>

            <span className="font-semibold">
              Borrow Records
            </span>
          </NavLink>

          <NavLink
            to="/profile"
            className={linkClass}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/40">
              <FaUser />
            </div>

            <span className="font-semibold">
              Profile
            </span>
          </NavLink>

        </nav>

        {/* Divider */}

        <div className="my-8 border-t border-slate-200 dark:border-slate-700"></div>

        {/* User Card */}

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">

          <div className="flex items-center gap-4">

            <img
              src={`https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
                user?.name || "User"
              )}`}
              alt="Avatar"
              className="h-14 w-14 rounded-full"
            />

            <div>

              <h3 className="font-bold text-slate-800 dark:text-white">
                {user?.name}
              </h3>

              <div className="mt-1 flex items-center gap-2">

                <FaCircle
                  className="text-green-500"
                  size={8}
                />

                <span className="text-sm text-slate-500">
                  Online
                </span>

              </div>

            </div>

          </div>

          <div className="mt-5 rounded-xl bg-blue-50 p-3 dark:bg-slate-700">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Role
            </p>

            <h4 className="mt-1 text-lg font-bold capitalize text-blue-600 dark:text-blue-400">
              {user?.role}
            </h4>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 p-6 dark:border-slate-800">

        <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl">

          <h2 className="text-xl font-bold">
            📚 Library Pro
          </h2>

          <p className="mt-3 text-sm leading-6 text-blue-100">
            Manage books, members, borrowing records and reports with a modern dashboard.
          </p>

          <button className="mt-5 w-full rounded-xl bg-white py-3 font-semibold text-blue-700 transition hover:scale-105">
            Version 1.0
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;