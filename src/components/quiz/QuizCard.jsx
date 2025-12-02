import SfiHint from "./sfiHint";

const QuizCard = ({ question, selectedAnswer, onSelect, showAnswerFeedback = true }) => {

  // Bestämmer om användaren har låst sitt svar och inte får ändra 
  // Gäller endast om ett svar är valt och vi visar feedback
  const answerLocked = selectedAnswer !== undefined && selectedAnswer !== null && showAnswerFeedback;

  // Säkerhetskontroll: om frågan eller svaren saknas visa laddningsruta
  if (!question || !question.answers) {
    return <div className="bg-white shadow-lg rounded-xl p-6 border mb-6">
      <p>Laddar fråga...</p>
    </div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border mb-6">

      {/* Visa själva frågetexten */}
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>

      {/* Visa SFI-hjälptext (extra förklaring för användaren) */}
      <SfiHint sfiText={question.sfi}/>

      {/* Visa bild om frågan innehåller en */}
      {question.image && 
        <img 
          src={question.image} 
          alt="Fråga bild" 
          className="w-full rounded-lg mb-4 shadow" />}


      <div className="space-y-3">

        {/* Loopa igenom alla svarsalternativ */}
        {question.answers.map((ans, i) => {

          // Bestäm bakgrundsfärg när feedback visas
          let bgColor = "";
          if (showAnswerFeedback && selectedAnswer) {

            // Grönt för rätt svar
            if (i === question.correctAnswerIndex) bgColor = "bg-green-200";

            // Rött för fel svar
            else if (ans === selectedAnswer) bgColor = "bg-red-200";
          }

          return (
            <label
              key={i}
              className={`flex items-center p-3 border rounded-lg
                  ${answerLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:bg-gray-50"}
                  ${bgColor}`}
            >
              {/* Radio-knapp för varje alternativ */}
              <input
                type="radio"
                name={`answer-${question.id}`}
                checked={selectedAnswer === ans}
                onChange={() => onSelect(ans)}
                disabled={answerLocked}
                className="mr-3"
              />
              {ans}
            </label>
          );
        })}
      </div>

      {/* Visa förklaring när:
          ✓ feedback är påslagen
          ✓ svaret är låst
          ✓ frågan har en förklarings-text */}
          
      {showAnswerFeedback && answerLocked && question.explinationForStudent && (
        <div className="mt-5 p-4 bg-blue-50 border-1-4 border-blue-400 rounded">
          <h3 className="font-semibold text-blue-700 mb-1">Förklaring:</h3>
          <p className="text-blue-800">{question.explinationForStudent}</p>
        </div>
      )}
    </div>
  );
};

export default QuizCard;