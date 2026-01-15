import axios from "../../api/config"

const USER_URL = "/exam-service/api/exam"
const ADMIN_URL = "/exam-service/api/admin/exams"

// === USER ENDPOINTS ===

// Starta nytt prov
const startExam = async (userId) => {
    const response = await axios.post(`${USER_URL}/start?userId=${userId}`); 
    return response.data; // ExamSessionDTO
}

// Hämta status för pågående prov
const getExamStatus = async (userId) => {
        const response = await axios.get(`${USER_URL}/status?userId=${userId}`); 
        return response.data; // ExamSessionDTO
    
}

// Spara svar
const saveAnswer = async (userId, questionId, selectedAnswer) => {
    const response = await axios.post(`${USER_URL}/answer`, {
        userId,
        questionId,
        selectedAnswer
    });
    return response.data; // Svar sparat
}

// Avsluta prov
const finishExam = async (userId) => {
    const response = await axios.post(`${USER_URL}/finish?userId=${userId}`);
    return response.data; 
}

// Hämta resultat efter avslutat prov
const getExamResult = async (userId) => {
    const response = await axios.get(`${USER_URL}/result?userId=${userId}`);
    return response.data; 
}

// Hämta alla provresultat för en användare 
const getAllExamResults = async (userId) => {
    const response = await axios.get(`${USER_URL}/results?userId=${userId}`);
    return response.data; 
}

// Hämta exam statestik för användare 
const getExamStats = async (userId) => {
    const response = await axios.get(`${USER_URL}/stats?userId=${userId}`);
    return response.data; 
}

// === ADMIN ENDPOINTS ===
const getExamCounts = async () => {
    const response = await axios.get(`${ADMIN_URL}/counts`); 
    return response.data; // { activeExams, completedExams }
} 

export default {
    startExam, 
    getExamStatus,
    saveAnswer,
    finishExam,
    getExamResult,
    getAllExamResults,
    getExamStats, 
    getExamCounts,
} 