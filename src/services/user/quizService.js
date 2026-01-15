import axios from "../../api/config";

const USER_URL = "/quiz-service/api/questions"; // Gateway prefix + service path
const ADMIN_URL = "/quiz-service/api/admin/quizzes";
const IMAGE_URL = "/quiz-service/api/quiz/images"; // ← LÄGG TILL DENNA

// === USER ENDPOINTS ===

// Övningsquiz
const getQuestionsBySubjects = async (subjects, limit = 10) => {
  const response = await axios.get(`${USER_URL}/subjects`, {
    params: { subjects: subjects.join(","), limit },
  });
  return response.data;
};

// Slutprov
const getFinalExam = async () => {
  const response = await axios.get(`${USER_URL}/questions/final-exam`);
  return response.data;
};

// === ADMIN ENDPOINTS ===

// Hämta Excelfiler
const getAllExcelFiles = async () => {
  const resposne = await axios.get(`${ADMIN_URL}/files`);
  return resposne.data;
};

// Ladda upp Excelfil
const uploadExcelFile = async (file, dryRun = false) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("dryRun", dryRun.toString());

  const response = await axios.post(`${ADMIN_URL}/import`, formData);
  return response.data;
};

// Ta bort Excelfil
const deleteExcelFile = async (id) => {
  const resposne = await axios.delete(`${ADMIN_URL}/files/${id}`);
  return resposne.data;
};

// Uppdatera en fråga
const updateQuestion = async (id, payload) => {
  const response = await axios.put(`${ADMIN_URL}/update/${id}`, payload);
  return response.data;
};
const getQuestionById = async (id) => {
  const response = await axios.get(`${ADMIN_URL}/${id}`);
  return response.data;
};

const getAllQuestions = async () => {
  const response = await axios.get(`${ADMIN_URL}`);
  return response.data;
};

// === IMAGE ENDPOINTS ===

const getImageUrl = (imageName) => {
  if (!imageName || imageName.trim() === "") {
    return null;
  }
  // Bilder serveras via Gateway
  return `${axios.defaults.baseURL}${IMAGE_URL}/${imageName}`;
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
