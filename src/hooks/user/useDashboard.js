import { useEffect, useState } from "react";
import examService from "../../services/user/examService";

const getCurrentUserId = () => {
    const userStr = localStorage.getItem('user'); 
    if(userStr) {
        const user = JSON.parse(userStr); 
        return user.id; 
    }
    return null; 
}; 

const useDashboard = () => {
    const [stats, setStats] = useState(null); 
    const [recentResults, setRecentResults] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchDashboardData = async () => {
            const userId = getCurrentUserId();
            
            if(!userId) {
                setError("Du måste vara inloggad"); 
                setLoading(false); 
                return;
            }

            try{
                setLoading(true); 

                // Hämta statestik och resultat parallelt
                const [statsData, resultsData] = await Promise.all([
                    examService.getExamStats(userId),
                    examService.getAllExamResults(userId)
                ]); 

                setStats(statsData); 

                // Ta bara de 5 senaste resultaten 
                setRecentResults(resultsData.slice(0, 5)); 

            } catch (err) {
                console.error("Fel vid hämtning av dashboard-data: ", err);
                setError("Kunde inte ladda dashboard"); 
            } finally {
                setLoading(false); 
            }
        }; 
        fetchDashboardData(); 
    }, []);

    return { stats, recentResults, loading, error }; 
}; 

export default useDashboard; 