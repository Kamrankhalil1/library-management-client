import { useState } from "react";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaTimes,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 sm:h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-6 lg:px-8 shadow-sm backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/90">
      
      {/* Mobile Search Overlay */}
      {isMobileSearchOpen ? (
        <div className="flex w-full items-center gap-2 md:hidden">
          <div className="flex flex-1 items-center rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <FaSearch className="mr-2 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-full bg-transparent text-sm outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            aria-label="Close search"
            className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <FaTimes size={18} />
          </button>
        </div>
      ) : (
        <>
          {/* Left: Brand / Greetings */}
          <div className="flex flex-col justify-center min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-white truncate">
              Dashboard
            </h1>
            <p className="hidden xs:block text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
              Welcome back, <span className="font-medium text-slate-700 dark:text-slate-200">{user?.name || "User"}</span>
            </p>
          </div>

          {/* Right: Actions & User Info */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4">
            
            {/* Desktop Search Bar */}
            <div className="hidden items-center rounded-xl border border-slate-300 bg-slate-100 px-3.5 py-2 md:flex dark:border-slate-700 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
              <FaSearch className="mr-2 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="w-36 lg:w-48 bg-transparent text-sm outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
              />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Search"
              className="flex md:hidden rounded-xl bg-slate-100 p-2.5 sm:p-3 text-slate-600 transition hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <FaSearch size={16} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-xl bg-slate-100 p-2.5 sm:p-3 text-slate-700 transition hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {darkMode ? (
                <FaSun size={16} className="text-yellow-400" />
              ) : (
                <FaMoon size={16} className="text-slate-600" />
              )}
            </button>

            {/* Notification Indicator */}
            <button
              aria-label="Notifications"
              className="relative rounded-xl bg-slate-100 p-2.5 sm:p-3 text-slate-700 transition hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <FaBell size={16} />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 sm:gap-3 rounded-xl bg-slate-100 p-1.5 sm:px-3.5 sm:py-2 dark:bg-slate-800">
              <FaUserCircle size={28} className="text-blue-600 shrink-0 sm:h-8 sm:w-8" />

              <div className="hidden md:flex flex-col">
                <span className="text-sm font-semibold leading-none text-slate-800 dark:text-white truncate max-w-[120px]">
                  {user?.name || "Guest"}
                </span>
                <span
                  className={`mt-1 inline-block self-start rounded-md px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                    user?.role === "admin"
                      ? "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-300"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                  }`}
                >
                  {user?.role || "user"}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              aria-label="Logout"
              title="Logout"
              className="flex items-center gap-2 rounded-xl bg-red-500 px-3 py-2.5 sm:px-4 sm:py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-600 active:scale-95"
            >
              <FaSignOutAlt size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;