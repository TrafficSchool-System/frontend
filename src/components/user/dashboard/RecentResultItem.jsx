const RecentResultItem = ({ result }) => {
    const date = new Date(result.finishedAt); 
    const dateString = date.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const timeString = date.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={`
            relative overflow-hidden rounded-xl border-2 p-4 mb-3
            transition-all duration-300 hover:shadow-lg hover:scale-102
            ${result.passed 
                ? 'bg-linear-to-r from-green-50 to-green-100 border-green-300' 
                : 'bg-linear-to-r from-red-50 to-red-100 border-red-300'
            }
        `}>
            <div className="flex items-center justify-between gap-4">
                {/* Left: Date and time */}
                <div className="flex items-center gap-3">
                    <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center text-xl
                        ${result.passed ? 'bg-green-500' : 'bg-red-500'}
                    `}>
                        📅
                    </div>
                    <div>
                        <div className="font-bold text-gray-800">{dateString}</div>
                        <div className="text-sm text-gray-600">{timeString}</div>
                    </div>
                </div>

                {/* Right: Result */}
                <div className="flex items-center gap-4">
                    {/* Score */}
                    <div className="text-right hidden sm:block">
                        <div className="text-2xl font-bold text-gray-800">
                            {result.score}/{result.totalQuestions}
                        </div>
                        <div className="text-sm text-gray-600">
                            {result.percentage}%
                        </div>
                    </div>

                    {/* Badge */}
                    <div className={`
                        px-4 py-2 rounded-xl font-bold text-white shadow-md
                        flex items-center gap-2
                        ${result.passed ? 'bg-green-600' : 'bg-red-600'}
                    `}>
                        <span className="text-xl">
                            {result.passed ? '✓' : '✗'}
                        </span>
                        <span className="hidden sm:inline">
                            {result.passed ? 'GODKÄND' : 'UNDERKÄND'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile score */}
            <div className="sm:hidden mt-3 text-center">
                <span className="text-lg font-bold text-gray-800">
                    {result.score}/{result.totalQuestions} ({result.percentage}%)
                </span>
            </div>
        </div>
    );
};

export default RecentResultItem; 