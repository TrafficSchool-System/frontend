
import React from 'react';

const LoadingSpinner = ({ 
    message = "Laddar...", 
    fullScreen = true,
    size = 'default',
    gradient = true
}) => {
    const sizes = {
        small: 'text-4xl',
        default: 'text-6xl',
        large: 'text-8xl'
    };

    const textSizes = {
        small: 'text-base',
        default: 'text-xl',
        large: 'text-2xl'
    };

    const containerClass = fullScreen
        ? `min-h-screen flex items-center justify-center ${gradient ? 'bg-linear-to-br from-gray-50 to-blue-50' : ''}`
        : "flex items-center justify-center p-8"; 

    return (
        <div className={containerClass}>
            <div className='text-center'>
                <div className={`${sizes[size]} mb-4 animate-pulse`}>⏳</div>
                <p className={`${textSizes[size]} text-gray-700 font-medium`}>
                    {message}
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner; 