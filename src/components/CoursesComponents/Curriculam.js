"use client";

import React, { useState, useEffect } from "react";
import Btnform from "@/components/HomePage/Btnform";

function Curriculum({ data }) {
  const [activeTab, setActiveTab] = useState("beginner");
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Get the curriculum data from the new structure
  const curriculumData = data?.modulesData;

  useEffect(() => {
    if (curriculumData?.tabs?.length > 0) {
      setActiveTab(curriculumData.tabs[0].type);
      setSelectedModule(0);
      setSelectedToolIndex(0);
      setSelectedTopicIndex(null);
    }
  }, [curriculumData]);

  // Form handling functions (simplified like Counselor component)
  const handleStartLearningClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    setShowForm(false);

    // After form submission, redirect to learning platform
    setTimeout(() => {
      if (curriculumData.globalActions?.startLearning) {
        window.open(curriculumData.globalActions.startLearning, "_blank");
      } else {
        // Fallback URL or action
        alert(
          "Thank you for your interest! We'll contact you soon with learning details."
        );
      }
    }, 1000);
  };

  if (!curriculumData) {
    return (
      <div className="w-full py-16 mb-16">
        <div className="p-8 text-center text-gray-500">
          No curriculum data available.
        </div>
      </div>
    );
  }

  // Get current tab data
  const currentTabData = curriculumData.tabs.find(
    (tab) => tab.type === activeTab
  );
  if (!currentTabData?.modules?.length) {
    return (
      <div className="w-full py-16 mb-16">
        <div className="p-8 text-center text-gray-500">
          No modules available for this track.
        </div>
      </div>
    );
  }

  // Get current module
  const currentModule = currentTabData.modules[selectedModule];
  const tools = currentModule?.toolsAndTechnologies || [];

  const handleTabChange = (tabType) => {
    setActiveTab(tabType);
    setSelectedModule(0);
    setSelectedToolIndex(0);
    setSelectedTopicIndex(null);
  };

  const handleModuleChange = (moduleIndex) => {
    setSelectedModule(moduleIndex);
    setSelectedToolIndex(0);
    setSelectedTopicIndex(null);
  };

  return (
    <div className="w-full max-w-[1800px] m-auto bg-gray-50 mb-4 sm:mb-8 lg:mb-10">
      {/* Wrapper container with proper spacing */}
      <div className="min-h-[600px] max-h-[800px] flex flex-col bg-gray-50 rounded-lg overflow-hidden shadow-lg">
        {/* Header with Title */}
        <div className="w-full flex justify-center items-center py-4 bg-white border-b border-gray-200 flex-shrink-0">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-center bg-gradient-to-r from-blue-900 via-cyan-700 to-blue-900 bg-clip-text text-transparent px-4">
            {curriculumData.title}
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 bg-gray-50 overflow-hidden">
          <div className="w-full bg-white flex flex-col">
            {/* Current Module Header */}
            <div className="flex-shrink-0 border-b border-gray-100">
              <div className="max-w-7xl mx-auto pt-4 pb-4 px-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Current Module Display */}
                  <div
                    className="flex items-center px-4 py-3 rounded-lg text-white font-semibold text-sm sm:text-base w-full sm:w-auto sm:max-w-[350px] overflow-hidden"
                    style={{
                      minHeight: "44px",
                      background: "#00AEEF",
                      boxShadow:
                        "0 4px 20px rgba(0, 174, 239, 0.4), 0 0 0 1px rgba(0, 174, 239, 0.1)",
                      filter: "drop-shadow(0 2px 8px rgba(0, 174, 239, 0.3))",
                    }}
                  >
                    {tools[0] && (
                      <img
                        src={tools[0].icon}
                        alt={currentModule?.title}
                        className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <span className="truncate flex-1">
                      {currentModule?.title}
                    </span>
                    <span className="ml-2 text-xs text-white font-normal whitespace-nowrap">
                      ({currentModule?.duration})
                    </span>
                  </div>

                  {/* Module Selection Buttons */}
                  <div className="flex flex-row gap-2 overflow-x-auto w-full sm:w-auto">
                    {currentTabData.modules.map((module, index) => (
                      <button
                        key={index}
                        onClick={() => handleModuleChange(index)}
                        className={`px-3 py-2 rounded-lg border-2 min-w-[100px] max-w-[180px] flex-shrink-0 text-xs font-medium transition-all duration-300 overflow-hidden ${
                          selectedModule === index
                            ? "text-white border-[#1d3b75] shadow-md bg-[#1d3b75]"
                            : "text-gray-700 border-gray-300 bg-white hover:bg-[#1d3b75] hover:border-[#1d3b75]"
                        }`}
                        style={{ minHeight: "40px" }}
                      >
                        <span className="truncate block">{module.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Module Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Topics Section */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-gray-900">
                        Topics Covered
                      </h3>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {currentModule?.content?.map((topic, index) => (
                          <div
                            key={index}
                            className={`flex items-start p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                              selectedTopicIndex === index
                                ? "border-[#162e5b] bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() =>
                              setSelectedTopicIndex(
                                selectedTopicIndex === index ? null : index
                              )
                            }
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                              style={{ background: "#bacced" }}
                            ></div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 leading-relaxed">
                                {topic}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                Comprehensive coverage with practical examples
                                and hands-on exercises.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools & Technologies */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-gray-900">
                        Tools & Technologies
                      </h3>

                      {/* Tools Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {tools.map((tool, index) => (
                          <div
                            key={index}
                            className={`flex flex-col items-center p-3 rounded-lg border-2 hover:border-sky-300 hover:shadow-sm transition-all duration-200 cursor-pointer ${
                              selectedToolIndex === index
                                ? "border-sky-500 bg-sky-50"
                                : "border-gray-200"
                            }`}
                            style={{ minHeight: "80px" }}
                            onClick={() => setSelectedToolIndex(index)}
                          >
                            <img
                              src={tool.icon}
                              alt={tool.name}
                              className="w-6 h-6 sm:w-8 sm:h-8 mb-2"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                            <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                              {tool.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Banner */}
                      {curriculumData.banner && (
                        <div className="my-6">
                          <img
                            src="https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp"
                            alt="IT Courses Banner"
                            className="w-full rounded-lg shadow-lg object-cover"
                            style={{ boxShadow: "0 0 24px 0 #1d3b75" }}
                          />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {/* Start Learning Button - Now opens form */}
                        <button
                          onClick={handleStartLearningClick}
                          className="px-4 py-3 rounded-lg text-white font-semibold text-sm bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <span className="flex items-center justify-center">
                            {formSubmitted ? "Submitted!" : "Start Learning"}
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </button>

                        {/* Download Curriculum Button */}
                        <button
                          onClick={() => {
                            if (
                              curriculumData.globalActions?.downloadCurriculum
                            ) {
                              window.open(
                                curriculumData.globalActions.downloadCurriculum,
                                "_blank"
                              );
                            }
                          }}
                          className="px-4 py-3 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <span className="flex items-center justify-center">
                            Download Curriculum
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Form Connection (same as Counselor component) */}
      {showForm && (
        <Btnform onClose={handleCloseForm} onSubmit={handleFormSubmit} />
      )}

      {/* Success Message */}
      {formSubmitted && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Thank you! We'll contact you soon.
          </div>
        </div>
      )}
    </div>
  );
}

export default Curriculum;
