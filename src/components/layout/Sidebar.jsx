import { NavLink } from "react-router-dom";
import { FaBook, FaBookReader, FaChartPie, FaTimes } from "react-icons/fa";

function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { name: "Dashboard", path: "/", icon: FaChartPie },
    { name: "Books", path: "/books", icon: FaBook },
    { name: "Borrowed Books", path: "/borrowed", icon: FaBookReader },
  ];

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <FaBook className="text-lg" />
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
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                <Icon className="text-lg" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;