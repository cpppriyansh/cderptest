'use client';  // Makes this a client component - allows ssr: false in dynamic

import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

// Dynamic imports with ssr: false (now allowed in client component)
const Hero = dynamic(() => import("@/components/TestingAbout/Hero"), {
  ssr: false,  // Skip server rendering - loads only on client (avoids hook errors)
  loading: () => <div className="h-[400px] bg-gray-100 flex items-center justify-center">Loading hero...</div>,
});

const AchievementsSection = dynamic(() => import("@/components/TestingAbout/Achievements"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 flex items-center justify-center">Loading achievements...</div>,
});

const OurBranch = dynamic(() => import("@/components/TestingAbout/Locations"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 flex items-center justify-center">Loading locations...</div>,
});

const SAPCompassDial = dynamic(() => import("@/components/TestingAbout/Placement"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 flex items-center justify-center">Loading placements...</div>,
});

const SAPAdoptionRings = dynamic(() => import("@/components/TestingAbout/SapComp"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 flex items-center justify-center">Loading SAP content...</div>,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://connectingdotserp.com/#organization",
      "name": "Connecting Dots ERP",
      "url": "https://connectingdotserp.com/",
      "sameAs": [
        "https://www.facebook.com/connectingdotserp/",
        "https://www.linkedin.com/company/connecting-dots-erp/",
        "https://www.instagram.com/connectingdotserp/"
      ],
      "logo": {
        "@type": "ImageObject",
        "@id": "https://connectingdotserp.com/#logo",
        "url": "https://connectingdotserp.com/images/logo.png",
        "width": 500,
        "height": 500,
        "caption": "Connecting Dots ERP"
      },
      "image": {
        "@id": "https://connectingdotserp.com/#logo"
      },
      "description": "Premier training institute for SAP, IT, and professional courses with placement support in Pune, Mumbai, and Raipur.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1st Floor, Sai Arcade, Wakad - Hinjewadi Rd, Wakad",
        "addressLocality": "Pune",
        "postalCode": "411057",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-1234567890",
        "contactType": "customer service",
        "email": "info@connectingdotserp.com",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://connectingdotserp.com/#website",
      "url": "https://connectingdotserp.com/",
      "name": "Connecting Dots ERP",
      "description": "Premier training institute for SAP, IT, and professional courses with placement support in Pune, Mumbai, and Raipur.",
      "publisher": {
        "@id": "https://connectingdotserp.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://connectingdotserp.com/?s={search_term_string}"
        },
        "query-input": {
          "@type": "PropertyValueSpecification",
          "valueRequired": true,
          "valueName": "search_term_string"
        }
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://connectingdotserp.com/#educationalorganization",
      "name": "Connecting Dots ERP Training Institute",
      "description": "Premier training institute for SAP, IT, and professional courses with placement support in Pune, Mumbai, and Raipur.",
      "url": "https://connectingdotserp.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://connectingdotserp.com/images/logo.png"
      },
      "sameAs": [
        "https://www.facebook.com/connectingdotserp/",
        "https://www.linkedin.com/company/connecting-dots-erp/"
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "1st Floor, Sai Arcade, Wakad - Hinjewadi Rd, Wakad",
          "addressLocality": "Pune",
          "postalCode": "411057",
          "addressCountry": "IN"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "Office No. 12, 3rd Floor, Sai Chambers, Sector 11, CBD Belapur",
          "addressLocality": "Navi Mumbai",
          "postalCode": "400614",
          "addressCountry": "IN"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "1st Floor, City Center Mall, G.E. Road",
          "addressLocality": "Raipur",
          "postalCode": "492001",
          "addressCountry": "IN"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-1234567890",
        "contactType": "admissions",
        "email": "admissions@connectingdotserp.com",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Training Programs",
        "itemListElement": [
          {
            "@type": "EducationalOccupationalProgram",
            "name": "SAP Training",
            "description": "Comprehensive SAP training with certification support",
            "programPrerequisites": "Basic computer knowledge"
          },
          {
            "@type": "EducationalOccupationalProgram",
            "name": "IT Professional Courses",
            "description": "Industry-relevant IT courses with hands-on training"
          },
          {
            "@type": "EducationalOccupationalProgram",
            "name": "HR Training",
            "description": "Professional HR certification and training programs"
          }
        ]
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "EducationalOccupationalProgram",
            "name": "SAP FICO",
            "description": "SAP FICO Training with Real-time Projects",
            "programPrerequisites": "Basic accounting knowledge"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "EducationalOccupationalProgram",
            "name": "SAP MM",
            "description": "SAP Materials Management Training"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "EducationalOccupationalProgram",
            "name": "SAP SD",
            "description": "SAP Sales and Distribution Training"
          }
        }
      ]
    }
  ]
};

// Static branches data
const branches = [
  {
    city: "Pune",
    address: "1st Floor, Sai Arcade, Wakad - Hinjewadi Rd, Wakad, Pune, Maharashtra 411057",
    phone: "+91 1234567890",
    email: "pune@connectingdotserp.com",
    coords: { lat: 18.5993, lng: 73.7449 }
  },
  {
    city: "Mumbai",
    address: "Office No. 12, 3rd Floor, Sai Chambers, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614",
    phone: "+91 1234567891",
    email: "mumbai@connectingdotserp.com",
    coords: { lat: 19.0225, lng: 73.0297 }
  },
  {
    city: "Raipur",
    address: "1st Floor, City Center Mall, G.E. Road, Raipur, Chhattisgarh 492001",
    phone: "+91 1234567892",
    email: "raipur@connectingdotserp.com",
    coords: { lat: 21.2409, lng: 81.6337 }
  }
];

const AboutUsPage = () => {
  return (
    <>
      {/* Page-specific metadata via next/head (works in client components) */}
      <Head>
        <title>About Us | Connecting Dots ERP - SAP Training Institute in Pune, Mumbai & Raipur</title>
        <meta name="description" content="Discover our story, expert trainers, and commitment to SAP, IT, and HR training with 100% placement support across multiple locations." />
        <meta name="keywords" content="About Connecting Dots ERP, SAP Training Institute About, IT Training Pune About, HR Courses Mumbai About, Professional Training Raipur" />
        <meta name="author" content="Connecting Dots ERP Team" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://connectingdotserp.com/aboutus" />
        
        {/* OpenGraph for social sharing */}
        <meta property="og:title" content="About Connecting Dots ERP | Premier SAP Training Institute" />
        <meta property="og:description" content="Learn about our 10+ years of excellence in SAP, software, and professional training with branches in Pune, Mumbai, and Raipur." />
        <meta property="og:url" content="https://connectingdotserp.com/aboutus" />
        <meta property="og:site_name" content="Connecting Dots ERP" />
        <meta property="og:image" content="https://connectingdotserp.com/images/about-hero.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Connecting Dots ERP Team and Training" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        
        {/* Twitter cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Connecting Dots ERP" />
        <meta name="twitter:description" content="Premier SAP and IT training institute with expert-led courses and placement assistance." />
        <meta name="twitter:site" content="@connectingdotserp" />
        <meta name="twitter:image" content="https://connectingdotserp.com/images/about-hero.jpg" />
      </Head>

      <div className="min-h-screen bg-white">
        <Hero />
        <AchievementsSection />
        <SAPCompassDial />
        <SAPAdoptionRings />
        <OurBranch branches={branches} />
        
        {/* JSON-LD for structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </>
  );
};

export default AboutUsPage;
