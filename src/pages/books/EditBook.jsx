import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import bookService from "../../services/bookService";
import { createBookSchema } from "../../validations/bookSchema";

function EditBook() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(createBookSchema),
  });

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await bookService.getBookById(id);
        reset(response.data);
      } catch (error) {
        toast.error("Failed to fetch book details");
      }
    };

    loadBook();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await bookService.updateBook(id, data);
      toast.success("Book updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow dark:bg-slate-800">
      <h1 className="mb-6 text-3xl font-bold text-slate-800 dark:text-slate-100">
        Edit Book
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            {...register("author")}
            placeholder="Author"
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            {...register("category")}
            placeholder="Category"
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            {...register("isbn")}
            placeholder="ISBN"
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="number"
            {...register("totalCopies", { valueAsNumber: true })}
            placeholder="Total Copies"
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="number"
            {...register("availableCopies", { valueAsNumber: true })}
            placeholder="Available Copies"
            className="w-full rounded border border-gray-300 p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full rounded bg-blue-700 px-6 py-3 font-medium text-white transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditBook;