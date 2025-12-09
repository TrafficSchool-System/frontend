// frontend/src/components/dashboard/MilestonesSection.jsx

import MilestoneCard from './MilestoneCard';

const MilestonesSection = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🎯</span>
        <h2 className="text-3xl font-bold text-gray-800">Dina Milstolpar</h2>
      </div>
      
      {/* Special: Redo för riktigt prov */}
      {stats.readyForRealExam && (
        <div className="relative overflow-hidden bg-linear-to-r from-yellow-400 via-yellow-500 to-green-500 p-8 rounded-2xl shadow-2xl mb-6 animate-pulse">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
          </div>

          <div className="relative z-10 flex items-center gap-6">
            <span className="text-7xl animate-bounce">🏆</span>
            <div className="flex-1 text-white">
              <h3 className="text-3xl font-bold mb-2">
                Grattis! Du är redo för riktigt teoriprov!
              </h3>
              <p className="text-lg opacity-95">
                Du har klarat 5 prov i rad med minst 80%. Boka din teori nu!
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Streak display */}
      {stats.currentStreak > 0 && (
        <div className="relative overflow-hidden bg-linear-to-r from-orange-100 to-red-100 p-6 rounded-2xl border-2 border-orange-400 shadow-lg mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-md">
              🔥
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-orange-800">
                {stats.currentStreak} godkända i rad!
              </div>
              <div className="text-orange-700">
                Bästa streak: {stats.bestStreak} prov
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Milstolpe grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <MilestoneCard 
          milestone={{ 
            title: "Första steget", 
            description: "Klara ditt första prov", 
            icon: "🎯",
            color: "bg-blue-50"
          }}
          isUnlocked={stats.passedExams >= 1}
        />
        
        <MilestoneCard 
          milestone={{
            title: "På väg",
            description: "Klara 3 prov totalt",
            icon: "🚀",
            color: "bg-green-50"
          }}
          isUnlocked={stats.passedExams >= 3}
        />
        
        <MilestoneCard 
          milestone={{
            title: "Medvind",
            description: "3 godkända i rad",
            icon: "🔥",
            color: "bg-orange-50"
          }}
          isUnlocked={stats.currentStreak >= 3 || stats.bestStreak >= 3}
        />
        
        <MilestoneCard 
          milestone={{
            title: "Expert",
            description: "10 godkända prov",
            icon: "⭐",
            color: "bg-purple-50"
          }}
          isUnlocked={stats.passedExams >= 10}
        />
      </div>
    </div>
  );
};

export default MilestonesSection;