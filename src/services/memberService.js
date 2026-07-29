import axiosInstance from "../utils/axiosInstance";

const getProfile = async () => {
  const response = await axiosInstance.get("/members/profile");
  return response.data;
};

const updateProfile = async (data) => {
  const response = await axiosInstance.put(
    "/members/profile",
    data
  );

  return response.data;
};

export default {
  getProfile,
  updateProfile,
};