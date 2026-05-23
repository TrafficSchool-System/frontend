/**
 * Application Configuration Constants
 * Centraliserad konfiguration för hela applikationen
 */

// -------------------------------------------------------
// 📌 API Configuration
// -------------------------------------------------------
export const API_CONFIG = {
  // Environment-aware API base URL
  // Development: http://localhost:8080
  // Production: Azure API Gateway URL
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  TIMEOUT: 10000, // 10 sekunder
  RETRY_DELAY: 2000, // 2 sekunder
};

// -------------------------------------------------------
// 📌 Quiz Configuration
// -------------------------------------------------------
export const QUIZ_CONFIG = {
  DEFAULT_QUESTION_LIMIT: 10,
  MIN_QUESTION_LIMIT: 5,
  MAX_QUESTION_LIMIT: 50,
};

// -------------------------------------------------------
// 📌 Exam Configuration
// -------------------------------------------------------
export const EXAM_CONFIG = {
  DEFAULT_DURATION_MINUTES: 50,
  WARNING_TIME_MINUTES: 5, // Varning när 5 min kvar
};

// -------------------------------------------------------
// 📌 localStorage Keys
// -------------------------------------------------------
export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  ADMIN_TOKEN: "adminToken",
  USER: "user",
};

// -------------------------------------------------------
// 📌 User Roles
// -------------------------------------------------------
export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};
