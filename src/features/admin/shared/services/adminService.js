/**
 * ==========================================
 * ADMIN SERVICE
 * ==========================================
 * Service för admin-specifika API-anrop
 * Använder AdminService backend för aggregerad data
 */

import axios from "@lib/axios";
import { ADMIN_ENDPOINTS } from "@shared/constants/apiEndpoints";

/**
 * Hämta alla användare med komplett information
 * Anropar AdminService som aggregerar data från UserService, PaymentService etc.
 */
const getAllUsersComplete = async () => {
  const response = await axios.get(ADMIN_ENDPOINTS.USERS_COMPLETE);
  return response.data;
};

/**
 * Hämta en användare med komplett information
 * @param {number} userId - Användar-ID
 */
const getUserComplete = async (userId) => {
  const response = await axios.get(ADMIN_ENDPOINTS.USER_COMPLETE(userId));
  return response.data;
};

/**
 * Uppdatera användarinformation
 * @param {number} userId - Användar-ID
 * @param {object} userData - Uppdaterad användardata
 */
const updateUser = async (userId, userData) => {
  const response = await axios.put(
    ADMIN_ENDPOINTS.USER_UPDATE(userId),
    userData,
  );
  return response.data;
};

/**
 * Hämta statistik för dashboard
 */
const getDashboardStats = async () => {
  try {
    const response = await axios.get(ADMIN_ENDPOINTS.DASHBOARD_STATS);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export default {
  getAllUsersComplete,
  getUserComplete,
  updateUser,
  getDashboardStats,
};
