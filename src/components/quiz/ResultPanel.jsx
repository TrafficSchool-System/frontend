import React from 'react'


// - questions: en array med frågeobjekt
// - answers: ett objekt eller array med användarens val (indexerade per fråga)
// - onRetry: en funktion som anropas när användaren vill göra om testet
const ResultPanel = ({ questions, answers, onRetry }) => {

// Räkna antal rätta svar, reduce går igenom alla frågor samt summerar poäng
const score = questions.reduce((acc, q, index) => {
    const selected = answers[index]; // Användarens svar för just denna fråga
    const correct  = q.answers[q.correctAnswerIndex]; // Hämta den korrekta svaret från answer listan
    return acc + (selected === correct ? 1 : 0); // Om korrekt, lägg till 1 poäng
}, 0); // Start värde för reduce = 0

// JSX som retuneras 
return (
    <div className='max-w-2xl mx-auto p-6 text-center'>

        {/* Titel */}
        <h1 className='text-3xl font-bold mb-4'>Resultat för övningsquiz</h1>

        {/* Visa poäng */}
        <p className='text-xl mb-6'>
            Du fick <span className='font-bold'>{score}</span> av {" "}
            <span className='font-bold'>{questions.length}</span> rätt.
        </p>

        {/* Lista med felaktiga svar */}
        <div className='text-left mb-6'>
            {questions.map((q, index) => {
                const selected = answers[index]; // Användarens svar
                const correct = q.answers[q.correctAnswerIndex]; // Korrekt svar

                // Visa endast de frågor som användaren svarade fel på
                if(selected !== correct) {
                    return (
                        <div key={index} className='mb-2'>

                            {/* Frågetext */}
                            <p className='font-semibold'>
                                {q.questions}
                            </p>

                            {/* Rätt svar */}
                            <p className='text-red-500'>
                                Rätt svar: <span className='font-bold'>{correct}</span>
                            </p>
                        </div>
                    );
                }
                return null; // Om korrekt, retunera inget
            })}
        </div>

        {/* Knapp för att starta om testet */}
        <button
            onClick={onRetry} // Callback från props
            className='px-6 py-3 bg-blue-600 text-white rounded-lg'
        >
            Gör om testet
        </button>
    </div>
);
}

export default ResultPanel; 
