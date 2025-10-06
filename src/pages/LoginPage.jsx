// LoginPage.jsx - Uppdaterad version
import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Message from '../components/ui/Message';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import TokenForm from '../components/forms/TokenForm';

const LoginPage = ({ onLoginSuccess }) => {
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState(''); // <-- Lägg till global error state
  const [urlToken, setUrlToken] = useState('');

  // Kolla URL för token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      setUrlToken(token);
      setShowTokenForm(true);
    }
  }, []);

  const clearMessages = () => {
    setSuccess('');
    setError('');
  };

  const handleLoginSuccess = (email, response) => {
    clearMessages();
    setUserEmail(email);
    setSuccess(`Magic link skickad till ${email}!`);
    setShowTokenForm(true);
  };

  const handleLoginError = (errorMessage) => {
    setSuccess(''); // Rensa success-meddelanden
    setError(errorMessage); // Visa backend-felmeddelandet
  };

  const handleRegisterSuccess = (email, response) => {
    clearMessages();
    setUserEmail(email);
    setSuccess(`Konto skapat! Magic link skickad till ${email}!`);
    setShowTokenForm(true);
  };

  const handleRegisterError = (errorMessage) => {
    setSuccess(''); // Rensa success-meddelanden
    setError(errorMessage); // Visa backend-felmeddelandet
  };

  const handleTokenSuccess = (response) => {
    onLoginSuccess?.(response);
  };

  const handleTokenError = (errorMessage) => {
    setSuccess(''); // Rensa success-meddelanden
    setError(errorMessage); // Visa backend-felmeddelandet
  };

  const handleSwitchToRegister = () => {
    clearMessages();
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    clearMessages();
    setShowRegister(false);
  };

  const handleBackToLogin = () => {
    setShowTokenForm(false);
    clearMessages();
    setUserEmail('');
    setUrlToken('');
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* VÄNSTER SIDA */}
      <div className="hidden lg:flex lg:w-1/2 bg-traffic-yellow flex-col justify-center px-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-traffic-black mb-6">
            Välkommen till Trafikskolan
          </h1>
          <p className="text-lg text-traffic-black mb-8">
            Din väg till körkortet börjar här. Logga in eller skapa ett konto 
            för att komma åt dina kurser och boka körlektioner.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-traffic-black rounded-full mr-3"></div>
              <span className="text-traffic-black">Interaktiva teorilektioner</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-traffic-black rounded-full mr-3"></div>
              <span className="text-traffic-black">Boka körlektioner enkelt</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-traffic-black rounded-full mr-3"></div>
              <span className="text-traffic-black">Följ din framsteg</span>
            </div>
          </div>
        </div>
      </div>

      {/* HÖGER SIDA */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card>
            {/* GLOBALA MEDDELANDEN */}
            {success && (
              <Message type="success" className="mb-4">
                {success}
              </Message>
            )}
            
            {error && (
              <Message type="error" className="mb-4">
                {error}
              </Message>
            )}

            {/* FORMULÄR LOGIK */}
            {showRegister ? (
              <RegisterForm
                onSuccess={handleRegisterSuccess}
                onError={handleRegisterError}  // <-- Använd backend-fel
                onSwitchToLogin={handleSwitchToLogin}
              />
            ) : !showTokenForm ? (
              <LoginForm
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}  // <-- Använd backend-fel
                onSwitchToRegister={handleSwitchToRegister}
              />
            ) : (
              <TokenForm
                initialToken={urlToken}
                userEmail={userEmail}
                onSuccess={handleTokenSuccess}
                onError={handleTokenError}  // <-- Använd backend-fel
                onBack={handleBackToLogin}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;