"use client";

import CImage from "@/components/CImage";
import styles from "@/styles/AnimatedLogo.module.css"; 

const AnimatedLogo = () => {
  return (
    <div className={styles.logoContainer}>
      {/* CSS-based lines (always visible) */}
      <div className={styles.linesContainer}>
        <div className={`${styles.arcLine} ${styles.line1}`}></div>
        <div className={`${styles.arcLine} ${styles.line2}`}></div>
        <div className={`${styles.arcLine} ${styles.line3}`}></div>
      </div>

      {/* Center Arrow with up-down animation */}
      <div className={styles.centerArrow}>
        <CImage
          src="/Navbar/arrow.avif"
          alt="Logo Arrow"
          width={18}
          height={18}
          sizes="100vw"
          priority={true}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;