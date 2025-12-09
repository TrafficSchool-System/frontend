const AdminInfoCard = ({ adminUser }) => {
  if (!adminUser) {
    return null;
  }

  const infoItems = [
    { label: "Admin ID", value: adminUser.adminId },
    { label: "Användarnamn", value: adminUser.username },
    { label: "Email", value: adminUser.email },
    { label: "Namn", value: `${adminUser.firstName} ${adminUser.lastName}` }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Din Admin-information
      </h2>
      <div className="space-y-3">
        {infoItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-600 font-medium">{item.label}:</span>
            <span className="text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInfoCard;