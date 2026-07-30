import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBook,
  FaBookOpen,
  FaChartPie,
  FaUser,
  FaClipboardList,
  FaBookReader,
  FaCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-blue-400"
    }`;

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl shadow-md">
            📚
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 dark:text-white">
              Library
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Management
            </p>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity md:hidden"
        />
      )}

      {/* Sidebar Component Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 md:static md:w-64 md:translate-x-0 lg:w-72 xl:w-80 shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Logo */}
        <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-2xl shadow-lg shadow-indigo-500/20">
              📚
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white lg:text-2xl">
                Library
              </h1>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Management System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 scrollbar-thin">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[3px] text-slate-400 dark:text-slate-500">
            Navigation
          </p>

          <nav className="space-y-1.5">
            <NavLink to="/dashboard" onClick={closeSidebar} className={linkClass}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <FaChartPie className="text-base" />
              </div>
              <span className="truncate">Dashboard</span>
            </NavLink>

            <NavLink to="/books" onClick={closeSidebar} className={linkClass}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <FaBook className="text-base" />
              </div>
              <span className="truncate">Books</span>
            </NavLink>

            <NavLink to="/books/create" onClick={closeSidebar} className={linkClass}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400">
                <FaBookOpen className="text-base" />
              </div>
              <span className="truncate">Add Book</span>
            </NavLink>

            <NavLink to="/borrowed" onClick={closeSidebar} className={linkClass}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <FaBookReader className="text-base" />
              </div>
              <span className="truncate">My Borrowed Books</span>
            </NavLink>

            <NavLink to="/borrow-records" onClick={closeSidebar} className={linkClass}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <FaClipboardList className="text-base" />
              </div>
              <span className="truncate">Borrow Records</span>
            </NavLink>

            <NavLink to="/profile" onClick={closeSidebar} className={linkClass}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <FaUser className="text-base" />
              </div>
              <span className="truncate">Profile</span>
            </NavLink>
          </nav>

          <div className="my-5 border-t border-slate-200 dark:border-slate-800" />

          {/* Compact User Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
                  user?.name || "User"
                )}`}
                alt="Avatar"
                className="h-11 w-11 rounded-full ring-2 ring-blue-500/20"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-slate-800 dark:text-white">
                  {user?.name || "Member"}
                </h3>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <FaCircle className="text-emerald-500" size={7} />
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2 border border-slate-200/60 dark:border-slate-700/60 dark:bg-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Role
              </span>
              <span className="text-xs font-bold capitalize text-blue-600 dark:text-blue-400">
                {user?.role || "User"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Promo */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4 text-white shadow-lg">
            <h2 className="text-sm font-bold flex items-center gap-1.5">
              📚 Library Pro
            </h2>
            <p className="mt-1 text-xs text-blue-100 leading-snug">
              Manage books, members, and records seamlessly.
            </p>
            <div className="mt-3 text-center rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
              Version 1.0.0
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;