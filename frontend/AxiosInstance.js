import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://college-event-management-backend.onrender.com",
  withCredentials: true,
});

export default AxiosInstance;
