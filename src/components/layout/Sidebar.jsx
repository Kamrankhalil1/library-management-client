import { NavLink } from "react-router-dom";
import {
  FaBook,
  FaBookReader,
  FaChartPie,
  FaUserCircle,
  FaTimes,
  FaSignOutAlt,
  FaBookOpen,
  FaHistory,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: FaChartPie },
    { name: "Books", path: "/books", icon: FaBook },
    { name: "My Borrowed", path: "/borrowed", icon: FaBookReader },
  ];

  if (isAdmin) {
    navItems.push({
      name: "Borrow Records",
      path: "/borrow-records",
      icon: FaHistory,
    });
  }

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 sm:h-20 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
              <FaBookOpen className="text-lg" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white">
                Library
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Management
              </p>
            </div>
          </div>

          {/* Close Button on Mobile */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator bar */}
                    <span
                      className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue-600 transition-all ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <Icon
                      className={`text-lg transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : ""
                      }`}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <FaUserCircle className="text-xl" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                {user?.name || "Guest"}
              </p>
              <p className="truncate text-xs capitalize text-slate-500 dark:text-slate-400">
                {user?.role || "User"}
              </p>
            </div>
            <button
              onClick={logout}
              aria-label="Logout"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
