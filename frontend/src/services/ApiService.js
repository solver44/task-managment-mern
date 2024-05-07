import axios from "axios";
import history from "../utils/history.js";
import { toast } from "react-toastify";

const AxiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosService.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
AxiosService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 429) {
      toast.error(error.response.data);
    }
    //Unathorized
    else if (error?.response?.status === 401) {
      sessionStorage.clear();
      if (error.response?.data?.message)
        toast.error(error.response.data.message);

      history.replace("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else return Promise.reject(error);
  }
);

export default AxiosService;
