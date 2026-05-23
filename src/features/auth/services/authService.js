import axios from "@lib/axios";
import { getCurrentUser as getUser, getUserId } from "@shared/utils/auth";
import { STORAGE_KEYS } from "@shared/constants/config";
import { AUTH_ENDPOINTS } from "@shared/constants/apiEndpoints";

// POST /api/auth/login - Skicka magic link
const sendMagicLink = async (email) => {
  const response = await axios.post(AUTH_ENDPOINTS.LOGIN, { email });
  return response.data; // Backend returnerar: "Länk skickat till: email"
};

// POST /api/auth/verify-jwt - Verifiera token och få JWT
const verifyTokenWithJwt = async (token) => {
  // VIKTIGT: Backend använder POST med body { token: "..." }
  const response = await axios.post(AUTH_ENDPOINTS.VERIFY_JWT, { token });

  // Spara JWT token och användardata
  if (response.data.token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
  }

  return response.data; // Returnerar JwtResponseDTO
};

const validateTokenWithBackend = async () => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    return null;
  }

  try {
    // Anropa en skyddad endpoint för att validera token
    const response = await axios.get(AUTH_ENDPOINTS.ME);
    return response.data;
  } catch (error) {
    // VIKTIGT: Logga INTE ut här! Låt useAuth hantera det
    console.error(
      "❌ validateTokenWithBackend fel:",
      error.response?.status || error.message,
    );
    throw error; // Kasta vidare felet till useAuth
  }
};

// Logga ut
const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Hämta nuvarande användare
const getCurrentUser = () => {
  return getUser();
};

const isTokenValid = () => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  const user = localStorage.getItem(STORAGE_KEYS.USER);

  // Enkel validering - du kan utöka med JWT expiry check
  return !!(token && user);
};

// Kontrollera om inloggad
const isAuthenticated = () => {
  return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export default {
  sendMagicLink,
  verifyTokenWithJwt,
  logout,
  getCurrentUser,
  getUserId,
  isAuthenticated,
  isTokenValid,
  validateTokenWithBackend,
};
