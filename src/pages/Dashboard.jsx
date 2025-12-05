// frontend/src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';
import DashboardStatCard from '../components/dashboard/DashboardStatCard';
import RecentResultItem from '../components/dashboard/RecentResultItem';
import MilestonesSection from '../components/dashboard/MilestoneSection';

const Dashboard = () => {
    const navigate = useNavigate();
    const { stats, recentResults, loading, error } = useDashboard();
    const user = JSON.parse(localStorage.getItem('user'));

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Laddar dashboard...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Välkomstsektion */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold">
                    👋 Välkommen {user.firstName}!
                </h1>
                <p className="text-gray-600 mt-2">
                    📅 {new Date().toLocaleDateString('sv-SE', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </p>
            </div>

            {/* Statistikkort */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <DashboardStatCard 
                        icon="📊"
                        label="Totalt Prov"
                        value={stats.totalExams}
                        color="bg-blue-50"
                    />
                    <DashboardStatCard 
                        icon="✅"
                        label="Godkända"
                        value={stats.passedExams}
                        color="bg-green-50"
                    />
                    <DashboardStatCard 
                        icon="📈"
                        label="Genomsnitt"
                        value={`${stats.averagePercentage}%`}
                        color="bg-purple-50"
                    />
                </div>
            )}

            {/* Milstolpar */}
            <MilestonesSection stats={stats} />

            {/* Snabbåtgärder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => navigate('/quiz/final')}
                    className="p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left"
                >
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-xl font-bold">Starta Slutprov</div>
                    <div className="text-sm opacity-90">Gör ditt körkortsprov nu</div>
                </button>
                
                <button
                    onClick={() => navigate('/results')}
                    className="p-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left"
                >
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-xl font-bold">Visa Alla Resultat</div>
                    <div className="text-sm opacity-90">Se din provhistorik</div>
                </button>
            </div>

            {/* Senaste Resultat */}
            {recentResults.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Senaste Provresultat</h2>
                    <div>
                        {recentResults.map(result => (
                            <RecentResultItem key={result.id} result={result} />
                        ))}
                    </div>
                    <button
                        onClick={() => navigate('/results')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Visa alla resultat →
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;