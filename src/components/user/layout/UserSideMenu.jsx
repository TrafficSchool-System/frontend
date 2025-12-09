// src/components/user/layout/UserSideMenu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Home, BookOpen, BarChart3, User, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import Button from "../../shared/ui/Button";

const menuItems = [
  { label: "Start", path: "/", icon: Home },
  { label: "Quiz", path: "#", icon: BookOpen },
  { label: "Resultat", path: "/results", icon: BarChart3 },
  { label: "Profil", path: "/profile", icon: User },
];

const UserSideMenu = ({ onLogout, open, setOpen }) => {
  const navigate = useNavigate();
  const [showQuizOptions, setShowQuizOptions] = useState(false);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <>
      {/* OVERLAY — BOTH MOBILE & DESKTOP */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEMENU PANEL */}
      <nav
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg
          w-64 p-4 flex flex-col z-50 transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* MOBILE CLOSE BUTTON */}
        <Button 
          variant="icon" 
          onClick={() => setOpen(false)}
          className="md:hidden mb-4 self-end"
        >
          <X size={24} />
        </Button>

        {/* MENU HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Meny</h2>
        </div>

        {/* MENU ITEMS */}
        <div className="flex-1">
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.label === "Quiz" ? (
                <>
                  <Button
                    variant="menu"
                    onClick={() => setShowQuizOptions((prev) => !prev)}
                  >
                    <item.icon size={20} />
                    <span className="flex-1">{item.label}</span>
                    {showQuizOptions ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </Button>

                  {showQuizOptions && (
                    <div className="ml-4 space-y-1">
                      <Button
                        variant="submenu"
                        onClick={() => {
                          navigate("/quiz/practice");
                          setOpen(false);
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-traffic-yellow"></div>
                        Övningsquiz
                      </Button>

                      <Button
                        variant="submenu"
                        onClick={() => {
                          navigate("/quiz/final");
                          setOpen(false);
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-traffic-yellow"></div>
                        Slutprov
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Button
                  variant="menu"
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                >
                  <item.icon size={20} />
                  {item.label}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* LOG OUT — ALWAYS AT BOTTOM */}
        <div className="border-t border-gray-200 pt-4">
          <Button
            variant="menu"
            onClick={handleLogout}
            className="text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} />
            Logga ut
          </Button>
        </div>
      </nav>
    </>
  );
};

export default UserSideMenu;
