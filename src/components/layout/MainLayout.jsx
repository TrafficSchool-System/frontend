// src/components/layout/MainLayout.jsx
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

const MainLayout = ({ onLogout }) => {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidomenyn visas alltid */}
      <SideMenu onLogout={onLogout} />

      {/* Här laddas själva sidan (Dashboard, QuizPage, Profile etc.) */}
      <div className="flex-1 p-8 bg-white">
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;
