/**
 * ==========================================
 * USER MANAGEMENT SERVICE
 * ==========================================
 * API calls for fetching complete user information
 * from AdminService (aggregates data from UserService and PaymentService)
 *
 * REFACTORED for RESTful conventions:
 * - GET /api/admin/users (list all users with aggregated data)
 * - GET /api/admin/users/{id} (get complete user details)
 * - PUT /api/admin/users/{id} (update user information)
 */

import axios from "@/lib/axios";
import { ADMIN_ENDPOINTS } from "@shared/constants/apiEndpoints";

const userManagementService = {
  /**
   * Get complete information for specific user
   * Includes: user info, subscriptions, payments, statistics
   * GET /api/admin/users/{userId}
   */
  async getCompleteUserDetails(userId) {
    const response = await axios.get(ADMIN_ENDPOINTS.USER_DETAILS(userId));
    return response.data;
  },

  /**
   * Get all users with complete information
   * NOTE: May take longer if there are many users
   * GET /api/admin/users
   */
  async getAllUsersWithDetails() {
    const response = await axios.get(ADMIN_ENDPOINTS.USERS);
    return response.data;
  },

  /**
   * Get user overview (same as complete, used for list view)
   * GET /api/admin/users
   */
  async getUsersOverview() {
    const response = await axios.get(ADMIN_ENDPOINTS.USERS);
    return response.data;
  },

  /**
   * Update user information (first name, last name)
   * PUT /api/admin/users/{userId}
   */
  async updateUserInfo(userId, userData) {
    const response = await axios.put(
      ADMIN_ENDPOINTS.USER_UPDATE(userId),
      userData,
    );
    return response.data;
  },

  /**
   * Delete user (permanent)
   * DELETE /api/admin/users/{userId}
   */
  async deleteUser(userId) {
    const response = await axios.delete(ADMIN_ENDPOINTS.USER_DELETE(userId));
    return response.data;
  },

  /**
   * Create user with subscription (admin only)
   * Creates user account, sends magic link, creates manual payment, activates subscription
   * POST /api/admin/users
   *
   * @param {Object} userData - User data with firstName, lastName, email, personalNumber, phoneNumber, packageId
   * @returns {Object} UserWithSubscriptionResponse - Complete response with user, payment, and subscription details
   */
  async createUserWithSubscription(userData) {
    const response = await axios.post(
      ADMIN_ENDPOINTS.CREATE_USER_WITH_SUBSCRIPTION,
      userData,
    );
    return response.data;
  },

  /**
  * Extend student subscription
  * PUT /api/admin/users/{userId}/subscription/extend
  */

  async extendSubscription(userId, days){
    const response = await axios.put(
      `${ADMIN_ENDPOINTS.USERS}/${userId}/subscription/extend`,
      { days }
    ); 
    return response.data;
  }
};

export default userManagementService;
