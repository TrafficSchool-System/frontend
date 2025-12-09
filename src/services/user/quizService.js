import axios from "../../api/config";

const API_BASE_URL = "/quiz-service/api/questions"; // Gateway prefix + service path

// Övningsquiz
const getQuestionsBySubjects = async (subjects, limit = 10) => {
  const response = await axios.get(`${API_BASE_URL}/subjects`, {
    params: { subjects: subjects.join(","), limit }
  });
  return response.data;
};

// Slutprov
const getFinalExam = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions/final-exam`);
  return response.data;
};

export default {
  getQuestionsBySubjects,
  getFinalExam
};