// src/components/layout/SideMenu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Start", path: "#" },
  { label: "Quiz", path: "#" },
  { label: "Resultat", path: "#" },
  { label: "Profil", path: "#" }
];

// SideMenu - Komponenten tar emot en prop ´onLogout´ som hanterar utloggning
const SideMenu = ({ onLogout }) => {

  // Hook för att navigera mellan sidor
  const navigate = useNavigate();
  // State variabel som styr om quiz-alternativ ska visas eller döljas i menyn
  const [showQuizOptions, setShowQuizOptions] = useState(false); 

  // Funktion som hanterar utloggningen
  const handleLogout = async () => {
    if (onLogout) onLogout(); // Anropa useAuth.logout()
    navigate("/login"); // Gå till login-sidan
  };

  // Funktion som växlar visningen av quizalternativen
  const toggleQuizOptions = () => {

    // Använder tidigare värde av showQuizOptions för att växla mellan true/false
    setShowQuizOptions((prev) => !prev);  
  };

return (

    // Navigationselementet som utgör hela sidomenyn
    <nav className="w-48 bg-gray-100 border-1 border-gray-300 min-h-screen flex flex-col py-8 px-4">

      {/* Loopa igenom alla menyobjekt som finns definierade i menuItems */}
      {menuItems.map((item) => (

        // React.Fragment används för att kunna returnera flera element utan extra wrapper-div
        <React.Fragment key={item.label}>

          {/* Om menyobjektet är "Quiz", visa en knapp som kan expandera/visa undermenyer */}
          {item.label === "Quiz" ? (
            <>

             {/* Huvudknappen för Quiz – klick togglar visningen av quizalternativ */}
              <button
                onClick={toggleQuizOptions}
                className="w-full text-left py-2 px-2 rounded hover:bg-traffic-yellow transition mb-1"
              >
                {item.label}
              </button>

              {/* Om showQuizOptions är true, visa undermenyerna */}
              {showQuizOptions && (
                <div className="ml-4">

                  {/* Knapp för att gå till övningsquiz */}
                  <button
                    onClick={() => navigate("/quiz/practice")}
                    className="w-full text-left py-2 px-2 rounded hover:bg-traffic-yellow transition mb-1"
                  >
                    Övningsquiz
                  </button>

                  {/* Knapp för att gå till slutprov */}
                  <button
                    onClick={() => navigate("/quiz/final")}
                    className="w-full text-left py-2 px-2 rounded hover:bg-traffic-yellow transition mb-1"
                  >
                    Slutprov
                  </button>
                </div>
              )}
            </>
          ) : (

            // För alla andra menyobjekt (Start, Resultat, Profil etc.)
            // skapa en vanlig knapp som navigerar till respektive sida
            <button
              onClick={() => navigate(item.path)}
              className="w-full text-left py-2 px-2 rounded hover:bg-traffic-yellow transition mb-1"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Logga ut-knapp längst ner i menyn */}
      <button
        onClick={handleLogout}
        className="w-full text-center py-2 px-2 rounded text-gray-500 hover:bg-traffic-yellow transition mt-auto cursor-pointer"
      >
        Logga ut
      </button>
    </nav>
  );
};

export default SideMenu;
