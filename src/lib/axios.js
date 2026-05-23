import axios from "axios";
import { API_CONFIG } from "@shared/constants/config";

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// 🔐 JWT interceptor – USER + ADMIN
apiClient.interceptors.request.use(
  (config) => {
    // Kolla om request är admin-relaterad (säker check med optional chaining)
    const isAdminRequest = config.url?.includes("/api/admin") ?? false;

    // Kolla om vi är på en admin-sida
    const isOnAdminPage = window.location.pathname.startsWith("/admin");

    // Använd adminToken om:
    // 1. URL innehåller /api/admin ELLER
    // 2. Vi är på en admin-sida (dashboard, user management, etc.)
    const token =
      isAdminRequest || isOnAdminPage
        ? localStorage.getItem("adminToken")
        : localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 🔁 Retry vid 503
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 503 && !config._retry) {
      config._retry = true;
      await new Promise((resolve) =>
        setTimeout(resolve, API_CONFIG.RETRY_DELAY),
      );
      return apiClient(config);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
