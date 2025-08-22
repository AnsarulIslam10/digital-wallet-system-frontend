import axios from "axios";
import config from "@/config";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

/**
 * Attach Authorization header from localStorage
 */
axiosInstance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    cfg.headers = cfg.headers ?? {};
    (cfg.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return cfg;
});

/**
 * On 401, nuke tokens and kick to /login
 */
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
