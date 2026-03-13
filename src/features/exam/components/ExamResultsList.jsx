import { useState, useEffect } from 'react';
import ExamResultCard from './ExamResultCard';
import PaginationControls from './PaginationControls';

const RESULTS_PER_PAGE = 5;

const ExamResultsList = ({ results, filter, sortBy }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayResults, setDisplayResults] = useState([]);

  useEffect(() => {
    // Filtrera resultat
    let filtered = [...results];

    if (filter === 'passed') {
      filtered = filtered.filter(r => r.passed);
    } else if (filter === 'failed') {
      filtered = filtered.filter(r => !r.passed);
    }

    // Sortera resultat
    switch (sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.finishedAt) - new Date(a.finishedAt));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.finishedAt) - new Date(b.finishedAt));
        break;
      case 'score-desc':
        filtered.sort((a, b) => b.percentage - a.percentage);
        break;
      case 'score-asc':
        filtered.sort((a, b) => a.percentage - b.percentage);
        break;
      default:
        filtered.sort((a, b) => new Date(b.finishedAt) - new Date(a.finishedAt));
    }

    setDisplayResults(filtered);
    setCurrentPage(1); // Reset till första sidan vid filter/sort ändring
  }, [results, filter, sortBy]);

  const totalPages = Math.ceil(displayResults.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const paginatedResults = displayResults.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll till toppen av listan
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Visa meddelande om inga resultat matchar filtret
  if (displayResults.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Inga resultat hittades
        </h3>
        <p className="text-gray-600">
          Prova att ändra dina filterinställningar
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Resultat counter */}
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-600 font-medium">
          Visar {startIndex + 1}-{Math.min(endIndex, displayResults.length)} av {displayResults.length} resultat
        </p>
      </div>

      {/* Resultat lista med animationer */}
      <div className="space-y-4 mb-6">
        {paginatedResults.map((result, index) => (
          <div
            key={result.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ExamResultCard result={result} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ExamResultsList;
