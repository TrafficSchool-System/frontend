import ExamResultSummary from './ExamResultSummary';
import ExamResultQuestion from './ExamResultQuestion';

const ExamResult = ({ result, onRetry }) => {
  if (!result) {
    return <p className="p-6">Laddar resultat...</p>;
  }

  const { score, passed, questions, userAnswers, timeTaken } = result;
  const total = questions.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ExamResultSummary 
        score={score} 
        total={total} 
        passed={passed} 
        timeTaken={timeTaken}
      />

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Genomgång av dina svar:</h3>
        {questions.map((question, index) => {
          const userAnswer = userAnswers[question.id];
          const isCorrect = userAnswer === question.answers[question.correctAnswerIndex];

          return (
            <ExamResultQuestion
              key={question.id}
              question={question}
              userAnswer={userAnswer}
              isCorrect={isCorrect}
              index={index}
            />
          );
        })}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tillbaka till Dashboard
        </button>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Gör om provet
        </button>
      </div>
    </div>
  );
};

export default ExamResult;