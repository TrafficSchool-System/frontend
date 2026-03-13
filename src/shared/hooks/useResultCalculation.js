import { useMemo } from "react";

/**
 * Hook för att beräkna resultat från quiz/exam
 * Hanterar både index-baserade (Quiz) och ID-baserade (Exam) svar
 */
const useResultCalculation = (questions = [], userAnswers = {}, answerType = 'index') => {
  const results = useMemo(() => {
    if (!questions.length) return [];

    return questions.map((q, index) => {
      // Hämta användarens valda svar beroende på typ
      const selected = answerType === 'index' 
        ? userAnswers[index]          // Quiz: answers[0], answers[1]...
        : userAnswers[q.id];           // Exam: userAnswers[123], userAnswers[456]...
      
      // Rätt svar från frågan
      const correct = q.answers?.[q.correctAnswerIndex];
      
      // Kontrollera om svaret är rätt
      const isCorrect = selected === correct;
      
      return { 
        question: q, 
        selected, 
        correct, 
        isCorrect, 
        index 
      };
    });
  }, [questions, userAnswers, answerType]);

  const correctCount = useMemo(() => 
    results.filter(r => r.isCorrect).length,
    [results]
  );

  const wrongCount = useMemo(() => 
    questions.length - correctCount,
    [questions.length, correctCount]
  );

  const percentage = useMemo(() => 
    questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0,
    [correctCount, questions.length]
  );

  const total = questions.length;

  return {
    results,
    correctCount,
    wrongCount,
    percentage,
    total,
  };
};

export default useResultCalculation;