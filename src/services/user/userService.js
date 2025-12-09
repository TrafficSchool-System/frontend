import axios from "../../api/config";

const USER_URL = "/user-service/api/users"; // Gateway prefix + service path

// POST /api/users/register - Registrera ny användare
const registerUser = async (userData) => {
  const response = await axios.post(`${USER_URL}/register`, userData);
  return response.data; // Returnerar UserResponseDTO
};

// GET /api/users/{id} - Hämta användare med ID
const getUserById = async (id) => {
  const response = await axios.get(`${USER_URL}/${id}`);
  return response.data; // Returnerar UserResponseDTO
};

// GET /api/users/email/{email} - Hämta användare med email
const getUserByEmail = async (email) => {
  const response = await axios.get(`${USER_URL}/email/${email}`);
  return response.data; // Returnerar UserResponseDTO
};

export default {
  registerUser,
  getUserById,
  getUserByEmail,
};