const AdminHeader = ({ adminUser, onLogout }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          {adminUser && (
            <p className="text-gray-600 mt-1">
              Välkommen, {adminUser.firstName} {adminUser.lastName}
            </p>
          )}
        </div>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
        >
          Logga ut
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;