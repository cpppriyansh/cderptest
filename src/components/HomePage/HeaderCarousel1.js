"use client";
import React, { useState, useEffect } from 'react';

const CareerHeroSlide = ({ onOpenForm }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleButtonClick = () => {
    if (onOpenForm) onOpenForm();
  };

  return (
    <div className="relative w-full min-h-screen">
      
      {/* Wave Background */}
      <div className="absolute inset-0 bg-[#182E4A]">
      <svg
          className="absolute bottom-50 left-0 w-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          style={{ height: '58%', rotate: '180deg' }}
        >
          <path
            d="M0,900 L300,900 Q500,750 700,550 Q900,400 1100,480 Q1300,560 1440,450 L1440,900 Z"
            fill="#ffffff"
          />
        </svg>
        
        {/* Bottom cream wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          style={{ height: '58%' }}
        >
          <path
            d="M0,900 L300,900 Q500,750 700,550 Q900,400 1100,480 Q1300,560 1440,450 L1440,900 Z"
            fill="#ffffff"
          />
        </svg>

      </div>

      {/* Your Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-24 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-12 lg:gap-20 items-center md:min-h-[80vh]">
            
            {/* Left Content */}
            <div className={`space-y-3 sm:space-y-4 md:space-y-6 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              
              <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-6xl xl:text-6xl font-bold leading-tight text-white">
                <span className="block sm:inline">
                Secure your{" "}
                  <span className="text-[#93C5FD] relative inline-block">
                  Dream Career 
                   </span>
                </span>{" "}
                <span className="block sm:inline">with Live Classes </span>
              </h1>

              <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
                <span className="text-gray-100 font-normal text-sm sm:text-base md:text-lg lg:text-xl">From Industry Experts</span>
              </div>

              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-full sm:max-w-lg text-justify">
                For more than 10 years, we&apos;ve been passionate about providing engaging, 
                instructor-led training that helps professionals around the world grow and succeed.
              </p>

              <p className="text-gray-200 text-xs sm:text-sm">
                Est. 2013 Trusted by{' '}
                <span className="font-bold text-blue-600">5000+</span> Students
              </p>

              <div className="pt-1 sm:pt-2 md:pt-4">
                <button 
                  onClick={handleButtonClick}
                  className="group relative bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                  aria-label="Get free consultation"
                >
                  <span className="relative z-10">Free Consultation</span>
                </button>
              </div>

            </div>

            {/* Right Side - 3D Logo */}
            <div className={`hidden md:flex justify-center md:justify-end transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative group cursor-pointer">
                <div className="animate-float">
                  <img
                    src="https://res.cloudinary.com/dubeuisom/image/upload/v1756890589/3d-logo_1_qwvz8y.avif"
                    alt="3D Logo"
                    className="w-48 bg-white h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain rounded-xl shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        svg {
          filter: drop-shadow(0 -5px 12px rgba(0, 0, 0, 0.06));
        }
      `}</style>
    </div>
  );
};

export default CareerHeroSlide;
