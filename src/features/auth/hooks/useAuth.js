import { useEffect, useState } from "react";
import authService from "../services/authService";
import { STORAGE_KEYS } from "@shared/constants/config";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // STEG 1: Kolla URL för token (från email-länk)
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");

        if (urlToken) {
          // STEG 2: Verifiera URL token automatiskt
          const response = await authService.verifyTokenWithJwt(urlToken);
          setUser(response.user);

          // STEG 3: Rensa URL (Ta bort ?token=...)
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );

          setLoading(false);
          return; // Avsluta här, ingen ytterligare validering behövs
        }

        // STEG 4: Ingen URL token - kolla befintlig session i localStorage
        const existingToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (existingToken && savedUser) {
          try {
            // Sätt användare DIREKT från localStorage (för snabb inloggning)
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);

            // VALIDERA OMEDELBART med backend för att få senaste subscription status
            // VIKTIGT: Detta körs synkront för att säkerställa korrekt hasActiveSubscription
            try {
              const validatedUser =
                await authService.validateTokenWithBackend();

              if (validatedUser) {
                // Uppdatera user med senaste data från backend (inkl. hasActiveSubscription)
                setUser(validatedUser);
                // Uppdatera localStorage med senaste data
                localStorage.setItem(
                  STORAGE_KEYS.USER,
                  JSON.stringify(validatedUser),
                );
              } else {
                console.error("❌ Backend-validering misslyckades - loggar ut");
                // Token ogiltig - logga ut
                localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USER);
                setUser(null);
              }
            } catch (validationError) {
              console.error(
                "❌ Backend-validering kastade fel:",
                validationError,
              );
              // Vid 401 - logga ut (token ogiltig)
              if (validationError.response?.status === 401) {
                authService.logout();
                setUser(null);
                setError("Din session har gått ut. Vänligen logga in igen.");
              } else {
                // Vid andra fel (500, nätverksfel) - förblir inloggad med cached data
              }
            }
          } catch (parseError) {
            console.error(
              "❌ Fel vid parsning av sparad användare:",
              parseError,
            );
            authService.logout();
            setUser(null);
          }
        } else {
          // Ingen session
        }
      } catch (error) {
        console.error("❌ Autentiseringsfel:", error);
        setError(error.response?.data?.message || "Autentisering misslyckades");
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login funktion för komponenter
  const login = (response) => {
    setUser(response.user || response);
    setError(null);
  };

  // Logut funktiner för komponenter
  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  // Clear error funktion
  const clearError = () => {
    setError(null);
  };

  // Aktivera prenumeration direkt i React-state + localStorage
  const activateSubscription = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, hasActiveSubscription: true };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    activateSubscription,
    isAuthenticated: !!user,
  };
};
