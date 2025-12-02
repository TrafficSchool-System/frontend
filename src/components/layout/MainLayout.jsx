// src/components/layout/MainLayout.jsx
import { useState } from "react";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const MainLayout = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">

      {/* MOBILE HAMBURGER BUTTON */}
      <button
        className="md:hidden p-4 absolute z-50"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* DESKTOP TOGGLE BUTTON */}
      <button
        className="hidden md:flex p-2 absolute left-2 top-4 z-50 bg-gray-200 rounded shadow"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <Menu size={22} />
      </button>

      <SideMenu 
        onLogout={onLogout}
        open={menuOpen}
        setOpen={setMenuOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
