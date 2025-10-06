import { useEffect, useState } from "react"
import authService from "../services/authService";


export const useAuth = () =>{
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const initializeAuth = async () => {
            try{
                // STEG 1: Kolla URL för token (från email-länk)
                const urlParams = new URLSearchParams(window.location.search); 
                const urlToken = urlParams.get('token'); 

                if (urlToken) {
                    console.log('🔗 Token hittad i URL, loggar in automatiskt...'); 

                    // STEG 2: Verifiera URL token automatiskt
                    const response = await authService.verifyTokenWithJwt(urlToken); 
                    setUser(response.user); 

                    // STEG 3: Resna URL (Ta bort ?token=...)
                    window.history.replaceState({}, document.title, window.location.pathname);

                    console.log('✅ Automatisk inloggning lyckades!', response.user);

                } else {
                    // Steg 4: Ingen URL token - kolla befintlig JWT
                    const existingToken = localStorage.getItem('authToken');
                    if(existingToken) {
                        try{
                            // Validera befintlig JWT genom att hämta användardata
                            const user = authService.getCurrentUser();
                            if(user) {
                                setUser(user); 
                                console.log('🔑 Befintlig session återställd:', user);
                            } else {
                                throw new Error('Ingen användare i localStorage'); 
                            }
                        } catch (error) {
                            console.warn('⚠️ Ogiltig befintlig session, rensar localStorage'); 
                            authService.logout(); 
                        }
                    }
                }
            } catch (error) {
                console.error('❌ Autentiseringsfel:', error); 
                setError(error.response?.data?.message || 'Autentisering misslyckades'); 

                // Rensa ogiltig data
                authService.logout(); 
            } finally {
                setLoading(false); 
            }
        };

        initializeAuth(); 
    }, []);

    // Login funktion för komponenter
    const login = (response) => {
        setUser(response.user || response); 
        setError(null); 
        console.log('👤 Användare inloggad:', response.user || response);
    }


    // Logut funktiner för komponenter
    const logout = () => {
        authService.logout(); 
        setUser(null); 
        setError(null); 
        console.log('Användaren utloggad'); 
    }

    // Clear error funktion
    const clearError = () => {
        setError(null);
    };

    return {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated: !!user
  };

   
}; 

