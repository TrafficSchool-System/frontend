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
    <div className={`bg-white rounded-xl shadow-md border-l-4 p-6 transition-all hover:shadow-lg ${
      result.passed 
        ? 'border-green-500' 
        : 'border-red-500'
    }`}>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Vänster sektion - Status och poäng */}
        <div className="flex-1">
          {/* Godkänd/Underkänd badge */}
          <div className="mb-4">
            {result.passed ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-lg">
                <span className="text-2xl">✅</span>
                GODKÄND
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-lg">
                <span className="text-2xl">❌</span>
                UNDERKÄND
              </span>
            )}
          </div>

          {/* Poäng och procent */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              🎯
            </div>
            <div>
              <p className="text-sm text-gray-600">Poäng</p>
              <p className="text-xl font-bold text-gray-800">
                {result.score}/{result.totalQuestions}
                <span className="text-lg text-gray-600 ml-2">({result.percentage}%)</span>
              </p>
            </div>
          </div>

          {/* Tid */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              ⏱️
            </div>
            <div>
              <p className="text-sm text-gray-600">Tid</p>
              <p className="text-xl font-bold text-gray-800">
                {result.timeTaken} {result.timeTaken === 1 ? 'minut' : 'minuter'}
              </p>
            </div>
          </div>
        </div>

        {/* Höger sektion - Datum och tid */}
        <div className="md:text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-2xl">📅</span>
            <div className="text-left">
              <p className="text-sm text-gray-600">Genomfört</p>
              <p className="font-semibold text-gray-800">{dateString}</p>
              <p className="text-sm text-gray-600">{timeString}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExamResultCard;