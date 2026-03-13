import ExamResultSummary from "./ExamResultSummary";
import ExamResultQuestion from "./ExamResultQuestion";
import Button from "@shared/components/ui/Button";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import useResultCalculation from "@shared/hooks/useResultCalculation";
const ExamResult = ({ result, onRetry }) => {
  if (!result) {
    return (
      <LoadingSpinner
        message="Laddar resultat..."
        fullScreen={false}
        size="small"
        gradient={false}
      />
    );
  }

  const { score, passed, questions, userAnswers, timeTaken } = result;

  // Använd shared hook för resultatberäkning
  const { results, correctCount, wrongCount, total } = useResultCalculation(
    questions,
    userAnswers,
    "id"
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Summary Section */}
        <ExamResultSummary
          score={score}
          total={total}
          passed={passed}
          timeTaken={timeTaken}
        />

        {/* Questions Review Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">📝</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Genomgång av dina svar
                </h3>
                <p className="text-gray-600">
                  Granska dina svar och lär dig av eventuella misstag
                </p>
              </div>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-green-600">
                  {correctCount}
                </div>
                <div className="text-xs text-gray-600 uppercase">Rätt</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-red-600">
                  {wrongCount}
                </div>
                <div className="text-xs text-gray-600 uppercase">Fel</div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="mb-8">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect =
              userAnswer === question.answers[question.correctAnswerIndex];

            return (
              <div
                key={question.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ExamResultQuestion
                  question={question}
                  userAnswer={userAnswer}
                  isCorrect={isCorrect}
                  index={index}
                />
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/")}
            >
              ← Tillbaka till Dashboard
            </Button>
            <Button variant="primary" onClick={onRetry}>
              🔄 Gör om provet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
