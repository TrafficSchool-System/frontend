import axios from "@lib/axios";
import { ADMIN_ENDPOINTS } from "@shared/constants/apiEndpoints";

/**
 * ADMIN AUTH SERVICE
 *
 * REFACTORED for RESTful conventions:
 * - POST /api/admin/auth/login (admin login)
 * - GET /api/admin/auth/tokens (validate admin token)
 */

// Login for admin (username + password)
const loginAdmin = async (username, password) => {
  const response = await axios.post(ADMIN_ENDPOINTS.AUTH_LOGIN, {
    username,
    password,
  });

  // Save admin JWT token and admin data
  if (response.data.token) {
    localStorage.setItem("adminToken", response.data.token);
    localStorage.setItem(
      "adminUser",
      JSON.stringify({
        adminId: response.data.adminId,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      }),
    );
  }

  return response.data;
};

// Validate admin token
const validateAdminToken = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get(ADMIN_ENDPOINTS.AUTH_VALIDATE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { adminId, username, role: "ADMIN" }
  } catch (error) {
    // Token invalid - clear localStorage
    logoutAdmin();
    return null;
  }
};

// Logga ut admin
const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  console.log("Admin logged out");
};

// Hämta admin från localStorage
const getAdminUser = () => {
  const adminUser = localStorage.getItem("adminUser");
  return adminUser ? JSON.parse(adminUser) : null;
};

// Kolla om admin är inloggad
const isAdminAuthenticated = () => {
  return !!localStorage.getItem("adminToken");
};

export default {
  loginAdmin,
  validateAdminToken,
  logoutAdmin,
  getAdminUser,
  isAdminAuthenticated,
};
