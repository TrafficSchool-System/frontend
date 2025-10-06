// src/App.jsx - REKOMMENDERAD VERSION
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import authService from './services/authService';
import './styles/globals.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verifiera att token fortfarande är giltig
          const response = await authService.verifyTokenWithJwt(token);
          setUser(response.user);
          console.log('Användaren är redan inloggad:', response.user);
        } catch (error) {
          console.error('Token verifiering misslyckades:', error);
          // Token är ogiltig, ta bort den
          localStorage.removeItem('token');
          console.log('Ogiltig token borttagen');
        }
      }
      
      setLoading(false);
    };

    checkExistingAuth();
  }, []);

  const handleLoginSuccess = (response) => {
    console.log('Login framgångsrik:', response);
    setUser(response.user || response);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    console.log('Användaren loggade ut');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card">
          <p className="text-center">Laddar Traffic School...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;