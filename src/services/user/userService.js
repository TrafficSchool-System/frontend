import axios from "../../api/config";

const USER_URL = "/user-service/api/users"; // Gateway prefix + service path
const ADMIN_URL = "/user-service/api/admin/users"; // Gateway prefix + service path



// === USER ENDPOINTS ===

// POST /api/users/register - Registrera ny användare
const registerUser = async (userData) => {
  const response = await axios.post(`${USER_URL}/register`, userData);
  return response.data; // Returnerar UserResponseDTO
};


// === ADMIN ENDPOINTS ===

// GET /api/users/{id} - Hämta användare med ID
const getUserById = async (id) => {
  const response = await axios.get(`${ADMIN_URL}/${id}`);
  return response.data; // Returnerar UserResponseDTO
};

// GET /api/users/email/{email} - Hämta användare med email
const getUserByEmail = async (email) => {
  const response = await axios.get(`${ADMIN_URL}/email/${email}`);
  return response.data; // Returnerar UserResponseDTO
};

const getAllUsers = async () => {
  const response = await axios.get(`${ADMIN_URL}/all/users`);
  return response.data; 
}

const updateUser = async (id, userData) => {
  const response = await axios.put(`${ADMIN_URL}/update/${id}`, userData);
  return response.data; 
}

const deleteUser = async (id) => {
  const response = await axios.delete(`${ADMIN_URL}/delete/${id}`);
  return response.data; 
}

const getTotalUsers = async () => {
  const response = await axios.get(`${ADMIN_URL}/stats/total-users`); 
  return response.data; 
}


export default {
  registerUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser, 
  getTotalUsers,
};