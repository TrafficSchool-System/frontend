/**
 * =============================================================================
 * API ENDPOINTS CONFIGURATION
 * =============================================================================
 *
 * Centralized configuration for all API endpoints in TrafficSchool system.
 * REFACTORED for RESTful conventions and clean architecture.
 *
 * ARCHITECTURE:
 * -----------
 * All requests go through API Gateway (localhost:8080) which routes to the
 * correct microservice based on URL pattern. Gateway handles JWT validation
 * and sets authentication headers (X-User-Id, X-User-Email, X-User-Role).
 *
 * SERVICES:
 * ---------
 * • UserService    - User management, auth, subscriptions
 * • QuizService    - Quiz questions, Excel import
 * • ExamService    - Exam logic, results
 * • PaymentService - Payments, packages
 * • AdminService   - Admin aggregation (combines data from multiple services)
 *
 * RESTFUL PATTERNS:
 * ----------------
 * • Resource-oriented URLs (nouns, not verbs)
 * • /api/{resource}/** for user operations
 * • /api/admin/{resource}/** for admin operations
 * • Proper HTTP methods (GET, POST, PUT, DELETE)
 *
 * USAGE:
 * -----------
 * import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '@shared/constants/apiEndpoints';
 *
 * axios.get(AUTH_ENDPOINTS.ME)
 * axios.post(EXAM_ENDPOINTS.START)
 *
 * @author TrafficSchool Development Team
 * @version 3.0 - RESTful Refactor
 */

// =============================================================================
// BASE CONFIGURATION
// =============================================================================

const API_BASE = "/api";

// =============================================================================
// AUTHENTICATION & USER PROFILE
// UserService via Gateway
// =============================================================================

/**
 * Authentication endpoints for magic link flow and user profile
 */
export const AUTH_ENDPOINTS = {
  /** POST - Create new user account (no payment required) */
  REGISTER: `${API_BASE}/users`,

  /** POST - Request magic link via email */
  LOGIN: `${API_BASE}/auth/login`,

  /** GET - Verify token (without JWT) */
  VERIFY: `${API_BASE}/auth/verify`,

  /** POST - Verify token and get JWT (RESTful: creating a token resource) */
  VERIFY_JWT: `${API_BASE}/auth/tokens`,

  /** GET - Get authenticated user's profile (requires JWT) */
  ME: `${API_BASE}/users/me`,

  /** GET - Test authentication (development endpoint) */
  TEST_AUTH: `${API_BASE}/users/test-auth`,
};

// =============================================================================
// QUIZ MANAGEMENT
// QuizService via Gateway
// =============================================================================

/**
 * Quiz endpoints for fetching questions and managing Excel import
 */
export const QUIZ_ENDPOINTS = {
  // -------------------------------------------------------------------------
  // USER ENDPOINTS
  // -------------------------------------------------------------------------

  /** GET - Get quiz questions by subjects (practice quiz) */
  SESSIONS: `${API_BASE}/quizzes/sessions`,

  /** GET - Get random questions for final exam */
  FINAL_EXAM: `${API_BASE}/quizzes/final-exam`,

  /** GET - Get image for question */
  IMAGE: (imageName) => `${API_BASE}/quizzes/images/${imageName}`,
};

// =============================================================================
// EXAM MANAGEMENT
// ExamService via Gateway
// =============================================================================

/**
 * Exam endpoints for exam flow and result management
 */
export const EXAM_ENDPOINTS = {
  // -------------------------------------------------------------------------
  // USER ENDPOINTS
  // -------------------------------------------------------------------------

  /** POST - Start new exam (requires active subscription) */
  START: `${API_BASE}/exams`,

  /** GET - Get status of active exam */
  STATUS: `${API_BASE}/exams/active`,

  /** POST - Submit answer for question */
  ANSWER: `${API_BASE}/exams/active/answers`,

  /** POST - Finish exam and get results */
  FINISH: `${API_BASE}/exams/active/submission`,

  /** GET - Get result for latest exam */
  RESULT: `${API_BASE}/exams/latest/result`,

  /** GET - Get all previous exam results */
  RESULTS: `${API_BASE}/exams`,

  /** GET - Get statistics for user's exams */
  STATS: `${API_BASE}/exams/statistics`,
};

// =============================================================================
// PAYMENT & SUBSCRIPTION MANAGEMENT
// PaymentService + UserService via Gateway
// =============================================================================

/**
 * Payment and subscription endpoints
 * Combines PaymentService (packages, payments) and UserService (subscriptions)
 */
export const PAYMENT_ENDPOINTS = {
  // -------------------------------------------------------------------------
  // PACKAGE ENDPOINTS (PaymentService)
  // -------------------------------------------------------------------------

  /** GET - Get all active packages */
  PACKAGES: `${API_BASE}/packages`,

  /** GET - Get specific package by ID */
  PACKAGE_BY_ID: (id) => `${API_BASE}/packages/${id}`,

  // -------------------------------------------------------------------------
  // PAYMENT ENDPOINTS (PaymentService)
  // -------------------------------------------------------------------------

  /** POST - Create payment for package (RESTful: creating payment resource) */
  PAYMENT_CREATE: `${API_BASE}/payments`,

  /** GET - Check payment status */
  PAYMENT_STATUS: (id) => `${API_BASE}/payments/${id}`,

  // -------------------------------------------------------------------------
  // SUBSCRIPTION ENDPOINTS (UserService)
  // -------------------------------------------------------------------------

  /** GET - Get all subscriptions for user */
  SUBSCRIPTION_USER: (userId) => `${API_BASE}/subscriptions/user/${userId}`,

  /** GET - Get active subscriptions for user */
  SUBSCRIPTION_ACTIVE: (userId) =>
    `${API_BASE}/subscriptions/user/${userId}/active`,

  /** GET - Get specific subscription */
  SUBSCRIPTION_BY_ID: (id) => `${API_BASE}/subscriptions/${id}`,
};

// =============================================================================
// ADMIN AGGREGATION & MANAGEMENT
// Multiple Services via Gateway - ADMIN ONLY
// =============================================================================

/**
 * Admin endpoints for aggregated data and management operations
 * Combines AdminService (aggregation) with direct service access
 */
export const ADMIN_ENDPOINTS = {
  // -------------------------------------------------------------------------
  // USER MANAGEMENT (AdminService - Aggregated Data)
  // -------------------------------------------------------------------------

  /** GET - Get all users with aggregated data (AdminService aggregation) */
  USERS: `${API_BASE}/admin/users`,

  /** GET - Get complete user details with aggregated data */
  USER_DETAILS: (userId) => `${API_BASE}/admin/users/${userId}`,

  /** PUT - Update user information */
  USER_UPDATE: (userId) => `${API_BASE}/admin/users/${userId}`,

  /** DELETE - Delete user (permanent) */
  USER_DELETE: (userId) => `${API_BASE}/admin/users/${userId}`,

  /** GET - Get user statistics */
  USER_STATISTICS: `${API_BASE}/admin/users/statistics`,

  /** POST - Create user with subscription (admin creates user + assigns package) */
  CREATE_USER_WITH_SUBSCRIPTION: `${API_BASE}/admin/users`,

  // -------------------------------------------------------------------------
  // EXAM MANAGEMENT (ExamService)
  // -------------------------------------------------------------------------

  /** GET - Get system-wide exam statistics */
  EXAM_STATISTICS: `${API_BASE}/admin/exams/statistics`,

  /** GET - Get exams for specific user */
  USER_EXAMS: (userId) => `${API_BASE}/admin/users/${userId}/exams`,

  // -------------------------------------------------------------------------
  // QUIZ MANAGEMENT (QuizService)
  // -------------------------------------------------------------------------

  /** GET - Get all quiz questions */
  QUIZ_ALL: `${API_BASE}/admin/quizzes`,

  /** GET - Get specific quiz question */
  QUIZ_QUESTION: (id) => `${API_BASE}/admin/quizzes/${id}`,

  /** PUT - Update quiz question */
  QUIZ_UPDATE: (id) => `${API_BASE}/admin/quizzes/${id}`,

  /** POST - Import questions from Excel */
  QUIZ_IMPORT: `${API_BASE}/admin/quizzes/imports`,

  /** GET - Get all imported Excel files */
  QUIZ_FILES: `${API_BASE}/admin/quizzes/files`,

  /** DELETE - Delete Excel file */
  QUIZ_DELETE_FILE: (id) => `${API_BASE}/admin/quizzes/files/${id}`,

  // -------------------------------------------------------------------------
  // PAYMENT MANAGEMENT (PaymentService)
  // -------------------------------------------------------------------------

  /** GET - Get all payments in system */
  PAYMENTS: `${API_BASE}/admin/payments`,

  /** GET - Get payments for specific user */
  USER_PAYMENTS: (userId) => `${API_BASE}/admin/users/${userId}/payments`,

  /** POST - Create new package */
  PACKAGE_CREATE: `${API_BASE}/admin/packages`,

  /** PUT - Update package */
  PACKAGE_UPDATE: (id) => `${API_BASE}/admin/packages/${id}`,

  /** DELETE - Delete package */
  PACKAGE_DELETE: (id) => `${API_BASE}/admin/packages/${id}`,

  // -------------------------------------------------------------------------
  // ADMIN AUTH (AdminService)
  // -------------------------------------------------------------------------

  /** POST - Admin login */
  AUTH_LOGIN: `${API_BASE}/admin/auth/login`,

  /** GET - Validate admin token */
  AUTH_VALIDATE: `${API_BASE}/admin/auth/tokens`,
};
