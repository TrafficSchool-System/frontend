import axios from "@lib/axios";
import {
  ADMIN_ENDPOINTS,
  AUTH_ENDPOINTS,
} from "@shared/constants/apiEndpoints";

// === USER ENDPOINTS ===

// POST /api/users - Registrera ny användare
const registerUser = async (userData) => {
  const response = await axios.post(AUTH_ENDPOINTS.REGISTER, userData);
  return response.data; // Returnerar UserResponseDTO
};

// === ADMIN ENDPOINTS ===

// GET /api/admin/users/{id} - Hämta användare med ID (ADMIN ONLY)
const getUserById = async (id) => {
  const response = await axios.get(ADMIN_ENDPOINTS.USER_DETAILS(id));
  return response.data; // Returnerar UserResponseDTO
};

// GET /api/users/email/{email} - Hämta användare med email
// OBS: Detta endpoint finns inte implementerat i backend
const getUserByEmail = async (email) => {
  throw new Error(
    "getUserByEmail is not implemented in backend. Use getAllUsers() and filter client-side instead.",
  );
};

// GET /api/admin/users - Hämta alla användare (ADMIN ONLY)
const getAllUsers = async () => {
  const response = await axios.get(ADMIN_ENDPOINTS.USERS);
  return response.data;
};

// PUT /api/admin/users/{id} - Uppdatera användare (ADMIN ONLY)
const updateUser = async (id, userData) => {
  const response = await axios.put(ADMIN_ENDPOINTS.USER_UPDATE(id), userData);
  return response.data;
};

// DELETE /api/admin/users/{id} - Ta bort användare (ADMIN ONLY)
const deleteUser = async (id) => {
  const response = await axios.delete(ADMIN_ENDPOINTS.USER_DELETE(id));
  return response.data;
};

// GET /api/admin/users/statistics - Hämta statistik om användare (ADMIN ONLY)
const getTotalUsers = async () => {
  const response = await axios.get(ADMIN_ENDPOINTS.USER_STATISTICS);
  return response.data;
};

export default {
  registerUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  getTotalUsers,
};
