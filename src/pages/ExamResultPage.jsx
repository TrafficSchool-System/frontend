import useExamResults from "../hooks/useExamResult";
import ExamResultCard from '../components/exam/ExamResultCard';

const ExamResultsPage = () => {
    const { results, loading, error } = useExamResults();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Laddar resultar...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Mina Provresultat</h1>

                <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-xl text-gray-600">
                        Du har inga genomförda prov ännu.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/final-exam'}
                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Gör ditt första prov
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Mina Provresultat</h1>

            {/* Statistik */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-lg">
                    <span className="font-semibold">Total antal prov:</span> {results.length}
                </p>

                <p className="text-lg">
                    <span className="font-semibold">Godkända:</span>{' '}
                    {results.filter(r => r.passed).length}
                </p>

                <p className="text-lg">
                    <span className="font-semibold">Underkända:</span>{' '}
                    {results.filter(r => !r.passed).length}
                </p>
            </div>

            {/* Lista */}
            <div>
                {results.map(result => (
                    <ExamResultCard key={result.id} result={result} />
                ))}
            </div>

            <button
                onClick={() => window.location.href = '/'}
                className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
                Tillbaka till startsidan
            </button>
        </div>
    );

}; 

export default ExamResultsPage;