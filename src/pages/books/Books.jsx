import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBook,
  FaBookOpen,
  FaSyncAlt,
} from "react-icons/fa";
import bookService from "../../services/bookService";
import borrowService from "../../services/borrowService";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmModal from "../../components/ui/ConfirmModal";
import Spinner from "../../components/ui/Spinner";
import useAuth from "../../hooks/useAuth";

function Books() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [meta, setMeta] = useState({});

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [borrowingId, setBorrowingId] = useState(null);

  const isAdmin = user?.role === "admin";

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookService.getBooks({
        search,
        category,
        sort,
        page,
      });
      setBooks(response.data);
      setFilteredBooks(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    // Data fetching when filters change is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBooks();
  }, [category, sort, page]);

useEffect(() => {
    // Client-side filtering by search term.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const result = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(result);
  }, [search, books]);

  // Keep URL query param in sync with search
  useEffect(() => {
    if (search) {
      setSearchParams({ q: search }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [search, setSearchParams]);

  const handleBorrow = async (id) => {
    try {
      setBorrowingId(id);
      await borrowService.borrowBook(id);
      toast.success("Book borrowed successfully");
      fetchBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to borrow book"
      );
    } finally {
      setBorrowingId(null);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await bookService.deleteBook(deleteTarget);
      toast.success("Book deleted successfully");
      setDeleteTarget(null);
      fetchBooks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <Loader label="Loading books..." />;
  }

  const inputStyles =
    "rounded-xl border border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500";

  return (
    <div className="space-y-6 fade-in">
      <PageHeader
        title="Books"
        subtitle="Manage your library collection"
        icon={<FaBook className="text-2xl" />}
        actions={
          isAdmin && (
            <Link
              to="/books/create"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95"
            >
              <FaPlus />
              Add Book
            </Link>
          )
        }
      />

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={`${inputStyles} w-full py-3 pl-12 pr-4`}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className={`${inputStyles} p-3`}
          >
            <option value="">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Novel">Novel</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`${inputStyles} p-3`}
          >
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
            <option value="title">Title A-Z</option>
            <option value="-title">Title Z-A</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredBooks.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Available
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBooks.map((book) => {
                  const inStock = book.availableCopies > 0;
                  return (
                    <tr
                      key={book._id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                            <FaBookOpen />
                          </div>
                          <span className="font-medium text-slate-800 dark:text-slate-100">
                            {book.title}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-300">
                        {book.author}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {book.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {inStock ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                            {book.availableCopies} Available
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                            Out of Stock
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleBorrow(book._id)}
                            disabled={!inStock || borrowingId === book._id}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {borrowingId === book._id ? (
                              <Spinner size="sm" className="border-white" />
                            ) : (
                              "Borrow"
                            )}
                          </button>

                          {isAdmin && (
                            <>
                              <Link
                                to={`/books/edit/${book._id}`}
                                className="rounded-lg bg-yellow-400 p-2 text-white transition hover:bg-yellow-500"
                                aria-label={`Edit ${book.title}`}
                              >
                                <FaEdit />
                              </Link>
                              <button
                                onClick={() => setDeleteTarget(book._id)}
                                className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                                aria-label={`Delete ${book.title}`}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={<FaBook />}
          title="No Books Found"
          description="Try a different search or add a new book to the collection."
          action={
            search || category ? (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <FaSyncAlt />
                Clear Filters
              </button>
            ) : undefined
          }
        />
      )}

      {/* Pagination */}
      {(meta.totalPages || 0) > 1 && (
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
            Page {meta.page || 1} of {meta.totalPages || 1}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === meta.totalPages || meta.totalPages === 0}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete this book?"
        message="This action cannot be undone. The book will be permanently removed from the catalog."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
        variant="danger"
      />
    </div>
  );
}

export default Books;
