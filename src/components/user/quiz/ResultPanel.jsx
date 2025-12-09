import React from 'react';
import Button from '../../shared/ui/Button';

const ResultPanel = ({ questions, answers, onRetry }) => {
    // Räkna rätt och fel svar
    const results = questions.map((q, index) => {
        const selected = answers[index];
        const correct = q.answers[q.correctAnswerIndex];
        const isCorrect = selected === correct;
        return { question: q, selected, correct, isCorrect, index };
    });

    const score = results.filter(r => r.isCorrect).length;
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const wrongAnswers = results.filter(r => !r.isCorrect);

    // Bestäm resultatnivå
    const getResultLevel = () => {
        if (percentage >= 90) return { emoji: '🏆', text: 'Fantastiskt!', color: 'green', variant: 'success' };
        if (percentage >= 70) return { emoji: '🎉', text: 'Bra jobbat!', color: 'green', variant: 'success' };
        if (percentage >= 50) return { emoji: '👍', text: 'Okej resultat', color: 'yellow', variant: 'warning' };
        return { emoji: '💪', text: 'Fortsätt öva!', color: 'red', variant: 'danger' };
    };

    const resultLevel = getResultLevel();

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className={`
                    relative overflow-hidden rounded-3xl shadow-2xl p-8 mb-8
                    ${resultLevel.color === 'green' 
                        ? 'bg-linear-to-br from-green-400 via-green-500 to-green-600' 
                        : resultLevel.color === 'yellow'
                        ? 'bg-linear-to-br from-yellow-400 via-yellow-500 to-yellow-600'
                        : 'bg-linear-to-br from-red-400 via-red-500 to-red-600'
                    }
                `}>
                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
                    </div>

                    <div className="relative z-10 text-center text-white">
                        <div className="text-7xl mb-4 animate-bounce">
                            {resultLevel.emoji}
                        </div>
                        <h1 className="text-4xl font-bold mb-3">
                            {resultLevel.text}
                        </h1>
                        <p className="text-xl opacity-90">
                            Resultat för övningsquiz
                        </p>
                    </div>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Questions */}
                    <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-300 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📝</div>
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
                                Totalt frågor
                            </p>
                            <p className="text-4xl font-bold text-blue-800">{total}</p>
                        </div>
                    </div>

                    {/* Correct Answers */}
                    <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-300 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="text-center">
                            <div className="text-4xl mb-2">✅</div>
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
                                Rätt svar
                            </p>
                            <p className="text-4xl font-bold text-green-800">{score}</p>
                        </div>
                    </div>

                    {/* Percentage */}
                    <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-300 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📊</div>
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
                                Procent
                            </p>
                            <p className="text-4xl font-bold text-purple-800">{percentage}%</p>
                        </div>
                    </div>
                </div>

                {/* Wrong Answers Section */}
                {wrongAnswers.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl">📚</span>
                            <h2 className="text-3xl font-bold text-gray-800">
                                Granska dina misstag
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Du svarade fel på {wrongAnswers.length} {wrongAnswers.length === 1 ? 'fråga' : 'frågor'}. Lär dig av dem!
                        </p>

                        <div className="space-y-4">
                            {wrongAnswers.map((item, idx) => (
                                <div
                                    key={item.index}
                                    className="bg-linear-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-300 p-6 animate-fadeIn"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                            {item.index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-lg text-gray-800 mb-3">
                                                {item.question.question}
                                            </p>
                                            
                                            {/* User's wrong answer */}
                                            <div className="bg-red-100 rounded-xl p-4 mb-3">
                                                <p className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-1">
                                                    Ditt svar
                                                </p>
                                                <p className="text-red-800 font-medium">
                                                    {item.selected || 'Inget svar'}
                                                </p>
                                            </div>

                                            {/* Correct answer */}
                                            <div className="bg-green-100 rounded-xl p-4">
                                                <p className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">
                                                    Rätt svar
                                                </p>
                                                <p className="text-green-800 font-bold">
                                                    {item.correct}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Perfect Score Message */}
                {wrongAnswers.length === 0 && (
                    <div className="bg-linear-to-r from-yellow-100 to-green-100 rounded-3xl shadow-xl p-8 mb-8 border-2 border-green-400">
                        <div className="flex items-center gap-6">
                            <span className="text-7xl">🌟</span>
                            <div>
                                <h3 className="text-3xl font-bold text-green-800 mb-2">
                                    Perfekt resultat!
                                </h3>
                                <p className="text-lg text-green-700">
                                    Du svarade rätt på alla frågor. Fortsätt så!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="secondary"
                            onClick={() => window.location.href = '/'}
                        >
                            ← Tillbaka till Dashboard
                        </Button>
                        <Button
                            variant="primary"
                            onClick={onRetry}
                        >
                            🔄 Gör om testet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultPanel; 
