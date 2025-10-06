
import React from 'react'

const LoadingSpinner = ({ message = "Laddar...", fullScreen = true}) =>{
    const containerClass = fullScreen
        ? "min-h-screen flex items-center justify-center"
        : "flex items-center justify.center p-8"; 


    return (
        <div className={containerClass}>
            <div className='card'>
                <div className='flex flex-col items-center space-y-4'>

                    {/* Spinner animation */}
                    <div className='animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-traffic-yellow'></div>

                    {/* Message  */}
                    <p className='text-center text-muted-foreground'>
                        {message}

                    </p>

                </div>

            </div>

        </div>
    );
}

export default LoadingSpinner; 