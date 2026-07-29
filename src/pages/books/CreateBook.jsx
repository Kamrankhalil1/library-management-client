import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { createBookSchema } from "../../validations/bookSchema";
import bookService from "../../services/bookService";

function CreateBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createBookSchema),
  });

  const onSubmit = async (data) => {
    console.log("DATA SENT:", JSON.stringify(data, null, 2));

    try {
      await bookService.createBook(data);

      toast.success("Book created successfully");
      reset();
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log(
        "Response:",
        JSON.stringify(error.response?.data, null, 2)
      );
      toast.error(
        error.response?.data?.message || "Failed to create book"
      );
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow dark:bg-slate-800">
      <h1 className="mb-6 text-3xl font-bold text-slate-800 dark:text-slate-100">
        Add New Book
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Title
          </label>

          <input
            {...register("title")}
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.title?.message}
          </p>
        </div>

        {/* Author */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Author
          </label>

          <input
            {...register("author")}
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.author?.message}
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Category
          </label>

          <input
            {...register("category")}
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.category?.message}
          </p>
        </div>

        {/* ISBN */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            ISBN
          </label>

          <input
            {...register("isbn")}
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.isbn?.message}
          </p>
        </div>

        {/* Published Year */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Published Year
          </label>

          <input
            type="number"
            {...register("publishedYear", {
              valueAsNumber: true,
            })}
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.publishedYear?.message}
          </p>
        </div>

        {/* Total Copies */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Total Copies
          </label>

          <input
            type="number"
            {...register("totalCopies", {
              valueAsNumber: true,
            })}
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.totalCopies?.message}
          </p>
        </div>

        {/* Available Copies */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Available Copies
          </label>

          <input
            type="number"
            {...register("availableCopies", {
              valueAsNumber: true,
            })}
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.availableCopies?.message}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Description
          </label>

          <textarea
            rows={4}
            {...register("description")}
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.description?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-slate-800 py-3 text-white transition hover:bg-slate-900 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isSubmitting ? "Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
}

export default CreateBook;