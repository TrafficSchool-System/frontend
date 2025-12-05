const DashboardStatCard = ({ icon, label, value, color }) => {
    return (
        <div className={`p-6 rounded-lg ${color} shadow-md`}>
            <div className="text-4xl mb-2">{icon}</div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );
};

export default DashboardStatCard; 