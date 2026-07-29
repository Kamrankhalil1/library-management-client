import axiosInstance from "../utils/axiosInstance";

const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);

  return response.data;
};

const register = async (data) => {
  const response = await axiosInstance.post("/auth/signup", data);

  return response.data;
};

export default {
  login,
  register,
};