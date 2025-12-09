
// -------------------------------------------------------
// 📌 Hjälpfunktion: hämtar ID för den inloggade användaren

import { useEffect, useState } from "react";
import examService from "../../services/user/examService";

// -------------------------------------------------------
const getCurrentUserId = () => {
    const userStr = localStorage.getItem('user'); 
    if (userStr) {
        const user = JSON.parse(userStr);
        return user.id; 
    }

    return null; 
}; 

// -------------------------------------------------------
// 📌 useExamResults — Custom hook för att hämta alla provresultat
// -------------------------------------------------------
const useExamResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            const userId = getCurrentUserId();
            
            if (!userId) {
                setError("Du måste vara inloggad"); 
                setLoading(false);
                return; 
            }

            try {
                setLoading(true); 
                const data = await examService.getAllExamResults(userId)
                setResults(data); 
            } catch (err) {
                console.error("Fel vid hämtning av resultar: ", err);
                setError("Kunde inte hämta dina provresultat"); 
            } finally {
                setLoading(false); 
            }
        };

        fetchResults();
    }, []);

    return { results, loading, error };

};

export default useExamResults; 