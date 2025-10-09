import React from 'react'


const SplitScreen = ( { leftContent, rightContent}) => {


    return (
        <div className='min-h-screen flex'>

            {/* VÄNSTER SIDA */}
            <div className='hidden lg:flex lg:w-1/2 bg-traffic-yellow flex-col justify-center px-12'>
                {leftContent}
            </div>

            {/* HÖGER SIDA */}
            <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>

                <div className='w-full max-w-md'>
                    {rightContent}
                </div>

            </div>

        </div>

    ); 
}; 

export default SplitScreen