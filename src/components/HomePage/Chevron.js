// File: components/Chevron.js

import React from "react";
import styles from "@/styles/HomePage/Chevron.module.css";

const Phases = () => {
  // Using an array to reduce repeated code while maintaining the same structure
  const phaseItems = [
    {
      id: "1",
      title: "Enroll",
      className: styles.highestSalary,
      marginTop: "10px",
    },
    {
      id: "2",
      title: "Corporate Style Training",
      className: styles.highestSalary,
      marginTop: "0",
    },
    {
      id: "3",
      title: "Real-Time Projects",
      className: styles.studentsTrained,
      marginTop: "0",
    },
    {
      id: "4",
      title: "Interview Preparation",
      className: styles.hiringCompanies,
      marginTop: "0",
    },
    {
      id: "5",
      title: "Experience Alteration",
      className: styles.totalBranches,
      marginTop: "0",
    },
    {
      id: "6",
      title: "Job Assistance",
      className: styles.highestSalary,
      marginTop: "0",
    },
  ];

  return (
    <div className={styles.containerCH}>
      <h2 
        className={styles.sectionTitle}
        style={{
          // Inline critical styles for LCP optimization
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '4px',
          textAlign: 'center',
          margin: '0',
          padding: '0',
          // Optimize font loading
          fontDisplay: 'swap',
        }}
      >
        Training To Placement Approach
      </h2>
      <div className={styles.titleUnderline}></div>
      <div 
        className={styles.phases}
        style={{
          // Inline critical layout styles
          textAlign: 'center',
          marginTop: '10px',
          backgroundColor: '#ffffff',
          paddingTop: '10px',
          paddingBottom: '8px',
          paddingLeft: '8px',
          borderRadius: '20px',
          boxShadow: '7px 5px 5px #000000',
        }}
      >
        <ul>
          {phaseItems.map((phase) => (
            <li
              key={phase.id}
              className={`${styles.chevronItem} ${phase.className}`}
            >
              <a href={`#${phase.id}`}>
                <h4 
                  style={{ 
                    marginTop: phase.marginTop,
                    fontSize: '18px',
                    marginLeft: '20px',
                    marginBottom: '10px',
                  }}
                >
                  {phase.title}
                </h4>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Phases;
