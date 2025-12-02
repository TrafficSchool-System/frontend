import { useEffect, useState } from "react";

const ExamTimer = ({ expiresAt, onTimeUp }) => {
  // Lokalt satte som håller antal sekunder kvar, null = timer ej startat
  const [secondsLeft, setSecondsLeft] = useState(null);

  useEffect(() => {
    // Om inget exipresAt skickas in, gör inget
    if (!expiresAt) return;

    // Konvertera expiresAt (datum sträng) till millisekunder
    const expiry = new Date(expiresAt).getTime();

    // Funktion som beräknar hur mycket tid som återstår
    const updateTime = () => {
      
      // Räkna ut skillnaden mellan nu och expire-tiden i sekunder
      const remaining = Math.floor((expiry - Date.now()) / 1000);

      // Uppdatera state, men aldrig under 0
      setSecondsLeft(remaining > 0 ? remaining : 0);

      // Om tiden är slut -> kör callback funktionen 
      if (remaining <= 0) {

        onTimeUp();
      }
    };

    updateTime();

    // Kör updateTime varje sekund 
    const interval = setInterval(updateTime, 1000);

    // Rensa ntervallet när komponenten av-monteras eller expiresAt ändras
    return () => clearInterval(interval);
  }, [expiresAt, onTimeUp]);

  if (secondsLeft === null) return null;

  // Omvandla total sekunder → minuter och sekunder
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="text-right font-mono text-lg mb-4">
      Tid kvar: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default ExamTimer;