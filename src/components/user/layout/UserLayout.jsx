// src/components/user/layout/UserLayout.jsx
import { useState } from "react";
import UserSideMenu from "./UserSideMenu";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Button from "../../shared/ui/Button";

const UserLayout = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">

      {/* MOBILE HAMBURGER BUTTON */}
      <Button
        variant="icon"
        onClick={() => setMenuOpen(true)}
        className="md:hidden p-4 absolute z-50"
      >
        <Menu size={28} />
      </Button>

      {/* DESKTOP TOGGLE BUTTON */}
      <Button
        variant="icon"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="hidden md:flex p-2 absolute left-2 top-4 z-50 bg-gray-200 rounded shadow"
      >
        <Menu size={30} />
      </Button>

      <UserSideMenu 
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

export default UserLayout;
