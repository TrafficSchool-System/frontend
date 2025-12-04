// frontend/src/components/exam/ExamResultCard.jsx

const ExamResultCard = ({ result }) => {
  // Formatera datum och tid
  const date = new Date(result.finishedAt);
  const dateString = date.toLocaleDateString('sv-SE'); // 2025-12-03
  const timeString = date.toLocaleTimeString('sv-SE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }); // 14:30

  return (
    <div className={`p-6 rounded-lg border-2 mb-4 ${
      result.passed 
        ? 'bg-green-50 border-green-300' 
        : 'bg-red-50 border-red-300'
    }`}>
      
      {/* Datum och tid */}
      <div className="flex items-center gap-2 mb-3 text-gray-600">
        <span className="text-2xl">📅</span>
        <span className="font-medium">{dateString}</span>
        <span>•</span>
        <span>{timeString}</span>
      </div>

      {/* Godkänd/Underkänd */}
      <div className="mb-3">
        {result.passed ? (
          <span className="text-2xl font-bold text-green-700">
            ✅ GODKÄND
          </span>
        ) : (
          <span className="text-2xl font-bold text-red-700">
            ❌ UNDERKÄND
          </span>
        )}
      </div>

      {/* Poäng och procent - ANVÄNDER result.percentage från backend */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🎯</span>
        <span className="text-lg font-semibold">
          Poäng: {result.score}/{result.totalQuestions} ({result.percentage}%)
        </span>
      </div>

      {/* Tid */}
      <div className="flex items-center gap-2">
        <span className="text-xl">⏱️</span>
        <span className="text-lg">
          Tid: {result.timeTaken} {result.timeTaken === 1 ? 'minut' : 'minuter'}
        </span>
      </div>
    </div>
  );
};

export default ExamResultCard;