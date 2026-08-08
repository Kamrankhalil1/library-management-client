import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import { Link } from "react-router-dom";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  profile: "Profile",
  books: "Books",
  borrowed: "My Borrowed Books",
  "borrow-records": "Borrow Records",
};

function getPageTitle(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  // Handle /books/create and /books/edit/:id
  if (segments[0] === "books" && segments[1] === "create") return "Add Book";
  if (segments[0] === "books" && segments[1] === "edit") return "Edit Book";
  return PAGE_TITLES[segments[0]] || "Dashboard";
}

function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserOpen, setIsUserOpen] = useState(false);
  const userMenuRef = useRef(null);

  const pageTitle = getPageTitle(location.pathname);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Navigate to books page with search state
    navigate(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setIsMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 sm:h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-6 lg:px-8 shadow-sm backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/90">
      {/* Mobile Search Overlay */}
      {isMobileSearchOpen ? (
        <form
          onSubmit={handleSearch}
          className="flex w-full items-center gap-2 md:hidden"
        >
          <div className="flex flex-1 items-center rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <FaSearch className="mr-2 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            aria-label="Close search"
            className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <FaTimes size={18} />
          </button>
        </form>
      ) : (
        <>
          {/* Left: Burger Trigger + Dynamic Title */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={onMenuToggle}
              aria-label="Open Navigation Drawer"
              className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 active:scale-95 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <FaBars size={20} />
            </button>

            <div className="flex flex-col justify-center min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-white truncate">
                {pageTitle}
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                Welcome back,{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {user?.name || "User"}
                </span>
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4">
            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="hidden items-center rounded-xl border border-slate-300 bg-slate-100 px-3.5 py-2 md:flex dark:border-slate-700 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all"
            >
              <FaSearch className="mr-2 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 lg:w-48 bg-transparent text-sm outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
              />
            </form>

            {/* Search Trigger (Mobile) */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Search"
              className="flex md:hidden rounded-xl bg-slate-100 p-2.5 text-slate-600 transition hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <FaSearch size={16} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="rounded-xl bg-slate-100 p-2.5 sm:p-3 text-slate-700 transition hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {darkMode ? (
                <FaSun size={16} className="text-yellow-400" />
              ) : (
                <FaMoon size={16} className="text-slate-600" />
              )}
            </button>

            {/* Notifications */}
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

            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserOpen(!isUserOpen)}
                aria-label="Account menu"
                className="flex items-center gap-2 sm:gap-3 rounded-xl bg-slate-100 p-1.5 sm:px-3.5 sm:py-2 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <FaUserCircle size={28} className="text-blue-600 shrink-0 sm:h-8 sm:w-8" />
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-sm font-semibold leading-none text-slate-800 dark:text-white truncate max-w-[120px]">
                    {user?.name || "Guest"}
                  </span>
                  <span className="mt-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    {user?.role || "User"}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isUserOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {user?.name || "Guest"}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsUserOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
                  >
                    <FaUser className="text-slate-400" />
                    My Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
