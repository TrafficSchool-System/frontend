
const ExamResultQuestion = ({ question, userAnswer, isCorrect, index }) => {
    const correctAnswer = question.answers[question.correctAnswerIndex];

    return (
        <div className={`p-4 mb-4 rounded-lg border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>

            <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">
                    Fråga {index + 1}: {question.question}
                </h3>

                <span className={`px-3 py-1 rounded font-bold ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {isCorrect ? '✓ Rätt' : '✗ Fel'}
                </span>
            </div>

            {question.image && (
                <img src={question.image} alt="Frågebild" className="w-full max-w-md rounded mb-3" />
            )}

            <div className="ml-4">
                <p className="mb-2">
                    <span className="font-semibold">Ditt svar:</span> {''}
                    <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                        {userAnswer || 'Inget svar'}
                    </span>
                </p>

                {!isCorrect && (
                    <p className="mb-2">
                        <span className="font-semibold">Rätt svar:</span>{''}
                        <span className="text-green-700 font-bold">{correctAnswer}</span>
                    </p>
                )}

                {!isCorrect && question.explinationForStudent && (
                    <div className="mt-3 p-3 bg-blue-50 border-1-4 border-blue-400 rounded">
                        <p className="font-semibold text-blue-700">Förklaring:</p>
                        <p className="text-blue-800">{question.explinationForStudent}</p>

                    </div>
                )}
            </div>
        </div>
    );
}; 

export default ExamResultQuestion; 