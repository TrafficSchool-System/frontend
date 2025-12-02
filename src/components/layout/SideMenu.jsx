// src/components/layout/SideMenu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const menuItems = [
  { label: "Start", path: "/" },
  { label: "Quiz", path: "#" },
  { label: "Resultat", path: "/results" },
  { label: "Profil", path: "/profile" },
];

const SideMenu = ({ onLogout, open, setOpen }) => {
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
          fixed top-0 left-0 h-full bg-gray-100 border-r border-gray-300 
          w-64 p-6 flex flex-col z-50 transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* MOBILE CLOSE BUTTON */}
        <button className="md:hidden mb-6" onClick={() => setOpen(false)}>
          <X size={28} />
        </button>

        {/* MENU ITEMS */}
        <div className="flex-1">
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.label === "Quiz" ? (
                <>
                  <button
                    onClick={() => setShowQuizOptions((prev) => !prev)}
                    className="w-full text-left py-2 px-2 rounded hover:bg-traffic-yellow mb-1"
                  >
                    Quiz
                  </button>

                  {showQuizOptions && (
                    <div className="ml-4">
                      <button
                        onClick={() => {
                          navigate("/quiz/practice");
                          setOpen(false);
                        }}
                        className="w-full text-left py-2 px-2 rounded hover:bg-traffic-yellow mb-1"
                      >
                        Övningsquiz
                      </button>

                      <button
                        onClick={() => {
                          navigate("/quiz/final");
                          setOpen(false);
                        }}
                        className="w-full text-left py-2 px-2 rounded hover:bg-traffic-yellow mb-1"
                      >
                        Slutprov
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                  className="w-full text-left py-2 px-2 rounded hover:bg-traffic-yellow mb-1"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* LOG OUT — ALWAYS AT BOTTOM */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-2 rounded text-gray-600 hover:bg-traffic-yellow"
        >
          Logga ut
        </button>
      </nav>
    </>
  );
};

export default SideMenu;
