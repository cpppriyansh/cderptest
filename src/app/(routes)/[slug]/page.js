// src/app/(routes)/[slug]/page.js
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import {
  generateDynamicMetadata,
  generateDynamicJsonLd,
} from "@/lib/dynamicSEO";
import { coursesData, citiesData } from "@/lib/masterData";

// Enable ISR to keep pages fresh without full SSR on every request
export const revalidate = 86400; // 24 hours

// Prebuild known course-city slugs to improve TTFB for popular pages
export async function generateStaticParams() {
  const params = [];
  for (const courseSlug of Object.keys(coursesData)) {
    for (const citySlug of Object.keys(citiesData)) {
      params.push({ slug: `${courseSlug}-in-${citySlug}` });
    }
  }
  return params;
}

// Lazy-load components with sensible SSR defaults for SEO and LCP
const DSHeader = dynamic(() => import("@/components/CoursesComponents/Header"), {
  ssr: true,
});
const Why = dynamic(() => import("@/components/CoursesComponents/Why"), {
  ssr: true,
});
const Counselor = dynamic(
  () => import("@/components/CoursesComponents/Councelor")
);
const TrustUs = dynamic(() => import("@/components/CoursesComponents/Trustus"));
const Certificate = dynamic(
  () => import("@/components/HomePage/Certificate"),
  { ssr: true }
);
const Program = dynamic(
  () => import("@/components/CoursesComponents/ProgramHighlights")
);
const Description = dynamic(
  () => import("@/components/CoursesComponents/Description"),
  { ssr: true }
);
const FAQ = dynamic(() => import("@/components/CoursesComponents/FAQ"), {
  ssr: true,
});
const CoursesRelated = dynamic(
  () => import("@/components/CoursesComponents/RelatedCourses")
);
const SapModComponent = dynamic(
  () => import("@/components/CoursesComponents/sapmod"),
  { ssr: true }
);
const Modules = dynamic(() => import("@/components/CoursesComponents/Modules"), {
  ssr: true
});
const Curriculum = dynamic(
  () => import("@/components/CoursesComponents/Curriculam"),
  { ssr: true }
);
const HrCard = dynamic(() => import("@/components/CoursesComponents/HRCard"), {
  ssr: true
});

// Helper: parse slug into course and city
function parseSlug(slug) {
  const lastInIndex = slug.lastIndexOf("-in-");
  if (lastInIndex === -1) {
    return null;
  }
  let coursePart = slug.substring(0, lastInIndex);
  coursePart = coursePart.replace(
    /-course$|-training$|-developer$|-developer-course$|-developer-training$/,
    ""
  );
  const cityPart = slug.substring(lastInIndex + 4);
  return { courseSlug: coursePart, citySlug: cityPart };
}

// Metadata generation (fast path, no unnecessary awaits)
export async function generateMetadata({ params }) {
  const slug = params?.slug;
  if (!slug) return {};

  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { courseSlug, citySlug } = parsed;
  if (!coursesData[courseSlug] || !citiesData[citySlug]) return {};

  const metadata = generateDynamicMetadata(courseSlug, citySlug);
  if (!metadata) return {};

  const metadataObject = {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: metadata.robots,
    authors: metadata.authors,
    alternates: {
      canonical: metadata.canonical,
      languages: metadata.alternates.reduce((acc, alt) => {
        if (alt.hreflang && alt.href) acc[alt.hreflang] = alt.href;
        return acc;
      }, {}),
    },
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
    icons: {
      icon: metadata.icons.icon,
      apple: metadata.icons.appleTouchIcon,
    },
    manifest: metadata.manifest,
  };

  if (metadata.isMajorCity && metadata.enhancedMeta) {
    metadataObject.other = metadataObject.other || {};
    Object.assign(metadataObject.other, {
      "geo.region": metadata.enhancedMeta.geoRegion,
      "geo.placename": metadata.enhancedMeta.geoPlacename,
      "geo.position": metadata.enhancedMeta.geoPosition,
      ICBM: metadata.enhancedMeta.icbm,
      "course.provider": metadata.enhancedMeta.courseProvider,
      "course.location": metadata.enhancedMeta.courseLocation,
      "course.category": metadata.enhancedMeta.courseCategory,
      "theme-color": metadata.enhancedMeta.themeColor,
      "msapplication-navbutton-color":
        metadata.enhancedMeta.msApplicationNavButtonColor,
      "apple-mobile-web-app-status-bar-style":
        metadata.enhancedMeta.appleStatusBarStyle,
      "mobile-web-capable": metadata.enhancedMeta.mobileWebCapable,
      "apple-mobile-web-app-capable": metadata.enhancedMeta.appleMobileCapable,
      "apple-mobile-web-app-title": metadata.enhancedMeta.appleMobileTitle,
    });
  }

  if (metadata.facebook?.appId) {
    metadataObject.other = metadataObject.other || {};
    metadataObject.other["fb:app_id"] = metadata.facebook.appId;
  }
  if (metadata.pinterest?.richPin) {
    metadataObject.other = metadataObject.other || {};
    metadataObject.other["pinterest-rich-pin"] = metadata.pinterest.richPin;
  }

  return metadataObject;
}

// Server-side placeholder processing to avoid client work
function processPlaceholders(obj, cityNameToUse) {
  if (typeof obj === "string") {
    return obj.replace(/{city}/g, cityNameToUse);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => processPlaceholders(item, cityNameToUse));
  }
  if (typeof obj === "object" && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = processPlaceholders(obj[key], cityNameToUse);
    }
    return newObj;
  }
  return obj;
}

// Office info JSX (replaces string-based HTML injection)
function OfficeInfo({ city, courseTitle }) {
  if (!city?.hasOffice || !city?.office) return null;
  const { address, phone, hours, rating, reviewCount, mapUrl } = city.office;
  return (
    <section className="our-local-presence">
      <h3>Visit Our Training Center in {city.name}</h3>
      <p>We&apos;re proud to offer in-person training at our state-of-the-art facility in {city.name}.</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Operating Hours:</strong> {hours.open} - {hours.close} daily</p>
      <p>Rated <strong>{rating}/5</strong> by {reviewCount} students on Google.</p>
      {mapUrl ? (
        <p>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            Get Directions to our {courseTitle} Training Center
          </a>
        </p>
      ) : null}
    </section>
  );
}

const CourseCityPage = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) return notFound();

  const parsed = parseSlug(slug);
  if (!parsed) return notFound();

  const { courseSlug, citySlug } = parsed;
  const course = coursesData[courseSlug];
  const city = citiesData[citySlug];
  if (!course || !city) return notFound();

  const jsonLd = generateDynamicJsonLd(courseSlug, citySlug);

  const headerData = processPlaceholders(course.header, city.name);
  const whyData = processPlaceholders(course.why, city.name);
  const sapModData = course.sapMod ? processPlaceholders(course.sapMod, city.name) : null;
  const modulesData = course.modulesData ? processPlaceholders(course.modulesData, city.name) : null;
  const certificateData = processPlaceholders(course.certificate, city.name);
  const faqData = processPlaceholders(course.faq, city.name);
  const relatedCoursesData = processPlaceholders(course.relatedCourses, city.name);

  const descriptionContentData = processPlaceholders(course.descriptionContent, city.name);

  const isMultiSectionCourse =
    descriptionContentData &&
    (descriptionContentData.main ||
      descriptionContentData.ppc ||
      descriptionContentData.seo);

  const shouldUseNewCurriculum =
    modulesData && modulesData.tabs && Array.isArray(modulesData.tabs);
  const shouldUseLegacyModules = modulesData && !shouldUseNewCurriculum;

  // Build JSX for previously injected dynamic body content to avoid innerHTML
  const DynamicBodyContent = () => (
    <div className="course-main-content">
      <h1 className="visually-hidden">{course.title} Course in {city.name}</h1>
      <h2 className="visually-hidden">Best {course.fullTitle} Training in {city.name}</h2>
      <p className="visually-hidden">{course.description.replace(/{city}/g, city.name)}</p>

      <section className="course-summary">
        <h3>About Our {course.fullTitle} Course</h3>
        <p>
          Our comprehensive {course.title} course in {city.name} is designed to equip you with {course.modules.length} key modules, practical skills, and industry insights over {course.duration}.
        </p>
        <p>
          Get ready for a successful career in roles such as {course.jobRoles.slice(0, 2).join(" or ")}.
        </p>
      </section>

      <OfficeInfo city={city} courseTitle={course.title} />

      <section className="career-path">
        <h3>Career Opportunities After {course.fullTitle} Training</h3>
        <p>Upon successful completion, you&apos;ll be prepared for diverse and rewarding career paths, including:</p>
        <ul>
          {course.jobRoles.map((role, i) => (
            <li key={i}>{role}</li>
          ))}
        </ul>
      </section>
    </div>
  );

  // Digital Marketing specialized layout
  if (courseSlug === "digital-marketing" && isMultiSectionCourse) {
    return (
      <>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        <DynamicBodyContent />

        {/* Above-the-fold priority */}
        <DSHeader data={headerData} />
        <Why data={whyData} />
        {sapModData && <SapModComponent data={sapModData} />}

        {/* Curriculum: split + stream */}
        {shouldUseNewCurriculum && (
          <div id="curriculum" style={{ scrollMarginTop: "80px" }}>
            <Suspense fallback={null}>
              <Curriculum data={course} />
            </Suspense>
          </div>
        )}
        {shouldUseLegacyModules && (
          <div id="modules" style={{ scrollMarginTop: "80px" }}>
            <Suspense fallback={null}>
              <Modules data={modulesData} />
            </Suspense>
          </div>
        )}

        {/* Counselor can hydrate client-side only */}
        <Suspense fallback={null}>
          <Counselor />
        </Suspense>

        {/* Main description + anchored subsections */}
        {descriptionContentData.main && <Description data={descriptionContentData.main} />}

        <div id="pay-per-click" style={{ scrollMarginTop: "80px" }}>
          {descriptionContentData.ppc && (
            <Description data={descriptionContentData.ppc} sectionIndex={0} />
          )}
        </div>

        <TrustUs />

        <div id="search-engine-optimization" style={{ scrollMarginTop: "80px" }}>
          {descriptionContentData.seo && (
            <Description data={descriptionContentData.seo} sectionIndex={1} />
          )}
        </div>

        <Certificate data={certificateData} />
        <Program />

        <div id="social-media-marketing" style={{ scrollMarginTop: "80px" }}>
          {descriptionContentData.smm && (
            <Description data={descriptionContentData.smm} sectionIndex={0} />
          )}
        </div>

        <div id="advance-analytics" style={{ scrollMarginTop: "80px" }}>
          {descriptionContentData.analytics && (
            <Description data={descriptionContentData.analytics} sectionIndex={1} />
          )}
        </div>

        <FAQ data={faqData} />
        <CoursesRelated data={relatedCoursesData} currentCityName={city.name} />
      </>
    );
  }

  // Default layout for other courses (SAP, HR, Data Analytics, etc.)
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <DynamicBodyContent />

      {/* Above-the-fold priority */}
      <DSHeader data={headerData} />
      <Why data={whyData} />
      {sapModData && <SapModComponent data={sapModData} />}

      {/* Curriculum: stream in */}
      {shouldUseNewCurriculum && (
        <div id="curriculum" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            <Curriculum data={course} />
          </Suspense>
        </div>
      )}
      {shouldUseLegacyModules && (
        <div id="modules" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            <Modules data={modulesData} />
          </Suspense>
        </div>
      )}

      {/* Defer non-critical UI */}
      <Suspense fallback={null}>
        <Counselor />
        <TrustUs />
        <Program />
      </Suspense>

      {/* Single description section */}
      <Description data={descriptionContentData} />

      <FAQ data={faqData} />
      {course.category === "hr" && <HrCard />}
      <CoursesRelated data={relatedCoursesData} currentCityName={city.name} />
    </>
  );
};

export default CourseCityPage;
