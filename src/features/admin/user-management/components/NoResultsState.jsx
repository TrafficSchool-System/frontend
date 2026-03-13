/**
 * ==========================================
 * NO RESULTS STATE COMPONENT
 * ==========================================
 * Visar meddelande när sökning/filtrering inte ger resultat
 */

const NoResultsState = () => {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        Inga användare hittades
      </h3>
      <p className="mt-2 text-gray-500">
        Prova att ändra dina sökkriterier eller filter.
      </p>
    </div>
  );
};

export default NoResultsState;
