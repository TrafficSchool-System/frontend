import React, { useState } from 'react';
import Card from '../ui/Card';
import Message from '../ui/Message';
import RegisterForm from '../forms/RegisterForm';
import LoginForm from '../forms/LoginForm';

const AuthCard = () => {
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
        <Card>
            {message.text && (
                <Message 
                    type={message.type} 
                    message={message.text} 
                    className="mb-4" 
                />
            )}

            {showRegister ? (
                <RegisterForm
                    onSuccess={handleRegisterSuccess}
                    onError={handleError}
                    onSwitchToLogin={switchToLogin}
                />
            ) : (
                <LoginForm
                    onSucces={handleLoginSuccess}
                    onError={handleError}
                    onSwitchToRegister={SwitchToRegister}
                />
            )}
        </Card>
    ); 
};

export default AuthCard;