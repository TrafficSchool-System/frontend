import axios from "../../api/config";

const ADMIN_AUTH_URL = "/admin-service/api/admin/auth"; // Via API Gateway

// Login för admin (username + password)
const loginAdmin = async (username, password) => {
    const response = await axios.post(`${ADMIN_AUTH_URL}/login`, {
        username,
        password
    });

    // Spara admin JWT token och admin data
    if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify({
            adminId: response.data.adminId,
            username: response.data.username,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName
        }));
    }

    return response.data;
};

// Validera admin token
const validateAdminToken = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
        return null;
    }

    try {
        const response = await axios.get(`${ADMIN_AUTH_URL}/validate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; // { adminId, username, role: "ADMIN" }
    } catch (error) {
        // Token ogiltig - rensa localStorage
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
    isAdminAuthenticated
};