import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://college-event-management-backend.onrender.com",
  withCredentials: true,
});

export default AxiosInstance;
