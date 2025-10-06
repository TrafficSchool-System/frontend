import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Message from '../ui/Message';
import authService from '../../services/authService';

const TokenForm = ({ initialToken = '', onSuccess, onError, onBack }) => {
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyTokenWithJwt(token);
      localStorage.setItem('token', response.token);
      onSuccess?.(response);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ogiltig token';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="heading">Verifiera Token</h2>
      
      {error && (
        <Message type="error">
          {error}
        </Message>
      )}
      
      <Input
        label="Verifieringstoken"
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Ange din token"
        required
        disabled={loading}
      />
      
      <Button 
        type="submit" 
        variant="primary"
        loading={loading}
        disabled={!token}
      >
        Verifiera Token
      </Button>
      
      <Button 
        type="button" 
        variant="secondary"
        onClick={onBack}
        disabled={loading}
      >
        Tillbaka
      </Button>
    </form>
  );
};

export default TokenForm;