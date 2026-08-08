import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHistory, FaBookOpen } from "react-icons/fa";

import borrowService from "../../services/borrowService";
import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import StatusBadge from "../../components/ui/StatusBadge";

function AllBorrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchBorrows = async () => {
    try {
      const response = await borrowService.getAllBorrows();
      setBorrows(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load borrow records"
      );
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    // Data fetching on mount is intentional here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBorrows();
  }, []);

  if (loading) {
    return <Loader label="Loading borrow records..." />;
  }

  return (
    <div className="space-y-6 fade-in">
      <PageHeader
        title="All Borrow Records"
        subtitle="Track all borrowing activity across the library"
        icon={<FaHistory className="text-2xl" />}
      />

      {borrows.length === 0 ? (
        <EmptyState
          icon={<FaBookOpen />}
          title="No Borrow Records"
          description="There are no borrow records to display yet."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Member
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Book
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Borrow Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {borrows.map((borrow) => {
                  const isOverdue =
                    borrow.status === "borrowed" &&
                    new Date(borrow.dueDate) < new Date();

                  return (
                    <tr
                      key={borrow._id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                            {borrow.user?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() || "U"}
                          </div>
                          <span className="font-medium text-slate-800 dark:text-slate-100">
                            {borrow.user?.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {borrow.user?.email}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {borrow.book?.title}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {new Date(borrow.borrowDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {new Date(borrow.dueDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={isOverdue ? "overdue" : borrow.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBorrows;
