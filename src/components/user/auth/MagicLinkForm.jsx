import React, { useState } from 'react';
import RegisterForm from '../../forms/RegisterForm';
import LoginForm from '../../forms/LoginForm';
import Alert from '../../shared/ui/Alert';

const MagicLinkForm = () => {
    const [showRegister, setShowRegister] = useState(false); 
    const [message, setMessage] = useState({ text: '', type: '' }); 

    const clearMessage = () => setMessage({ text: '', type: '' }); 

    const showSuccessMessage = (text) => {
        setMessage({ text, type: 'success' }); 
    };

    const showErrorMessage = (text) => {
        setMessage({ text, type: 'error' }); 
    };

    const handleLoginSuccess = (email) => {
        clearMessage(); 
        showSuccessMessage(`Länk skickat till ${email}!`);
    }; 

    const handleRegisterSuccess = (email) => {
        clearMessage(); 
        showSuccessMessage(`Konto skapat! Länk skickat till ${email}! Kolla din E-post för att logga in.`);
    };

    const handleError = (errorMessage) => {
        clearMessage(); 
        showErrorMessage(errorMessage); 
    };

    const SwitchToRegister = () => {
        clearMessage(); 
        setShowRegister(true);
    };

    const switchToLogin = () => {
        clearMessage(); 
        setShowRegister(false); 
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-traffic-black mb-3">
                    {showRegister ? 'Skapa Konto' : 'Välkommen Tillbaka'}
                </h2>
                <p className="text-gray-600 text-lg">
                    {showRegister 
                        ? 'Fyll i dina uppgifter för att komma igång' 
                        : 'Logga in med din e-post för att fortsätta'
                    }
                </p>
            </div>

            {/* Success/Error Message */}
            {message.text && (
                <Alert
                    message={message.text}
                    type={message.type}
                    className="mb-6"
                />
            )}

            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-8">
                {showRegister ? (
                    <RegisterForm
                        onSuccess={handleRegisterSuccess}
                        onError={handleError}
                        onSwitchToLogin={switchToLogin}
                    />
                ) : (
                    <LoginForm
                        onSuccess={handleLoginSuccess}
                        onError={handleError}
                        onSwitchToRegister={SwitchToRegister}
                    />
                )}
            </div>

            {/* Email Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">💡</span>
                    <div>
                        <p className="text-sm font-semibold text-blue-800 mb-1">
                            Inloggning via e-post
                        </p>
                        <p className="text-sm text-blue-700">
                            Vi skickar en säker inloggningslänk till din e-post. Ingen lösenord behövs!
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                    Genom att fortsätta godkänner du våra{' '}
                    <a href="/terms" className="text-traffic-black font-medium hover:underline">
                        Användarvillkor
                    </a>
                    {' '}och{' '}
                    <a href="/privacy" className="text-traffic-black font-medium hover:underline">
                        Integritetspolicy
                    </a>
                </p>
            </div>
        </div>
    );
};

export default MagicLinkForm;