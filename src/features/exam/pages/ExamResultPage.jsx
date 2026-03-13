import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useExamResults from "../hooks/useExamResult";
import ExamStatsCard from "../components/ExamStatsCard";
import ExamFilters from "../components/ExamFilters";
import ExamResultsList from "../components/ExamResultsList";
import Button from "@shared/components/ui/Button";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import Alert from "@shared/components/ui/Alert";

const ExamResultsPage = () => {
  const navigate = useNavigate();
  const { results, loading, error, clearError, refetch } = useExamResults();

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Laddar resultat..." />;
  }

  // -------------------------------------------------------
  // Normal vy med Alert
  // -------------------------------------------------------
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Alert om det finns fel */}
        {error && (
          <div className="mb-6">
            <Alert
              type="error"
              message={error}
              onClose={clearError} // rensa fel när användaren stänger
            />
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
            Mina Provresultat
          </h1>
          <p className="text-lg text-gray-600">
            Följ din progress och se dina resultat
          </p>
        </div>

        {/* Empty state */}
        {results.length === 0 && (
          <div className="max-w-2xl mx-auto text-center">
            <Alert
              type="info"
              message="Du har inga genomförda prov ännu."
              className="mb-6"
            />
            <Button
              variant="primary"
              className="text-lg"
              onClick={() => navigate("/quiz/final")}
            >
              🚀 Gör ditt första prov
            </Button>
          </div>
        )}

        {/* Statistik & lista */}
        {results.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <ExamStatsCard
                icon="📝"
                label="Totalt prov"
                value={results.length}
                variant="default"
              />
              <ExamStatsCard
                icon="✅"
                label="Godkända"
                value={results.filter((r) => r.passed).length}
                variant="success"
              />
              <ExamStatsCard
                icon="❌"
                label="Underkända"
                value={results.filter((r) => !r.passed).length}
                variant="danger"
              />
              <ExamStatsCard
                icon="📈"
                label="Godkänd %"
                value={`${
                  results.length
                    ? Math.round(
                        (results.filter((r) => r.passed).length /
                          results.length) *
                          100
                      )
                    : 0
                }%`}
                variant="warning"
              />
            </div>

            <ExamFilters onFilterChange={setFilter} onSortChange={setSortBy} />

            <ExamResultsList
              results={results}
              filter={filter}
              sortBy={sortBy}
            />
          </>
        )}

        {/* Tillbaka */}
        <div className="text-center mt-10">
          <Button variant="secondary" onClick={() => navigate("/")}>
            Tillbaka till startsidan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;
