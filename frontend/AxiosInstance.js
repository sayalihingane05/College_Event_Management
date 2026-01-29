import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL?.replace(/\/$/, ""),
  withCredentials: true,
});

export default AxiosInstance;
