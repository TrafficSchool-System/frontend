import Button from "@shared/components/ui/Button";

const FinalExamIntro = ({ durationMinutes, onStart }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 text-center">
              <div className="inline-block p-4 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                <span className="text-6xl">🎯</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">Slutprov</h1>
              <p className="text-xl text-white/90">
                Det är dags att visa vad du kan!
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Time info card */}
            <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border-2 border-blue-100">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">⏱️</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {durationMinutes} minuter
                </h2>
              </div>
              <p className="text-center text-gray-600">
                Du har gott om tid att tänka igenom varje fråga
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Viktigt att veta:
              </h3>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Timern startar direkt
                  </p>
                  <p className="text-gray-600 text-sm">
                    När du klickar på "Starta provet" börjar nedräkningen
                    omedelbart
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Svara på alla frågor
                  </p>
                  <p className="text-gray-600 text-sm">
                    Se till att du har svarat på varje fråga innan tiden tar
                    slut
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Ta det lugnt
                  </p>
                  <p className="text-gray-600 text-sm">
                    Du har förberett dig väl - lita på din kunskap!
                  </p>
                </div>
              </div>
            </div>

            {/* Motivation box */}
            <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">💪</span>
                <p className="text-lg font-bold text-gray-800">
                  Du klarar det här!
                </p>
              </div>
              <p className="text-gray-600">
                Du har övat och förberett dig. Nu är det dags att visa vad du
                lärt dig. Lycka till!
              </p>
            </div>

            {/* Start button */}
            <div className="text-center">
              <Button
                variant="primary"
                onClick={onStart}
                className="text-xl px-12 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                🚀 Starta provet
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom tip */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            💡 <span className="font-medium">Tips:</span> Se till att du sitter
            ostörd och har en stabil internetanslutning
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalExamIntro;
