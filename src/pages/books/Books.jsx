import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBook,
} from "react-icons/fa";
import bookService from "../../services/bookService";
import borrowService from "../../services/borrowService";
import toast from "react-hot-toast";

function Books() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [meta, setMeta] = useState({});

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

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
    fetchBooks();
  }, [category, sort, page]);

  useEffect(() => {
    const result = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredBooks(result);
  }, [search, books]);

  const handleBorrow = async (id) => {
    try {
      await borrowService.borrowBook(id);
      toast.success("Book borrowed successfully");
      fetchBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to borrow book"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      await bookService.deleteBook(id);
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Books
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Manage your library collection.
          </p>
        </div>

        <Link
          to="/books/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <FaPlus />
          Add Book
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-4 text-gray-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
            className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
            <option value="title">Title A-Z</option>
            <option value="-title">Title Z-A</option>
          </select>
        </div>
      </div>

      {/* Modern Table */}
      {filteredBooks.length > 0 ? (
        <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-200">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-200">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-200">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-200">
                    Available
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-700 dark:text-slate-200">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/40">
                          <FaBook className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-100">
                          {book.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-slate-300">
                      {book.author}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-slate-300">
                      {book.category}
                    </td>

                    <td className="px-6 py-4">
                      {book.availableCopies > 0 ? (
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
                          disabled={book.availableCopies === 0}
                          className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Borrow
                        </button>

                        <Link
                          to={`/books/edit/${book._id}`}
                          className="rounded bg-yellow-400 p-2 text-white transition hover:bg-yellow-500"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(book._id)}
                          className="rounded bg-red-500 p-2 text-white transition hover:bg-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-xl bg-white p-10 text-center shadow dark:bg-slate-800">
          <FaBook
            size={50}
            className="mx-auto mb-4 text-gray-300 dark:text-slate-600"
          />
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            No Books Found
          </h2>
          <p className="mt-2 text-gray-500 dark:text-slate-400">
            Try another search or add a new book.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          Previous
        </button>

        <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
          Page {meta.page || 1} of {meta.totalPages || 1}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={
            page === meta.totalPages || meta.totalPages === 0
          }
          className="rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Books;