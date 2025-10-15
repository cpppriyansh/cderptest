'use client';

// Note: Metadata has been moved to metadata.js for better separation
// and to avoid conflicts with client-side components
import dynamic from "next/dynamic";
import LazyHydrate from 'react-lazy-hydration';

// --- Critical & Dynamic Component Imports ---
// Critical above-the-fold component - load immediately
import HeaderCarousel from "@/components/HomePage/HeaderCarousel";

// Lazy load below-the-fold components for better performance
const Marquee = dynamic(() => import("@/components/HomePage/Marquee2"), {
  ssr: false,
  loading: () => <div style={{ height: "60px" }} />,
});

const Chevron = dynamic(() => import("@/components/HomePage/Chevron"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100px" }} />,
});

const Keypoints = dynamic(() => import("@/components/HomePage/Keypoints"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "300px" }} />,
});

const OurClients = dynamic(() => import("@/components/HomePage/OurClients"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "200px" }} />,
});

const PlacementSection = dynamic(
  () => import("@/components/HomePage/PlacementSection"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "400px" }} />,
  }
);

const OurStats = dynamic(() => import("@/components/HomePage/OurStats"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "250px" }} />,
});

const Achievements = dynamic(
  () => import("@/components/HomePage/Achievements"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "300px" }} />,
  }
);

const FeedbackAndReviews = dynamic(
  () => import("@/components/HomePage/FeedbackandReviews"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "400px" }} />,
  }
);

const DemoCertificate = dynamic(() => import("@/components/HomePage/DemoCertificate"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "300px" }} />,
});

const Branches = dynamic(() => import("@/components/HomePage/Branches"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "350px" }} />,
});

const Courses = dynamic(() => import("@/components/HomePage/PopCourses"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "400px" }} />,
});

// JSON-LD data for structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://connectingdotserp.com/#organization",
      name: "Connecting Dots ERP SAP Training Institute",
      url: "https://connectingdotserp.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://connectingdotserp.com/Navbar/logo.webp",
        width: 180,
        height: 60,
      },
      sameAs: [
        "https://www.facebook.com/sapinstallation.pune.9",
        "https://x.com/CD_ERP",
        "https://www.instagram.com/connecting_dots_sap_training",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+919004002958",
        contactType: "Customer Support",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
      description:
        "We offer expert-led training in SAP, Software Development, Digital Marketing, and HR courses with strong placement support for your career.",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress:
            "1st Floor, 101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh",
          addressLocality: "Pune",
          addressRegion: "MH",
          postalCode: "411027",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress:
            "8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400601",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress:
            "8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West",
          addressLocality: "Raipur",
          addressRegion: "Chhattisgarh",
          postalCode: "492001",
          addressCountry: "IN",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: "18.586532821424697",
        longitude: "73.78137250928907",
      },
      foundingDate: "2013",
      founder: {
        "@type": "Person",
        name: "Nitendra Singh",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "185",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
    {
      "@type": "Product",
      "@id": "https://connectingdotserp.com/#product",
      name: "SAP Course",
      description: "Comprehensive SAP covering all modules.",
      image: "https://i.imgur.com/HbmlQ9u.png",
      url: "https://connectingdotserp.com/",
      brand: {
        "@type": "Brand",
        name: "Connecting Dots ERP",
      },
      offers: {
        "@type": "Offer",
        price: "75000",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        validFrom: "2025-04-01",
      },
    },
    {
      "@type": "Course",
      "@id": "https://connectingdotserp.com/#course",
      name: "SAP Course",
      description:
        "Comprehensive SAP with modules designed to help you master SAP systems.",
      provider: {
        "@type": "Organization",
        name: "Connecting Dots ERP",
        url: "https://connectingdotserp.com/",
      },
    },
    {
      "@type": "VideoObject",
      "@id": "https://connectingdotserp.com/#video",
      name: "Introduction to ConnectingDots",
      description:
        "Connecting Dots ERP is a SAP and software training institute in Pune offering a wide range of career enhancement courses. We offer SAP Courses Digital Marketing & HR along with other IT courses.",
      embedUrl: "https://youtu.be/7YRbfuv7R3k?si=cqdu5buZ-Ya_-O8R",
      uploadDate: "2025-04-03",
      duration: "PT5M",
      thumbnailUrl: "https://i.imgur.com/HbmlQ9u.png",
      publisher: {
        "@type": "Organization",
        name: "Connecting Dots ERP",
      },
    },
    {
      "@type": "SpecialAnnouncement",
      "@id": "https://connectingdotserp.com/#announcement",
      headline: "Batches Starting Soon",
      text: "Connecting Dots ERP is a SAP and software training institute in Pune offering a wide range of career enhancement courses. We offer SAP Courses Digital Marketing & HR along with other IT courses.",
      url: "https://connectingdotserp.com/",
      datePosted: "2025-06-10",
      expires: "2025-12-31",
      publisher: {
        "@id": "https://connectingdotserp.com/#organization",
      },
      announcementLocation: {
        "@type": "Place",
        "@id": "https://connectingdotserp.com/pune/#localbusiness",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Page Content */}
      <main className="flex-col justify-center">
        {/* Above the fold - critical content */}
        <HeaderCarousel />
        <Marquee />
        
        
          <Chevron />
        
          <OurClients />
        
          <Keypoints />

          <Courses />
        
          <PlacementSection />
        
          <OurStats />
        
          <Achievements />
        
          <FeedbackAndReviews />
        
          <DemoCertificate />
        
          <Branches />
      </main>
    </>
  );
}
