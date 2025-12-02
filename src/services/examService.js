import axios from "../api/config"

const EXAM_URL = "/exam-service/api/exam"

// Starta nytt prov
const startExam = async (userId) => {
    const response = await axios.post(`${EXAM_URL}/start?userId=${userId}`); 
    return response.data; // ExamSessionDTO
}

// Hämta status för pågående prov
const getExamStatus = async (userId) => {
    try {
        const response = await axios.get(`${EXAM_URL}/status?userId=${userId}`); 
        return response.data; // ExamSessionDTO
    } catch (error) {
        // 404 betyder att det inte finns någon pågående session - det är okej
        if (error.response && error.response.status === 404) {
            return null;
        }
        // Andra fel ska kastas vidare
        throw error;
    }
}

// Spara svar
const saveAnswer = async (userId, questionId, selectedAnswer) => {
    const response = await axios.post(`${EXAM_URL}/answer?userId=${userId}&questionId=${questionId}&selectedAnswer=${selectedAnswer}`);
    return response.data; // Svar sparat
}

// Avsluta prov
const finishExam = async (userId) => {
    const response = await axios.post(`${EXAM_URL}/finish?userId=${userId}`);
    return response.data; 
}

export default {
    startExam, 
    getExamStatus,
    saveAnswer,
    finishExam,
} 