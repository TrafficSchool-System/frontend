import axios from "../api/config";


const AUTH_URL = "/auth";

// POST /api/auth/login - Skicka magic link
const sendMagicLink = async (email) => {
    const response = await axios.post(`${AUTH_URL}/login`, { email });
    return response.data; //Backend retunerar: "Länk skickat till: email"
}; 

// POST /api/auth/verify - Verifiera token (utan JWT)
const verifyToken = async (token) => {
  const response = await axios.post(`${AUTH_URL}/verify`, { token });
  return response.data; // Returnerar UserResponseDTO
};

// POST /api/auth/verify-jwt - Verifiera token och få JWT
const verifyTokenWithJwt = async (token) => {
    const response = await axios.post(`${AUTH_URL}/verify-jwt`, { token });

    //Spara JWT token och användardata
    if (response.data.token) {
        localStorage.setItem("authToken", response.data.token); 
        localStorage.setItem("user", JSON.stringify(response.data.user)); 
    }

    return response.data //Retunera JwtResponseDTO
}; 

// Logga ut
const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

// Hämta nuvarande användare
const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Lägg till i authService.js efter getCurrentUser
const isTokenValid = () => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");
  
  // Enkel validering - du kan utöka med JWT expiry check
  return !!(token && user);
};

// Kontrollera om inloggad
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export default {
  sendMagicLink,
  verifyToken,
  verifyTokenWithJwt,
  logout,
  getCurrentUser,
  isAuthenticated,
  isTokenValid
};