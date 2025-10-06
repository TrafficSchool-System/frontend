// src/components/ui/ErrorDisplay.jsx
import React from 'react';
import Button from './Button';

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  onDismiss, 
  title = "Något gick fel",
  fullScreen = true 
}) => {
  if (!error) return null;

  const containerClass = fullScreen 
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClass}>
      <div className="card max-w-md w-full bg-red-50 border-red-200">
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Error icon */}
          <div className="text-red-500 text-4xl">⚠️</div>
          
          {/* Title */}
          <h2 className="text-lg font-semibold text-red-800">{title}</h2>
          
          {/* Error message */}
          <p className="text-red-700">{error}</p>
          
          {/* Action buttons */}
          <div className="flex space-x-3">
            {onRetry && (
              <Button 
                onClick={onRetry}
                variant="primary"
                size="sm"
              >
                Försök igen
              </Button>
            )}
            
            {onDismiss && (
              <Button 
                onClick={onDismiss}
                variant="secondary" 
                size="sm"
              >
                Stäng
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;