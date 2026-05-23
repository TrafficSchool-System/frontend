/**
 * ==========================================
 * PACKAGE SERVICE
 * ==========================================
 * API-anrop för att hantera prenumerationspaket
 * Admin-funktioner för CRUD operations
 */

import axios from "@/lib/axios";

const API_BASE_URL = "/api/packages";

const packageService = {
  /**
   * Hämta alla paket (ADMIN)
   * Använder admin endpoint för att hämta ALLA paket (både aktiva och inaktiva)
   */
  async getAllPackages() {
    const response = await axios.get("/api/admin/packages");
    return response.data;
  },

  /**
   * Hämta endast aktiva paket (används inte längre - alla paket hämtas)
   */
  async getActivePackages() {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  /**
   * Hämta specifikt paket via ID
   */
  async getPackageById(id) {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Skapa nytt paket (ADMIN)
   * Använder admin endpoint
   */
  async createPackage(packageData) {
    const response = await axios.post("/api/admin/packages", packageData);
    return response.data;
  },

  /**
   * Uppdatera befintligt paket (ADMIN)
   * Använder admin endpoint
   */
  async updatePackage(id, packageData) {
    const response = await axios.put(`/api/admin/packages/${id}`, packageData);
    return response.data;
  },

  /**
   * Radera paket (ADMIN)
   * Använder admin endpoint
   */
  async deletePackage(id) {
    const response = await axios.delete(`/api/admin/packages/${id}`);
    return response.data;
  },

  /**
   * Aktivera/Inaktivera paket genom att uppdatera active-flaggan
   * Använder admin status endpoint
   */
  async togglePackageStatus(id, active) {
    const response = await axios.put(`/api/admin/packages/${id}/status`, {
      active,
    });
    return response.data;
  },
};

export default packageService;
