import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookReader, FaBookOpen, FaUndo } from "react-icons/fa";

import borrowService from "../../services/borrowService";
import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import StatusBadge from "../../components/ui/StatusBadge";
import Spinner from "../../components/ui/Spinner";

function BorrowedBooks() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

const fetchBorrowedBooks = async () => {
    try {
      const response = await borrowService.getMyBorrows();
      setBorrows(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load borrowed books"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      setReturningId(borrowId);
      await borrowService.returnBook(borrowId);
      toast.success("Book returned successfully");
      fetchBorrowedBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to return book"
      );
    } finally {
      setReturningId(null);
    }
  };

useEffect(() => {
    // Data fetching on mount is intentional here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBorrowedBooks();
  }, []);

  if (loading) {
    return <Loader label="Loading borrowed books..." />;
  }

  return (
    <div className="space-y-6 fade-in">
      <PageHeader
        title="My Borrowed Books"
        subtitle="Track your active loans and return statuses"
        icon={<FaBookReader className="text-2xl" />}
      />

      {borrows.length === 0 ? (
        <EmptyState
          icon={<FaBookOpen />}
          title="No Borrowed Books"
          description="You haven't borrowed any books yet. Explore the catalog to get started."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr>
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
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
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
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                            <FaBookOpen />
                          </div>
                          <span className="font-medium text-slate-800 dark:text-slate-100">
                            {borrow.book?.title}
                          </span>
                        </div>
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

                      <td className="px-6 py-4 text-right">
                        {borrow.status === "borrowed" && (
                          <button
                            onClick={() => handleReturn(borrow._id)}
                            disabled={returningId === borrow._id}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {returningId === borrow._id ? (
                              <Spinner size="sm" className="border-white" />
                            ) : (
                              <FaUndo />
                            )}
                            Return
                          </button>
                        )}
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

export default BorrowedBooks;
