import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import borrowService from "../../services/borrowService";

function BorrowedBooks() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrowedBooks = async () => {
    try {
      setLoading(true);

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
      await borrowService.returnBook(borrowId);

      toast.success("Book returned successfully");

      fetchBorrowedBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to return book"
      );
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  if (loading) {
    return (
      <h2 className="mt-10 text-center text-xl font-semibold text-slate-800 dark:text-slate-100">
        Loading borrowed books...
      </h2>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
        My Borrowed Books
      </h1>

      <div className="overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-800">
        <table className="min-w-full">
          <thead className="bg-slate-200 dark:bg-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">
                Book
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">
                Borrow Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">
                Due Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {borrows.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-gray-500 dark:text-slate-400"
                >
                  No borrowed books found.
                </td>
              </tr>
            ) : (
              borrows.map((borrow) => (
                <tr
                  key={borrow._id}
                  className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                >
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">
                    {borrow.book?.title}
                  </td>

                  <td className="px-4 py-3 text-gray-700 dark:text-slate-300">
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-gray-700 dark:text-slate-300">
                    {new Date(borrow.dueDate).toLocaleDateString()}
                  </td>

                  {/* Status Cell */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2.5 py-1 text-xs font-semibold ${
                        borrow.status === "borrowed"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                      }`}
                    >
                      {borrow.status}
                    </span>
                  </td>

                  {/* Action Cell */}
                  <td className="px-4 py-3">
                    {borrow.status === "borrowed" && (
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BorrowedBooks;