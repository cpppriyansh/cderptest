"use client";

import { useEffect, useState } from "react";
import CImage from "@/components/CImage";

const FixedLogo = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show logo only when at the top (within 15px of top)
      setIsVisible(currentScrollY <= 15);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-2 right-8 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <CImage
        src="/Navbar/connecting dot erp logo.avif"
        alt="ERP Logo"
        width={170}
        height={100}
        sizes="(max-width: 768px) 40px, 70px"
        className="object-contain"
      />
    </div>
  );
};

export default FixedLogo;