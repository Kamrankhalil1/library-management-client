import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import bookService from "../../services/bookService";
import BookForm from "./BookForm";
import Loader from "../../components/ui/Loader";

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await bookService.getBookById(id);
        setBook(response.data);
} catch {
        toast.error("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) {
    return <Loader label="Loading book details..." />;
  }

  if (!book) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500 dark:text-slate-400">
        Book not found.
      </div>
    );
  }

  return <BookForm mode="edit" defaultValues={book} />;
}

export default EditBook;

