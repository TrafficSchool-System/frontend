const QuizInfo = () => {

    const infoItems = [
        {
            icon: "🎯",
            title: "Välj och öva",
            text: "Välj ämne och antal frågor som passar dig. Navigera mellan frågorna med Föregående/Nästa-knapparna."
        },
        {
            icon: "⚠️",
            title: "Ett försök per fråga",
            text: "Du har endast ett försök per fråga. När du klickat på ett alternativ kan du inte ändra dig. Rätt svar visas direkt."
        },
        {
            icon: "📖",
            title: "SFI-hjälp",
            text: "Behöver du enklare svenska? Tryck på 'Visa SFI-hjälp' för en förenklad version av frågan."
        },
        {
            icon: "💡",
            title: "Förklaringar",
            text: "Efter varje svar får du en pedagogisk förklaring som hjälper dig förstå varför svaret är rätt eller fel."
        },
        {
            icon: "📊",
            title: "Se ditt resultat",
            text: "När alla frågor är besvarade, klicka 'Rätta provet' för att se hur många rätt du fick och genomgång av felen."
        }
    ];

    return(
        <div className="mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="text-3xl">ℹ️</div>
                    <h2 className="text-2xl font-bold text-gray-800">Hur övningsquizen fungerar</h2>
                </div>

                {/* Info items */}
                <div className="space-y-4">
                    {infoItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex gap-4 items-start bg-white rounded-lg p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
                        >
                            <div className="text-2xl flex-shrink-0">{item.icon}</div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer tip */}
                <div className="mt-6 pt-4 border-t border-blue-200">
                    <p className="text-center text-sm text-gray-600">
                        💪 <strong>Tips:</strong> Öva regelbundet för bästa resultat. Lycka till!
                    </p>
                </div>
            </div>
        </div>
    ); 

}; 

export default QuizInfo; 