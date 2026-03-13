const ProgressBar = ({ answered, total}) => {
    if (total === 0) return null; 

    const precent = (answered / total) * 100; 

    return (
        <div className="mb-6">

            {/* Text överst */}
            <div className="flex justify-between text-sm font-medium mb-1">
                <span>Fråga {answered} av {total}</span>
                <span>{total - answered} kvar</span>
            </div>

            {/* Själva baren */}
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div
                    className="bg-traffic-yellow h-3 rounded-full transition-all duration-300"
                    style={{ width: `${precent}%` }}
                ></div>

            </div>

        </div>
    );

}; 

export default ProgressBar; 