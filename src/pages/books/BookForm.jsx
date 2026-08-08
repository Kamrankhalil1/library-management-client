import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaUser,
  FaTags,
  FaBarcode,
  FaCalendarAlt,
  FaCopy,
  FaBoxOpen,
  FaAlignLeft,
  FaArrowLeft,
  FaSave,
  FaPlus,
} from "react-icons/fa";

import { createBookSchema } from "../../validations/bookSchema";
import bookService from "../../services/bookService";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

const inputStyles =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500";

function Field({ icon, label, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        {children}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

function BookForm({ mode, defaultValues }) {
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createBookSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await bookService.updateBook(defaultValues._id, data);
        toast.success("Book updated successfully");
      } else {
        await bookService.createBook(data);
        toast.success("Book created successfully");
        reset();
      }
      navigate("/books");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (isEdit ? "Failed to update book" : "Failed to create book")
      );
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title={isEdit ? "Edit Book" : "Add New Book"}
          subtitle={
            isEdit
              ? "Update the details of this book"
              : "Add a new book to your library catalog"
          }
          icon={<FaBook className="text-2xl" />}
        />
        <Link
          to="/books"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <FaArrowLeft />
          Back to Books
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <Field
            icon={<FaBook className="text-sm" />}
            label="Title"
            error={errors.title?.message}
          >
            <input
              {...register("title")}
              placeholder="Book title"
              className={inputStyles}
            />
          </Field>

          {/* Author */}
          <Field
            icon={<FaUser className="text-sm" />}
            label="Author"
            error={errors.author?.message}
          >
            <input
              {...register("author")}
              placeholder="Author name"
              className={inputStyles}
            />
          </Field>

          {/* Category + ISBN */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              icon={<FaTags className="text-sm" />}
              label="Category"
              error={errors.category?.message}
            >
              <input
                {...register("category")}
                placeholder="e.g. Programming"
                className={inputStyles}
              />
            </Field>

            <Field
              icon={<FaBarcode className="text-sm" />}
              label="ISBN"
              error={errors.isbn?.message}
            >
              <input
                {...register("isbn")}
                placeholder="1-234-56789-0"
                className={inputStyles}
              />
            </Field>
          </div>

          {/* Published Year + Total Copies + Available Copies */}
          <div className="grid gap-6 sm:grid-cols-3">
            <Field
              icon={<FaCalendarAlt className="text-sm" />}
              label="Published Year"
              error={errors.publishedYear?.message}
            >
              <input
                type="number"
                {...register("publishedYear", { valueAsNumber: true })}
                placeholder="2024"
                className={inputStyles}
              />
            </Field>

            <Field
              icon={<FaCopy className="text-sm" />}
              label="Total Copies"
              error={errors.totalCopies?.message}
            >
              <input
                type="number"
                {...register("totalCopies", { valueAsNumber: true })}
                placeholder="0"
                className={inputStyles}
              />
            </Field>

            <Field
              icon={<FaBoxOpen className="text-sm" />}
              label="Available Copies"
              error={errors.availableCopies?.message}
            >
              <input
                type="number"
                {...register("availableCopies", { valueAsNumber: true })}
                placeholder="0"
                className={inputStyles}
              />
            </Field>
          </div>

          {/* Description */}
          <Field
            icon={<FaAlignLeft className="text-sm" />}
            label="Description"
            error={errors.description?.message}
          >
            <textarea
              rows={4}
              {...register("description")}
              placeholder="A brief description of the book..."
              className={`${inputStyles} pt-3`}
            />
          </Field>

          {/* Submit */}
          <div className="flex justify-end border-t border-slate-100 pt-6 dark:border-slate-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" className="border-white" />
                  {isEdit ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  {isEdit ? <FaSave /> : <FaPlus />}
                  {isEdit ? "Save Changes" : "Create Book"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
