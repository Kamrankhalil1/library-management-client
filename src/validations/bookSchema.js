import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(2, "Title is required"),

  author: z.string().min(2, "Author is required"),

  category: z.string().min(2, "Category is required"),

  isbn: z.string().min(5, "ISBN is required"),

  publishedYear: z.coerce
    .number()
    .min(1000, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year"),

  totalCopies: z.coerce
    .number()
    .min(1, "Total copies must be at least 1"),

  availableCopies: z.coerce
    .number()
    .min(0, "Available copies cannot be negative"),

  description: z.string().optional(),
});

export const updateBookSchema = createBookSchema.partial();