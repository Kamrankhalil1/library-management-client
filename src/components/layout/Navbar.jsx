import {
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 shadow backdrop-blur-md transition-all dark:border-slate-800 dark:bg-slate-900/90">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="hidden items-center rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 md:flex dark:border-slate-700 dark:bg-slate-800">
          <FaSearch className="mr-2 text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none dark:text-white"
          />
        </div>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-slate-700" />
          )}
        </button>

        {/* Notification */}
        <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
          <FaBell className="text-slate-700 dark:text-slate-300" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2 dark:bg-slate-800">

          <FaUserCircle
            size={42}
            className="text-blue-600"
          />

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-800 dark:text-white">
              {user?.name}
            </h3>

            <span
              className={`rounded-full px-2 py-1 text-xs font-bold ${
                user?.role === "admin"
                  ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300"
                  : "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300"
              }`}
            >
              {user?.role?.toUpperCase()}
            </span>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          <FaSignOutAlt />

          <span className="hidden md:block">
            Logout
          </span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;