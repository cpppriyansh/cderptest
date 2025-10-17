"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from '@/styles/HomePage/OurStats.module.css';

const premiumClients = [
  "Accenture.avif", "wipro.avif", "infosys.avif", "google.avif",
  "microsoft.avif", "cognizant.avif", "tcs.avif", "amdocs.avif",
  "ibm.avif", "paytm.avif", "capgemini.avif", "swiggy.avif",
  "hdfc.avif", "God.avif", "bajaj.avif", "bharatpe.avif", "pizza-hut.avif",
];

const enterpriseClients = [
  "exl.avif", "volkswagon.avif", "jindal.avif", "john-deere.avif",
  "bostonbyte.avif", "sharechat.webp", "leapfinance.avif",
  "moneytap.avif", "whitehat.avif", "cummins.avif",
];

const growingClients = [
  "airmeet.avif", "ask.avif", "bharatgri.avif", "capita.avif",
  "crisi.avif", "eatfit.avif", "genius.avif", "homelane.avif",
  "iss.avif", "kelly.avif",
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MarqueeRow = ({ logos, direction = "left", speed = "normal", shuffle = false }) => {
  const [logosToUse, setLogosToUse] = useState(logos);

  useEffect(() => {
    setLogosToUse(shuffle ? shuffleArray(logos) : logos);
  }, [logos, shuffle]);

  const speedMultiplier = { slow: "40s", normal: "30s", fast: "20s" }[speed];
  const animationClass = direction === "right" ? "animate-marquee-reverse" : "animate-marquee";

  const cardStyle = {
    width: '120px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '4px',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-4 sm:gap-6 md:gap-8 ${animationClass}`}
        style={{ width: "max-content", animationDuration: speedMultiplier }}
      >
        {logosToUse.map((logo, index) => (
          <div 
            key={`first-${index}`} 
            className="flex-shrink-0 group"
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
            }}
          >
            <Image
  src={`/Ourclients/${logo}`}
  alt={`${(logo.split('/').pop() || logo).replace(/\.[^/.]+$/, '')}`}
  width={120}
  height={100}
  className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
  loading="lazy"
  quality={75}
/>

          </div>
        ))}
        {logosToUse.map((logo, index) => (
          <div 
            key={`second-${index}`} 
            className="flex-shrink-0 group"
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
            }}
          >
            <Image
  src={`/Ourclients/${logo}`}
  alt={`${(logo.split('/').pop() || logo).replace(/\.[^/.]+$/, '')}`}
  width={120}
  height={100}
  className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
  loading="lazy"
  quality={75}
/>

          </div>
        ))}
      </div>
    </div>
  );
};

const OurClients = () => {
  return (
    <section 
      className="py-6 sm:py-8 md:py-10 relative" 
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        overflow: 'hidden',
        maxWidth: '1800px',
        margin: '0 auto'
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-50" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23bfc5ca\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12">
          <div className={styles.t2pTitle}>
            <h2>Our Clients</h2>
            <div className={styles.titleUnderline}></div>
            <p className={styles.subtitle}>Trusted by industry leaders worldwide</p>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-blue-100 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-blue-100 to-transparent z-10 pointer-events-none"></div>
            <MarqueeRow logos={premiumClients} direction="left" speed="slow" shuffle={true} />
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-blue-100 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-blue-100 to-transparent z-10 pointer-events-none"></div>
            <MarqueeRow logos={enterpriseClients} direction="right" speed="normal" shuffle={false} />
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-blue-100 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-blue-100 to-transparent z-10 pointer-events-none"></div>
            <MarqueeRow logos={growingClients} direction="left" speed="fast" shuffle={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
