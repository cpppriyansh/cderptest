"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Head from "next/head";
import styles from "@/styles/CoursesComponents/Header.module.css?module";
import Btnform from "@/components/HomePage/Btnform";

// Custom Hook for typewriter sync (unchanged)
function useTypewriterSync(text, maxLen, duration = 3500) {
  const [displayed, setDisplayed] = useState("");
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    let rafId;
    let last = 0;
    const minFrameMs = 1000 / 30; // throttle to 30fps
    const animate = (t) => {
      if (!last || t - last >= minFrameMs) {
        last = t;
        const now = Date.now();
        const elapsed = (now - startTimeRef.current) % duration;
        const progress = elapsed / duration;
        const chars = Math.floor(progress * maxLen);
        setDisplayed(text.slice(0, chars));
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [text, maxLen, duration]);

  return displayed;
}

function TypewriterPlaceholderInput({ placeholder, syncLen, ...props }) {
  const animatedPlaceholder = useTypewriterSync(placeholder, syncLen);
  return <input {...props} placeholder={animatedPlaceholder} />;
}

// Country code data (unchanged)
const countryCodes = [ /* ...same as before... */ ];

const DSHeader = ({ data }) => {
  const [formData, setFormData] = useState({ countryCode: "+91", contact: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => {
        setStatusMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  if (!data) {
    return (
      <div className={styles.containerItDsHeader}>
        <p>Loading header data...</p>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "contact") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prevData) => ({ ...prevData, [name]: digitsOnly }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.contact) {
      setStatusMessage({ text: "Please fill all required fields", type: "error" });
      return false;
    }
    const selectedCountry = countryCodes.find((c) => c.code === formData.countryCode);
    if (!selectedCountry) return false;

    const { minLength, maxLength } = selectedCountry;
    if (formData.contact.length < minLength || formData.contact.length > maxLength) {
      setStatusMessage({
        text: `Phone number for ${selectedCountry.country} must be between ${minLength} and ${maxLength} digits`,
        type: "error",
      });
      return false;
    }

    const phoneRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!phoneRegex.test(formData.contact)) return false;
    if (!emailRegex.test(formData.email)) return false;

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed. Please try again.");

      setStatusMessage({ text: "Form submitted successfully!", type: "success" });
      setFormData({ name: "", email: "", course: "", countryCode: "+91", contact: "" });
    } catch (error) {
      setStatusMessage({ text: error.message, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  // LCP Preload Head Injection
  const videoSrc = data.backgroundVideo;
  const poster = data.backgroundPoster;

  return (
    <>
      <Head>
        {/* Preload hero video for early discovery to optimize LCP */}
        {videoSrc && (
          <link rel="preload" as="video" href={videoSrc} type="video/mp4" fetchpriority="high" />
        )}
      </Head>

      <div className={styles.containerItDsHeader}>
        {/* Hero Background Video: High fetch priority (no lazy load) */}
        <video
          className={styles.backgroundVideo}
          preload="auto"
          fetchpriority="high"
          autoPlay
          loop
          muted
          playsInline
          poster={poster || undefined}
          style={{ opacity: 0.5 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className={styles.leftSectionItDs}>
          <h2>
              <span className={styles.dsHeaderSpan} style={{ color: 'red', fontSize: '32px' }}>
                {data.title}
              </span>
            </h2>

          <h2><span className={styles.dsHeaderSpan2}>{data.subtitle}</span></h2>
          <p>{data.description}</p>
          <ul className={styles.featuresItDs}>
            {data.features.map((feature, i) => (
              <li key={i} className={styles.featuresItDsli}>{feature}</li>
            ))}
          </ul>

          <div className={styles.alumniItDs}>
            <span>Find our Alumni at -</span>
            <div className={styles.alumniLogosItDs}>
              {data.alumni.map((company, i) => (
                <img key={i} src={company.logo} alt={`${company.name} logo`} />
              ))}
            </div>
          </div>

          <div className={styles.buttons}>
            {data.buttons.map((button, index) => (
              <button
                key={index}
                className={index === 0 ? styles.buttonStyle1 : styles.buttonStyle2}
                onClick={handleButtonClick}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.rightSectionItDs}>
          <h3>{data.form.title}</h3>
          {statusMessage.text && (
            <div className={`${styles.statusMessage} ${styles[statusMessage.type]}`}>
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`${styles.form} formHeader_form__XLDrm`}>
            {(() => {
              const syncLen = Math.max(
                ...(data.form?.inputs?.filter((i) => !i.countryCode).map((i) => i.placeholder.length) || [0])
              );
              return data.form?.inputs?.map((input, i) => {
                if (input.countryCode) {
                  const selectedCountry = countryCodes.find(
                    (country) => country.code === formData.countryCode
                  );
                  const maxLength = selectedCountry?.maxLength || 10;
                  return (
                    <div key={i} className={styles.phoneInputItDs}>
                      <div className={styles.countryCodeWrapper}>
                        <select
                          id="countryCode"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className={styles.selectCountryCode}
                          disabled={isSubmitting}
                        >
                          {countryCodes.map(({ code, country }) => (
                            <option key={code} value={code}>
                              {code} ({country})
                            </option>
                          ))}
                        </select>
                      </div>
                      <TypewriterPlaceholderInput
                        type="tel"
                        id="contact"
                        name="contact"
                        placeholder="Enter phone number"
                        syncLen={syncLen}
                        value={formData.contact}
                        onChange={handleChange}
                        maxLength={maxLength}
                        required
                        disabled={isSubmitting}
                        className={styles.input}
                      />
                    </div>
                  );
                } else {
                  return (
                    <TypewriterPlaceholderInput
                      key={i}
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      syncLen={syncLen}
                      className={styles.input}
                      value={formData[input.name] || ""}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  );
                }
              });
            })()}

            <button
              type="submit"
              className={`${styles.submitButtonItDs} ${isSubmitting ? styles.loading : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.buttonText}>Submitting</span>
                  <span className={styles.buttonLoader}></span>
                </>
              ) : (
                data.form.submitText
              )}
            </button>
          </form>
        </div>

        {showForm && <Btnform onClose={handleCloseForm} />}
      </div>
    </>
  );
};

export default DSHeader;
