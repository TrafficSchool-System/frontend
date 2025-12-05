
const RecentResultItem = ({ result }) => {
    const date = new Date(result.finishedAt); 
    const dateString = date.toLocaleDateString('sv-SE'); 

    return (
        <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-3">
                <span className="text-xl">📅</span>
                <span className="font-medium">{dateString}</span>
            </div>

            <div className="flex items-center gap-3">
                {result.passed ? (
                    <span className="text-green-700 font-semibold">✅ GODKÄND </span>
                ) : (
                    <span className="text-red-700 font-semibold">❌ UNDERKÄND </span>
                )}
                <span className="font-medium">
                    {result.score} /{result.totalQuestions} ({result.percentage}%)
                </span>

            </div>

        </div>
    );
};

export default RecentResultItem; 