// src/components/user/dashboard/StatCard.jsx
const StatCard = ({ icon, label, value, variant = 'default', trend }) => {
    const variants = {
        default: 'bg-linear-to-br from-blue-50 to-blue-100 border-blue-300',
        success: 'bg-linear-to-br from-green-50 to-green-100 border-green-300',
        warning: 'bg-linear-to-br from-yellow-50 to-yellow-100 border-yellow-300',
        info: 'bg-linear-to-br from-purple-50 to-purple-100 border-purple-300'
    };

    const iconColors = {
        default: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        info: 'bg-purple-500'
    };

    return (
        <div className={`
            relative overflow-hidden rounded-2xl border-2 p-6 
            ${variants[variant]}
            transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1
        `}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className={`
                        w-14 h-14 rounded-xl ${iconColors[variant]} 
                        flex items-center justify-center text-2xl mb-4
                        shadow-lg
                    `}>
                        {icon}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        {label}
                    </div>
                    <div className="text-4xl font-bold text-gray-800">
                        {value}
                    </div>
                    {trend && (
                        <div className={`text-sm font-medium mt-2 ${
                            trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                            {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {Math.abs(trend)}%
                        </div>
                    )}
                </div>
            </div>
            {/* Dekorativ cirkel */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white opacity-20 rounded-full" />
        </div>
    );
};

export default StatCard;
