import React from "react";

const QuizSubjectSelector = ({ subjects, setSubjects, onNext }) => {

  // Lista över alla ämnen som användaren kan välja
  // Varje ämne har ett ID och en label som visas i UI
  const subjectOptions = [
    { id: 1, label: "🚗 Fordonskunskap" },
    { id: 2, label: "📘 Trafikregler" },
    { id: 3, label: "🧠 Människan" },
    { id: 4, label: "🌍 Miljö & Körteknik" },
    { id: 5, label: "⚠️ Trafiksäkerhet" },
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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl text-center font-bold mb-4">Välj ämne</h2>

      {/* Grid med alla ämnes-boxar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjectOptions.map((s) => {
          const selected = subjects.includes(s.id);

          return (
            <div
              key={s.id}
              onClick={() => toggleSubject(s.id)}
              className={`cursor-pointer p-4 border rounded-lg shadow flex items-center justify-center font-semibold transition-colors ${
                selected ? "bg-yellow-400 border-yellow-500" : "bg-white hover:bg-gray-100"
              }`}
            >
              {s.label}
            </div>
          );
        })}
      </div>

      {/* Nästa-knapp */}
      <button
        onClick={onNext}
        disabled={subjects.length === 0}
        className={`mt-6 w-full px-4 py-2 font-bold text-white rounded ${
          subjects.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600"
        }`}
      >
        Nästa
      </button>
    </div>
  );
};

export default QuizSubjectSelector;
