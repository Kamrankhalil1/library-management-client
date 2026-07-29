import axiosInstance from "../utils/axiosInstance";

const getBooks = async (params = {}) => {
  const response = await axiosInstance.get("/books", {
    params,
  });

  return response.data;
};

const getBookById = async (id) => {
  const response = await axiosInstance.get(`/books/${id}`);

  return response.data;
};

const createBook = async (data) => {
  const response = await axiosInstance.post("/books", data);

  return response.data;
};

const updateBook = async (id, data) => {
  const response = await axiosInstance.put(`/books/${id}`, data);

  return response.data;
};

const deleteBook = async (id) => {
  const response = await axiosInstance.delete(`/books/${id}`);

  return response.data;
};

export default {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};