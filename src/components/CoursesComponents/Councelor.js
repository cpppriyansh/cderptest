"use client"; //  Next.js Client Component

import React, { useEffect, useState } from "react";
import Btnform from "@/components/HomePage/Btnform";
import styles from "@/styles/CoursesComponents/Councelor.module.css";
import dynamic from "next/dynamic";
const AOSModule = dynamic(() => import('aos'), { ssr: false });
import 'aos/dist/aos.css'

const Councelor = () => {
  const [showForm, setShowForm] = useState(false)

  const handleButtonClick = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (typeof window !== "undefined") {
        const AOS = (await import('aos')).default;
        // Defer init to idle time to avoid layout thrash during LCP
        const init = () => AOS.init({ duration: 150, once: true, startEvent: 'load' });
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => mounted && init(), { timeout: 2000 });
        } else {
          setTimeout(() => mounted && init(), 800);
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div className={styles.counselorContainer}>
        <video
          className={styles.backgroundVideo}
          src="https://i.imgur.com/OKLCgpA.mp4"
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
        <div className={styles.counselorContent} data-aos="zoom-in">
          <div className={styles.counselorText} data-aos="fade-right">
            {/* Your text or other content goes here */}
          </div>
          <div className={styles.buttonContainer} data-aos="fade-left">
            <button
              className={styles.requestButton}
              onClick={handleButtonClick}
            >
              Request Callback
            </button>
          </div>
        </div>
      </div>
      {showForm && <Btnform onClose={handleCloseForm} />}
    </div>
  )
}

export default Councelor
