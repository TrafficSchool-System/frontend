const ActionCard = ({ icon, title, description, onClick, variant = 'primary' }) => {
    const variants = {
        primary: 'bg-linear-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
        success: 'bg-linear-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
        purple: 'bg-linear-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
        yellow: 'bg-linear-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600'
    };

    return (
        <button
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-2xl p-6 text-white text-left
                ${variants[variant]}
                transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1
                group
            `}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-20 -translate-x-20" />
            </div>

            <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                {/* Title */}
                <div className="text-2xl font-bold mb-2">
                    {title}
                </div>

                {/* Description */}
                <div className="text-sm opacity-90">
                    {description}
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-2 font-medium">
                    <span>Kom igång</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
            </div>
        </button>
    );
};

export default ActionCard;
