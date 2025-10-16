"use client";

import dynamic from "next/dynamic";

// Lazy client components
const DSHeader = dynamic(() => import("./Header"));
const Why = dynamic(() => import("./Why"));
const Counselor = dynamic(() => import("./Councelor"));
const TrustUs = dynamic(() => import("./Trustus"));
const Certificate = dynamic(() => import("../HomePage/Certificate"));
const Program = dynamic(() => import("./ProgramHighlights"));
const Description = dynamic(() => import("./Description"));
const FAQ = dynamic(() => import("./FAQ"));
const CoursesRelated = dynamic(() => import("./RelatedCourses"));
const SapModComponent = dynamic(() => import("./sapmod"));
const Modules = dynamic(() => import("./Modules"));
const Curriculum = dynamic(() => import("./Curriculam"));
const HrCard = dynamic(() => import("./HRCard"));

export default function ClientCourseSections(props) {
  const {
    layoutType, // 'digital' | 'default'
    headerData,
    whyData,
    sapModData,
    course,
    modulesData,
    descriptionContentData,
    certificateData,
    faqData,
    relatedCoursesData,
    currentCityName,
    courseCategory,
    shouldUseNewCurriculum,
    shouldUseLegacyModules,
  } = props;

  if (layoutType === "digital") {
    return (
      <>
        <DSHeader data={headerData} />
        <Why data={whyData} />
        {sapModData && <SapModComponent data={sapModData} />}

        {shouldUseNewCurriculum && <Curriculum data={course} />} 
        {shouldUseLegacyModules && <Modules data={modulesData} />}

        <Counselor />

        {/* Main description section */}
        <Description data={descriptionContentData.main} />

        {/* PPC Section with scroll anchor */}
        <div id="pay-per-click" style={{ scrollMarginTop: "80px" }}>
          {descriptionContentData.ppc && (
            <Description data={descriptionContentData.ppc} sectionIndex={0} />
          )}
        </div>

        <TrustUs />

        {/* SEO Section with scroll anchor */}
        <div id="search-engine-optimization" style={{ scrollMarginTop: "80px" }}>
          {descriptionContentData.seo && (
            <Description data={descriptionContentData.seo} sectionIndex={1} />
          )}
        </div>

        <Certificate data={certificateData} />
        <Program />

        {/* SMM Section with scroll anchor */}
        <div id="social-media-marketing" style={{ scrollMarginTop: "80px" }}>
          {descriptionContentData.smm && (
            <Description data={descriptionContentData.smm} sectionIndex={0} />
          )}
        </div>

        {/* Analytics Section with scroll anchor */}
        <div id="advance-analytics" style={{ scrollMarginTop: "80px" }}>
          {descriptionContentData.analytics && (
            <Description data={descriptionContentData.analytics} sectionIndex={1} />
          )}
        </div>

        <FAQ data={faqData} />
        <CoursesRelated data={relatedCoursesData} currentCityName={currentCityName} />
      </>
    );
  }

  // default layout
  return (
    <>
      <DSHeader data={headerData} />
      <Why data={whyData} />

      {sapModData && <SapModComponent data={sapModData} />}

      {shouldUseNewCurriculum && (
        <div id="curriculum" style={{ scrollMarginTop: "80px" }}>
          <Curriculum data={course} />
        </div>
      )}
      {shouldUseLegacyModules && (
        <div id="modules" style={{ scrollMarginTop: "80px" }}>
          <Modules data={modulesData} />
        </div>
      )}

      <Counselor />
      <TrustUs />
      <Program />
      <Certificate data={certificateData} />

      {/* Single description section for non-multi-section courses */}
      <Description data={descriptionContentData} />

      <FAQ data={faqData} />
      {courseCategory === "hr" && <HrCard />}
      <CoursesRelated data={relatedCoursesData} currentCityName={currentCityName} />
    </>
  );
}


