// frontend/src/components/dashboard/MilestonesSection.jsx

import MilestoneCard from './MilestoneCard';

const MilestonesSection = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">🎯 Milstolpar</h2>
      
      {/* Special: Redo för riktigt prov */}
      {stats.readyForRealExam && (
        <div className="bg-gradient-to-r from-yellow-100 to-green-100 p-6 rounded-lg border-2 border-yellow-400 mb-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🏆</span>
            <div>
              <h3 className="text-2xl font-bold text-green-800">
                Grattis! Du är redo för riktigt teoriprov!
              </h3>
              <p className="text-green-700">
                Du har klarat 5 prov i rad med minst 80%. Boka din teori nu!
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Streak display */}
      {stats.currentStreak > 0 && (
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-300 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <span className="font-bold text-lg">
                {stats.currentStreak} godkända i rad!
              </span>
              <span className="text-gray-600 ml-2">
                (Rekord: {stats.bestStreak})
              </span>
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