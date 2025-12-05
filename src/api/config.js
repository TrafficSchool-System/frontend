import axios from "axios";

//Backend körs på port 8080
const API_BASE_URL = "http://localhost:8080"; 

//Skapa axios-instans
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }, 
    timeout: 10000, 
}); 

//Lägg till JWT token automatiskt 
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken"); 
        if(token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config; 
    }, 
    (error) => {
        return Promise.reject(error); 
    }
); 


//Hantera fel och retry vid 503
apiClient.interceptors.response.use(
    (response) => {
        return response; 
    }, 
    async (error) => {
        const config = error.config;
        
        // Retry vid 503 (Service Unavailable) - när service inte är redo än
        if (error.response?.status === 503 && !config._retry) {
            config._retry = true;
            console.log('🔄 Service unavailable, retrying in 2 seconds...');
            await new Promise(resolve => setTimeout(resolve, 2000)); // Vänta 2 sekunder
            return apiClient(config); // Försök igen
        }
        
        // Skicka vidare originalet så att komponenterna kan komma åt err.response
        return Promise.reject(error);
    }
); 

export default apiClient; 