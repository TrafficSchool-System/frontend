import React from "react";
import Button from "../../shared/ui/Button";

const QuizSubjectSelector = ({ subjects, setSubjects, onNext }) => {

  // Lista över alla ämnen som användaren kan välja
  // Varje ämne har ett ID och en label som visas i UI
  const subjectOptions = [
    { id: 1, label: "🚗 Fordonskunskap", description: "Lär dig om fordonets funktioner" },
    { id: 2, label: "📘 Trafikregler", description: "Regler och förordningar" },
    { id: 3, label: "🧠 Människan", description: "Trafikpsykologi och beteende" },
    { id: 4, label: "🌍 Miljö & Körteknik", description: "Ekokörning och miljöpåverkan" },
    { id: 5, label: "⚠️ Trafiksäkerhet", description: "Säkerhet och riskhantering" },
  ];

  // Funktion som lägger till eller tar bort ämnen från listan
  // Om ämnet redan är valt → ta bort
  // Om det inte är valt → lägg till
  const toggleSubject = (id) => {
    setSubjects((prev) =>
      prev.includes(id) 
      ? prev.filter((s) => s !== id) // Ta bort ID
      : [...prev, id] // Lägg till ID
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        {/* Header med ikon */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📚</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Välj ämnen att öva på</h2>
          <p className="text-gray-600">
            {subjects.length === 0 
              ? "Välj minst ett ämne för att fortsätta" 
              : `${subjects.length} ämne${subjects.length > 1 ? 'n' : ''} valt`}
          </p>
        </div>

        {/* Grid med alla ämnes-boxar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {subjectOptions.map((s) => {
            const selected = subjects.includes(s.id);

            return (
              <div
                key={s.id}
                onClick={() => toggleSubject(s.id)}
                className={`cursor-pointer p-6 border-2 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 ${
                  selected 
                    ? "bg-traffic-yellow border-traffic-yellow shadow-md scale-105" 
                    : "bg-white border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkmark när vald */}
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected 
                      ? "bg-traffic-black border-traffic-black" 
                      : "border-gray-300"
                  }`}>
                    {selected && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Text content */}
                  <div className="flex-1">
                    <div className="text-lg font-bold text-gray-800 mb-1">{s.label}</div>
                    <div className="text-sm text-gray-600">{s.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nästa-knapp */}
        <Button
          variant="primary"
          onClick={onNext}
          disabled={subjects.length === 0}
          className="w-full text-lg"
        >
          {subjects.length > 0 
            ? `Fortsätt med ${subjects.length} ämne${subjects.length > 1 ? 'n' : ''}` 
            : 'Välj minst ett ämne'}
        </Button>
      </div>
    </div>
  );
};

export default QuizSubjectSelector;
