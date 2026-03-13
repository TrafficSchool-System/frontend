import axios from "@lib/axios";
import {
  QUIZ_ENDPOINTS,
  ADMIN_ENDPOINTS,
} from "@shared/constants/apiEndpoints";

/**
 * QUIZ SERVICE
 *
 * Service layer for quiz operations.
 * REFACTORED for RESTful conventions:
 * - GET /quizzes/sessions (get questions by subjects)
 * - GET /quizzes/final-exam (get final exam questions)
 * - GET /quizzes/images/{filename} (get question images)
 * - Admin endpoints moved to /api/admin/quizzes/**
 */

// === USER ENDPOINTS ===

/**
 * Get quiz questions by subjects
 * GET /api/quizzes/sessions?subjects=1,2,3&limit=10
 */
const getQuestionsBySubjects = async (subjects, limit = 10) => {
  const response = await axios.get(QUIZ_ENDPOINTS.SESSIONS, {
    params: { subjects: subjects.join(","), limit },
  });
  return response.data;
};

/**
 * Get final exam questions
 * GET /api/quizzes/final-exam
 */
const getFinalExam = async () => {
  const response = await axios.get(QUIZ_ENDPOINTS.FINAL_EXAM);
  return response.data;
};

// === ADMIN ENDPOINTS ===

/**
 * Get all imported Excel files (admin only)
 * GET /api/admin/quizzes/files
 */
const getAllExcelFiles = async () => {
  const response = await axios.get(ADMIN_ENDPOINTS.QUIZ_FILES);
  return response.data;
};

/**
 * Upload Excel file with quiz questions (admin only)
 * POST /api/admin/quizzes/imports
 */
const uploadExcelFile = async (file, dryRun = false) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("dryRun", dryRun.toString());

  const response = await axios.post(ADMIN_ENDPOINTS.QUIZ_IMPORT, formData);
  return response.data;
};

/**
 * Delete Excel file (admin only)
 * DELETE /api/admin/quizzes/files/{id}
 */
const deleteExcelFile = async (id) => {
  const response = await axios.delete(ADMIN_ENDPOINTS.QUIZ_DELETE_FILE(id));
  return response.data;
};

/**
 * Update quiz question (admin only)
 * PUT /api/admin/quizzes/{id}
 */
const updateQuestion = async (id, payload) => {
  const response = await axios.put(ADMIN_ENDPOINTS.QUIZ_UPDATE(id), payload);
  return response.data;
};

/**
 * Get question by ID (admin only)
 * GET /api/admin/quizzes/{id}
 */
const getQuestionById = async (id) => {
  const response = await axios.get(ADMIN_ENDPOINTS.QUIZ_QUESTION(id));
  return response.data;
};

/**
 * Get all questions (admin only)
 * GET /api/admin/quizzes
 */
const getAllQuestions = async () => {
  const response = await axios.get(ADMIN_ENDPOINTS.QUIZ_ALL);
  return response.data;
};

// === IMAGE ENDPOINTS ===

/**
 * Get image URL for quiz question
 * Images served via Gateway: GET /api/quizzes/images/{filename}
 */
const getImageUrl = (imageName) => {
  if (!imageName || imageName.trim() === "") {
    return null;
  }
  // Images served via Gateway
  return `${axios.defaults.baseURL}${QUIZ_ENDPOINTS.IMAGE(imageName)}`;
};

export default {
  getQuestionsBySubjects,
  getFinalExam,
  getAllExcelFiles,
  uploadExcelFile,
  deleteExcelFile,
  updateQuestion,
  getQuestionById,
  getAllQuestions,
  getImageUrl,
};
