import axios, { AxiosError } from "axios";
import { ApiError } from "../../types/api.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://sirf-local-backend.vercel.app/";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    console.error("API Error:", errorMessage);
    return Promise.reject(error.response?.data || { message: errorMessage });
  },
);

export default apiClient;
