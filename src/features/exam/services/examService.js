import axios from "@lib/axios";
import {
  EXAM_ENDPOINTS,
  ADMIN_ENDPOINTS,
} from "@shared/constants/apiEndpoints";

/**
 * EXAM SERVICE
 *
 * Service layer for exam operations.
 * All endpoints automatically include user authentication via JWT (handled by Gateway).
 * User ID is extracted from JWT token by API Gateway, no need to pass it explicitly.
 *
 * REFACTORED for RESTful conventions:
 * - POST /exams (start exam)
 * - GET /exams/active (get status)
 * - POST /exams/active/answers (save answer)
 * - POST /exams/active/submission (finish exam)
 * - GET /exams/latest/result (get latest result)
 * - GET /exams (get all results)
 * - GET /exams/statistics (get user stats)
 */

// === USER ENDPOINTS ===

/**
 * Start new exam
 * POST /api/exams
 * User ID automatically extracted from JWT by Gateway
 */
const startExam = async () => {
  const response = await axios.post(EXAM_ENDPOINTS.START);
  return response.data; // ExamSessionDTO
};

/**
 * Get active exam status
 * GET /api/exams/active
 */
const getExamStatus = async () => {
  const response = await axios.get(EXAM_ENDPOINTS.STATUS);
  return response.data; // ExamSessionDTO
};

/**
 * Save answer for current question
 * POST /api/exams/active/answers
 */
const saveAnswer = async (questionId, selectedAnswer) => {
  const response = await axios.post(EXAM_ENDPOINTS.ANSWER, {
    questionId,
    selectedAnswer,
  });
  return response.data; // Answer saved confirmation
};

/**
 * Finish exam and get results
 * POST /api/exams/active/submission
 */
const finishExam = async () => {
  const response = await axios.post(EXAM_ENDPOINTS.FINISH);
  return response.data; // ExamResultDTO
};

/**
 * Get result for latest exam
 * GET /api/exams/latest/result
 */
const getExamResult = async () => {
  const response = await axios.get(EXAM_ENDPOINTS.RESULT);
  return response.data; // ExamResultDTO
};

/**
 * Get all exam results for authenticated user
 * GET /api/exams
 */
const getAllExamResults = async () => {
  const response = await axios.get(EXAM_ENDPOINTS.RESULTS);
  return response.data; // List<ExamResultDTO>
};

/**
 * Get exam statistics for authenticated user
 * GET /api/exams/statistics
 */
const getExamStats = async () => {
  const response = await axios.get(EXAM_ENDPOINTS.STATS);
  return response.data; // ExamStatsDTO
};

// === ADMIN ENDPOINTS ===

/**
 * Get system-wide exam statistics (admin only)
 * GET /api/admin/exams/statistics
 */
const getExamCounts = async () => {
  const response = await axios.get(ADMIN_ENDPOINTS.EXAM_STATISTICS);
  return response.data; // { activeExams, completedExams }
};

export default {
  startExam,
  getExamStatus,
  saveAnswer,
  finishExam,
  getExamResult,
  getAllExamResults,
  getExamStats,
  getExamCounts,
};
