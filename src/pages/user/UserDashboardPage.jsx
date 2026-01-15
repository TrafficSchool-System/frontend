import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useDashboard from '../../hooks/user/useDashboard';
import StatCard from '../../components/user/dashboard/StatCard';
import RecentResultItem from '../../components/user/dashboard/RecentResultItem';
import MilestonesSection from '../../components/user/dashboard/MilestoneSection';
import ActionCard from '../../components/user/dashboard/ActionCard';
import LoadingSpinner from '../../components/shared/ui/LoadingSpinner';
import Alert from '../../components/shared/ui/Alert';

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { stats, recentResults, loading, error, clearError } = useDashboard(); // error hook används här
  const user = JSON.parse(localStorage.getItem('user'));

  if (loading) return <LoadingSpinner message="Laddar dashboard..." />;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'God morgon' : hour < 18 ? 'God eftermiddag' : 'God kväll';

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ALERT */}
        {error && (
          <Alert
            message={error}
            type="error"
            onClose={clearError} // direkt från hook
          />
        )}

        {/* Hero */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-gray-200">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
              👋
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {greeting}, {user.firstName}!
              </h1>
              <p className="text-lg text-gray-600 flex items-center gap-2">
                <span>📅</span>
                {new Date().toLocaleDateString('sv-SE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard icon="📊" label="Totalt Prov" value={stats.totalExams} variant="default" />
            <StatCard icon="✅" label="Godkända" value={stats.passedExams} variant="success" />
            <StatCard icon="📈" label="Genomsnitt" value={`${stats.averagePercentage}%`} variant="info" />
          </div>
        )}

        <MilestonesSection stats={stats} />

        {/* Actions */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚡</span>
            <h2 className="text-3xl font-bold text-gray-800">Snabbåtgärder</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionCard icon="🎯" title="Starta Slutprov" description="Gör ditt körkortsprov nu" onClick={() => navigate('/quiz/final')} variant="primary" />
            <ActionCard icon="📚" title="Öva Teori" description="Träna på teorifrågor" onClick={() => navigate('/quiz/practice')} variant="success" />
            <ActionCard icon="📊" title="Visa Alla Resultat" description="Se din provhistorik" onClick={() => navigate('/results')} variant="purple" />
            <ActionCard icon="📖" title="Lärresurser" description="Guider och tips (Kommer snart)" onClick={() => navigate('#')} variant="yellow" />
          </div>
        </div>

        {/* Recent results */}
        {recentResults.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📋</span>
              <h2 className="text-3xl font-bold text-gray-800">Senaste Provresultat</h2>
            </div>
            <div>
              {recentResults.map((result, index) => (
                <div key={result.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <RecentResultItem result={result} />
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/results')}
              className="mt-6 w-full py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Visa alla resultat →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboardPage;
