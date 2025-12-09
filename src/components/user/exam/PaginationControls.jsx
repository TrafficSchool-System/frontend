import Button from '../../shared/ui/Button';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Visa alltid första sidan
    pages.push(1);

    // Visa ellipsis om det behövs
    if (showEllipsisStart) {
      pages.push('ellipsis-start');
    }

    // Visa sidorna runt nuvarande sida
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    // Visa ellipsis om det behövs
    if (showEllipsisEnd) {
      pages.push('ellipsis-end');
    }

    // Visa alltid sista sidan om det finns fler än 1 sida
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-6">
      {/* Föregående knapp */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-4 py-2 rounded-xl font-medium transition-all duration-300
          flex items-center gap-2
          ${currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-traffic-yellow hover:text-traffic-black shadow-md hover:scale-105'
          }
        `}
      >
        <span className="hidden sm:inline">Föregående</span>
      </button>

      {/* Sidnummer */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span key={`${page}-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                w-10 h-10 rounded-xl font-bold transition-all duration-300
                flex items-center justify-center
                ${currentPage === page
                  ? 'bg-traffic-yellow text-traffic-black shadow-lg scale-110 ring-2 ring-traffic-yellow ring-offset-2'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 shadow-md'
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Nästa knapp */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-4 py-2 rounded-xl font-medium transition-all duration-300
          flex items-center gap-2
          ${currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-traffic-yellow hover:text-traffic-black shadow-md hover:scale-105'
          }
        `}
      >
        <span className="hidden sm:inline">Nästa</span>
      </button>
    </div>
  );
};

export default PaginationControls;
