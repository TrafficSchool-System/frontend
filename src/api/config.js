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


//Hantera fel
apiClient.interceptors.response.use(
    (response) => {
        return response; 
    }, 
    (error) => {
        // Skicka vidare originalet så att komponenterna kan komma åt err.response
        return Promise.reject(error);
    }
); 

export default apiClient; 