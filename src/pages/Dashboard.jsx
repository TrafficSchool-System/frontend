

const Dashboard = ({ user }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">
          Välkommen, {user?.name || "användare"}
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
