// src/components/layout/SideMenu.jsx
import React from "react";

const menuItems = [
  { label: "Start", path: "/" },
  { label: "Quiz", path: "/quiz" },
  { label: "Resultat", path: "/results" },
  { label: "Profil", path: "/profile" },
  { label: "Logga ut", path: "/logout" }
];

const SideMenu = ({ onMenuClick }) => (
  <nav className="w-48 bg-gray-100 border-1 border-gray-300 min-h-screen flex flex-col py-8 px-4">
    {menuItems.map((item) => (
      <button
        key={item.label}
        onClick={() => onMenuClick && onMenuClick(item.path)}
        className="w-full text-left py-2 px-2 rounded hover:bg-blue-200 transition mb-1"
      >
        {item.label}
      </button>
    ))}
  </nav>
);

export default SideMenu;