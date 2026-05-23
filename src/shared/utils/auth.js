import { STORAGE_KEYS, USER_ROLES } from "@shared/constants/config";

/**
 * Auth utility functions
 * Centraliserad hantering av användardata från localStorage
 */

// -------------------------------------------------------
// 📌 Hämta hela user-objektet
// -------------------------------------------------------
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// -------------------------------------------------------
// 📌 Hämta user ID
// -------------------------------------------------------
export const getUserId = () => {
  const user = getCurrentUser();
  return user?.id || null;
};

// -------------------------------------------------------
// 📌 Hämta user email
// -------------------------------------------------------
export const getUserEmail = () => {
  const user = getCurrentUser();
  return user?.email || null;
};

// -------------------------------------------------------
// 📌 Hämta user role
// -------------------------------------------------------
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || null;
};

// -------------------------------------------------------
// 📌 Kolla om användaren är admin
// -------------------------------------------------------
export const isAdmin = () => {
  return getUserRole() === USER_ROLES.ADMIN;
};

// -------------------------------------------------------
// 📌 Kolla om användaren är inloggad
// -------------------------------------------------------
export const isAuthenticated = () => {
  return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};