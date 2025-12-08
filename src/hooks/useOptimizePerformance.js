// /src/hooks/useOptimizePerformance.js

import { useEffect } from "react";

/**
 * A global performance optimization hook to:
 * - Reduce forced reflows
 * - Throttle scroll events
 * - Debounce resize events
 * - Batch DOM reads & writes in rAF
 */

export default function useOptimizePerformance() {
  
  // Scroll Throttle (Prevents layout thrashing)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.body.dataset.scrollY = window.scrollY.toString();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  // Resize Debounce (Prevents repeated reflows)
  useEffect(() => {
    let resizeTimeout = null;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        document.body.dataset.windowWidth = window.innerWidth.toString();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Smooth DOM writes without layout re-calc issues
  useEffect(() => {
    const updateLayout = () => {
      document.body.dataset.scrollY = window.scrollY.toString();
      document.body.dataset.windowWidth = window.innerWidth.toString();
    };

    const raf = requestAnimationFrame(updateLayout);
    return () => cancelAnimationFrame(raf);
  }, []);

}
