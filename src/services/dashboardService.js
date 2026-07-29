/*import api from "./api";

const getStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export default {
  getStats,
};
*/
import axiosInstance from "../utils/axiosInstance";

const getStats = async () => {
  const response = await axiosInstance.get("/dashboard/stats");
  return response.data;
};

export default {
  getStats,
};
