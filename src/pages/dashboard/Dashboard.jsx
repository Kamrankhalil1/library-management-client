import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaCheckCircle,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import dashboardService from "../../services/dashboardService";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    borrowedBooks: 0,
    availableBooks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats();
        setStats(response.data);
      } catch (error) {
        console.error("Dashboard Stats Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="space-y-6 lg:space-y-8">
      
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl sm:p-8 md:p-10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            👋 Welcome Back
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {user?.name || "Library User"}
          </h1>
          <p className="mt-2 text-sm text-blue-100 sm:text-base md:text-lg">
            Manage books, track member activities, and streamline borrowing workflows from one central dashboard.
          </p>
        </div>

        {/* Ambient Decorative Shapes */}
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-20 h-48 w-48 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />
      </div>

      {/* ADMIN DASHBOARD SECTION */}
      {user?.role === "admin" && (
        <>
          {loading ? (
            /* Skeleton Loader */
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
                  />
                ))}
              </div>
              <div className="h-48 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ) : (
            <>
              {/* Statistics Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
                
                {/* Total Books Card */}
                <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Total Books
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-slate-800 dark:text-slate-100 lg:text-4xl">
                        {stats.totalBooks}
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 ring-1 ring-blue-500/20 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-950/60 dark:text-blue-400">
                      <FaBook className="text-xl" />
                    </div>
                  </div>
                </div>

                {/* Members Card */}
                <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Members
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-slate-800 dark:text-slate-100 lg:text-4xl">
                        {stats.totalUsers}
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 ring-1 ring-emerald-500/20 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <FaUsers className="text-xl" />
                    </div>
                  </div>
                </div>

                {/* Borrowed Books Card */}
                <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Borrowed Books
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-slate-800 dark:text-slate-100 lg:text-4xl">
                        {stats.borrowedBooks}
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 ring-1 ring-amber-500/20 transition-transform duration-300 group-hover:scale-110 dark:bg-amber-950/60 dark:text-amber-400">
                      <FaExchangeAlt className="text-xl" />
                    </div>
                  </div>
                </div>

                {/* Available Copies Card */}
                <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Available Copies
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-slate-800 dark:text-slate-100 lg:text-4xl">
                        {stats.availableBooks}
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 ring-1 ring-purple-500/20 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-950/60 dark:text-purple-400">
                      <FaCheckCircle className="text-xl" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Library Overview Summary Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 sm:text-xl">
                  Library System Status
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
                    <div>
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                        📚 Books Cataloged
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-100">
                        {stats.totalBooks} Total Units
                      </p>
                    </div>
                    <Link
                      to="/books"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition-colors"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                    <div>
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        👥 Active Accounts
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-100">
                        {stats.totalUsers} Registered
                      </p>
                    </div>
                    <Link
                      to="/borrow-records"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-500 transition-colors"
                    >
                      Records
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* MEMBER DASHBOARD SECTION */}
      {user?.role === "member" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 sm:text-2xl">
              Member Quick Actions
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Browse available books, issue new borrowing requests, and inspect your existing reading history.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                to="/books"
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-blue-500/50"
              >
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
                    Explore Book Catalog
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Search through thousands of available titles
                  </p>
                </div>
                <FaArrowRight className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </Link>

              <Link
                to="/borrowed"
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-purple-500 hover:bg-purple-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-purple-500/50"
              >
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-purple-600 dark:text-slate-200 dark:group-hover:text-purple-400">
                    My Borrowed Books
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Check active due dates and return statuses
                  </p>
                </div>
                <FaArrowRight className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;