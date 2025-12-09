import { useState } from 'react';
import useExamResults from "../../hooks/user/useExamResult";
import ExamStatsCard from '../../components/user/exam/ExamStatsCard';
import ExamFilters from '../../components/user/exam/ExamFilters';
import ExamResultsList from '../../components/user/exam/ExamResultsList';
import Button from '../../components/shared/ui/Button';
import LoadingSpinner from '../../components/shared/ui/LoadingSpinner';

const ExamResultsPage = () => {
    const { results, loading, error } = useExamResults();
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');

    if (loading) {
        return <LoadingSpinner message="Laddar resultat..." />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-blue-50 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center border-2 border-red-300">
                    <div className="text-6xl mb-4">❌</div>
                    <p className="text-xl text-red-600 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
                        <div className="text-7xl mb-6 animate-bounce">📊</div>
                        <h1 className="text-4xl font-bold mb-4 text-gray-800">Mina Provresultat</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Du har inga genomförda prov ännu.
                        </p>
                        <Button 
                            variant="primary"
                            onClick={() => window.location.href = '/quiz/final'}
                            className="text-lg"
                        >
                            🚀 Gör ditt första prov
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4 animate-bounce">📊</div>
                    <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                        Mina Provresultat
                    </h1>
                    <p className="text-lg text-gray-600">Följ din progress och se dina resultat</p>
                </div>

                {/* Statistik cards */}
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
                        value={results.filter(r => r.passed).length}
                        variant="success"
                    />
                    <ExamStatsCard
                        icon="❌"
                        label="Underkända"
                        value={results.filter(r => !r.passed).length}
                        variant="danger"
                    />
                    <ExamStatsCard
                        icon="📈"
                        label="Godkänd %"
                        value={results.length > 0 
                            ? `${Math.round((results.filter(r => r.passed).length / results.length) * 100)}%`
                            : '0%'
                        }
                        variant="warning"
                    />
                </div>

                {/* Filter och sortering */}
                <ExamFilters 
                    onFilterChange={setFilter}
                    onSortChange={setSortBy}
                />

                {/* Resultat lista med pagination */}
                <ExamResultsList 
                    results={results}
                    filter={filter}
                    sortBy={sortBy}
                />

                {/* Tillbaka knapp */}
                <div className="text-center mt-8">
                    <Button
                        variant="secondary"
                        onClick={() => window.location.href = '/'}
                    >
                        ← Tillbaka till startsidan
                    </Button>
                </div>
            </div>
        </div>
    );

}; 

export default ExamResultsPage;