import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

const getQuestionsBySubject = async (subjectId, limit = 10) => {
  const response = await axios.get(
    `${API_BASE_URL}/questions/subject/${subjectId}`,
    { params: { limit } }
  );
  console.log("Hämtade frågor från backend:", response.data);
  return response.data;
};

export default getQuestionsBySubject;
