import ExamScoreCard from './ExamScoreCard';

const ExamResultSummary = ({ score, total, passed, timeTaken }) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="mb-8">
      {/* Hero Section */}
      <div className={`
        relative overflow-hidden rounded-2xl shadow-xl p-8 mb-6
        ${passed 
          ? 'bg-linear-to-br from-green-400 via-green-500 to-green-600' 
          : 'bg-linear-to-br from-red-400 via-red-500 to-red-600'
        }
      `}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
        </div>

        <div className="relative z-10 text-center text-white">
          <div className="text-7xl mb-4 animate-bounce">
            {passed ? '🎉' : '😔'}
          </div>
          <h2 className="text-4xl font-bold mb-3">
            {passed ? 'GRATTIS! DU ÄR GODKÄND!' : 'TYVÄRR, DU BLEV UNDERKÄND'}
          </h2>
          <p className="text-xl opacity-90">
            {passed 
              ? 'Fantastiskt jobbat! Du klarade teoridelen.' 
              : 'Fortsätt öva så klarar du det nästa gång!'}
          </p>
        </div>
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ExamScoreCard
          icon="🎯"
          label="Poäng"
          value={`${score} / ${total}`}
          variant={passed ? 'success' : 'danger'}
        />
        <ExamScoreCard
          icon="📊"
          label="Procent"
          value={`${percentage}%`}
          variant={percentage >= 70 ? 'success' : 'danger'}
        />
        <ExamScoreCard
          icon="⏱️"
          label="Tid"
          value={`${timeTaken} min`}
          variant="info"
        />
      </div>

      {/* Info Message */}
      <div className={`
        rounded-xl p-6 text-center
        ${passed 
          ? 'bg-green-50 border-2 border-green-300' 
          : 'bg-yellow-50 border-2 border-yellow-300'
        }
      `}>
        <p className={`text-lg font-medium ${passed ? 'text-green-800' : 'text-yellow-800'}`}>
          {passed 
            ? '✓ Du klarade provet! 70% eller mer rätt krävs för godkänt.' 
            : '⚠️ Du behöver minst 70% rätt för att bli godkänd. Fortsätt öva så kommer du klara det!'}
        </p>
      </div>
    </div>
  );
};

export default ExamResultSummary;