import { useEffect, useState } from "react";
import {
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaCheckCircle,
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

        console.log("Dashboard API:", response);

        setStats(response.data);
      } catch (error) {
        console.error(error);
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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-2 text-blue-100">
          Manage books, members, and borrowing activities from one place.
        </p>
      </div>

      {user?.role === "admin" && (
        <>
          {loading ? (
            <p className="text-gray-500 dark:text-slate-400">Loading dashboard...</p>
          ) : (
            <>
              {/* Statistics Cards */}
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {/* Total Books */}
                <div className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        Total Books
                      </p>

                      <h2 className="mt-2 text-4xl font-bold text-slate-800 dark:text-slate-100">
                        {stats.totalBooks}
                      </h2>
                    </div>

                    <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/40">
                      <FaBook
                        size={30}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Members */}
                <div className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        Members
                      </p>

                      <h2 className="mt-2 text-4xl font-bold text-slate-800 dark:text-slate-100">
                        {stats.totalUsers}
                      </h2>
                    </div>

                    <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/40">
                      <FaUsers
                        size={30}
                        className="text-green-600 dark:text-green-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Borrowed */}
                <div className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        Borrowed Books
                      </p>

                      <h2 className="mt-2 text-4xl font-bold text-slate-800 dark:text-slate-100">
                        {stats.borrowedBooks}
                      </h2>
                    </div>

                    <div className="rounded-full bg-yellow-100 p-4 dark:bg-yellow-900/40">
                      <FaExchangeAlt
                        size={30}
                        className="text-yellow-600 dark:text-yellow-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Available */}
                <div className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        Available Copies
                      </p>

                      <h2 className="mt-2 text-4xl font-bold text-slate-800 dark:text-slate-100">
                        {stats.availableBooks}
                      </h2>
                    </div>

                    <div className="rounded-full bg-purple-100 p-4 dark:bg-purple-900/40">
                      <FaCheckCircle
                        size={30}
                        className="text-purple-600 dark:text-purple-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Library Overview Summary Section */}
              <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
                <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Library Overview
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      📚 Books in Library
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stats.totalBooks}
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-100 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-950/30">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      👥 Registered Members
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stats.totalUsers}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {user?.role === "member" && (
        <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-800">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Member Dashboard
          </h2>

          <p className="mt-2 text-gray-600 dark:text-slate-300">
            Browse books, borrow available books, and view your borrowing history.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;