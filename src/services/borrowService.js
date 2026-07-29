import axiosInstance from "../utils/axiosInstance";

const borrowBook = async (bookId) => {
  const response = await axiosInstance.post("/borrow", {
    bookId,
  });

  return response.data;
};

const getMyBorrows = async () => {
  const response = await axiosInstance.get("/borrow/my-books");

  return response.data;
};

const returnBook = async (borrowId) => {
  const response = await axiosInstance.put(
    `/borrow/${borrowId}/return`
  );

  return response.data;
};

const getAllBorrows = async () => {
  const response = await axiosInstance.get("/borrow");

  return response.data;
};

export default {
  borrowBook,
  getMyBorrows,
  returnBook,
  getAllBorrows,
};