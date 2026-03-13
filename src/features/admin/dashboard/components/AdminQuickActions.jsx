const AdminQuickActions = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Snabbåtgärder
      </h2>

      <div className="flex flex-wrap gap-4">
        {children}
      </div>
    </div>
  );
};

export default AdminQuickActions;
