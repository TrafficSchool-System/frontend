import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 🔐 JWT interceptor – USER + ADMIN
apiClient.interceptors.request.use(
  (config) => {
    const isAdminRequest = config.url.includes("/api/admin");

    const token = isAdminRequest
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Retry vid 503
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 503 && !config._retry) {
      config._retry = true;
      console.log("🔄 Service unavailable, retrying in 2 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return apiClient(config);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
