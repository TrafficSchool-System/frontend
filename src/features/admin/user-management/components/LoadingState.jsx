/**
 * ==========================================
 * LOADING STATE COMPONENT
 * ==========================================
 * Visar loading spinner när data laddas
 */

const LoadingState = ({ message = "Hämtar användare..." }) => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
