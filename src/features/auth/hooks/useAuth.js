import { useEffect, useState } from "react";
import authService from "../services/authService";
import { STORAGE_KEYS } from "@shared/constants/config";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔐 Initierar autentisering...");

      try {
        // STEG 1: Kolla URL för token (från email-länk)
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");

        if (urlToken) {
          console.log("🔗 Token hittad i URL, loggar in automatiskt...");

          // STEG 2: Verifiera URL token automatiskt
          const response = await authService.verifyTokenWithJwt(urlToken);
          setUser(response.user);
          
          // ✅ DEBUG: Verifiera subscription status
          console.log("✅ Automatisk inloggning lyckades!", {
            user: response.user,
            hasActiveSubscription: response.user?.hasActiveSubscription,
            role: response.user?.role
          });

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

        console.log("🔍 Kollar localStorage:", {
          hasToken: !!existingToken,
          hasUser: !!savedUser,
        });

        if (existingToken && savedUser) {
          console.log("🔑 Befintlig session hittad i localStorage");

          try {
            // Sätt användare DIREKT från localStorage (för snabb inloggning)
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            console.log(
              "✅ Användare återställd från localStorage:",
              parsedUser,
            );

            // VALIDERA OMEDELBART med backend för att få senaste subscription status
            // VIKTIGT: Detta körs synkront för att säkerställa korrekt hasActiveSubscription
            try {
              const validatedUser = await authService.validateTokenWithBackend();
              
              if (validatedUser) {
                console.log("✅ Backend-validering lyckades - uppdaterar user med senaste data", {
                  hasActiveSubscription: validatedUser.hasActiveSubscription,
                  email: validatedUser.email
                });
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
              console.error("❌ Backend-validering kastade fel:", validationError);
              // Vid 401 - logga ut (token ogiltig)
              if (validationError.response?.status === 401) {
                console.log("🚪 Token utgången/ogiltig (401), loggar ut...");
                authService.logout();
                setUser(null);
                setError("Din session har gått ut. Vänligen logga in igen.");
              } else {
                // Vid andra fel (500, nätverksfel) - förblir inloggad med cached data
                console.warn(
                  "⚠️ Backend-validering misslyckades men användaren förblir inloggad med cached data"
                );
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
          console.log("ℹ️ Ingen befintlig session hittad");
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
    console.log("👤 Användare inloggad:", response.user || response);
  };

  // Logut funktiner för komponenter
  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
    console.log("Användaren utloggad");
  };

  // Clear error funktion
  const clearError = () => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated: !!user,
  };
};
