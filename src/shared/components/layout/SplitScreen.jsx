// src/components/user/layout/SplitScreen.jsx
import React from 'react';

const SplitScreen = ({ leftContent, rightContent }) => {
  return (
    <div className='min-h-screen flex'>
      {/* VÄNSTER SIDA - Traffic Yellow */}
      <div className='hidden lg:flex lg:w-1/2 bg-traffic-yellow relative overflow-hidden'>
        {/* Dekorativa element */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-traffic-black rounded-full -translate-y-48 translate-x-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-traffic-black rounded-full translate-y-48 -translate-x-48" />
        </div>
        
        {/* Content */}
        <div className='relative z-10 flex flex-col justify-center px-16 py-12'>
          {leftContent}
        </div>

        {/* Decorative pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-traffic-black from-0% to-transparent to-100% opacity-5" />
      </div>

      {/* HÖGER SIDA - White/Light background */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative'>
        {/* Mobile logo för mindre skärmar */}
        <div className="lg:hidden absolute top-8 left-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-traffic-yellow rounded-xl flex items-center justify-center text-2xl">
              🚦
            </div>
            <span className="text-2xl font-bold text-traffic-black">Trafikskolan</span>
          </div>
        </div>

        <div className='w-full max-w-md mt-20 lg:mt-0'>
          {rightContent}
        </div>
      </div>
    </div>
  ); 
}; 

export default SplitScreen;
