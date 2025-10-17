// src/app/layout.js - With Partytown Integration

import { Lato, Rubik } from "next/font/google";
import Script from "next/script";
import { Partytown } from "@builder.io/partytown/react";
import "./globals.css";

// Static imports for components that are part of the main layout
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";
import ServerPing from "@/components/ServerPing";

// This wrapper will contain all our client-side logic, like Context Providers
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

// --- Font Setup ---
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const rubik = Rubik({
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

// --- Constants ---
const GTM_ID = "GTM-MB68QM2V";
const FB_PIXEL_ID = "3414178115554916";
const AHREFS_KEY = "GO9/n+0kqNt/v3P+gIXeHg/61ypeA";

// --- SITE-WIDE METADATA ---
export const metadata = {
  title: {
    default: "Connecting Dots ERP | SAP Training Institute",
  },
  description:
    "Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support for your career.",
  verification: {
    google: "KRKFsO9AAW2a8qImif8Wj4uzzjmWGA0R6o7IZFJcmPo",
    other: {
      "ahrefs-site-verification":
        "2e4a5544d39fb390cae326f00bcaca1570f754a57923aa22bdf08313fe9404ed",
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${rubik.variable}`}>
      <head>
        {/* Partytown Component - MUST be in <head> */}
        <Partytown 
          debug={false} 
          forward={["dataLayer.push", "fbq"]} 
        />
        {/* Preconnect for Tawk to speed up DNS/TLS */}
        <link rel="preconnect" href="https://embed.tawk.to" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//embed.tawk.to" />
        
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`body bg-black ${lato.className} ${rubik.className}`}
        suppressHydrationWarning={true}
      >
        {/* GTM noscript fallback - Required for users with JavaScript disabled */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Server Ping Component - optional via env flag to reduce JS */}
        {process.env.NEXT_PUBLIC_ENABLE_PING === "true" && <ServerPing />}

        {/* Server-Side Rendered Components */}
        <CallAdvisorsStrip />
        <Marquee />
        <Navbar />

        {/* The ClientLayoutWrapper contains the CityProvider and wraps the children */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>

        <Footer />

        {/* GTM Script - Offloaded to Web Worker */}
        <Script
          id="gtm-script"
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Facebook Pixel - Offloaded to Web Worker */}
        <Script
          id="facebook-pixel"
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Ahrefs Analytics - Offloaded to Web Worker */}
        <Script
          id="ahrefs-analytics"
          src="/api/ahrefs"
          data-key={AHREFS_KEY}
          type="text/partytown"
        />
      </body>
    </html>
  );
}
