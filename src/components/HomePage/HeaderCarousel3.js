"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, XCircle, Brain, Zap, Trophy } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from "next/link";

// Circular Progress Component
const CircularProgressStep = ({ 
  currentStep, 
  totalSteps, 
  size = 80,
  strokeWidth = 6 
}) => {
  const progress = (currentStep / totalSteps) * 100;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-100">
          {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

const QuizCompo = ({ onReady }) => {
  const quizQuestions = [
    {
      question: "Which master data directly influences purchasing in SAP MM?",
      options: ["Material master and vendor master", "Cost center and work center", "BOM and routing", "Customer master and pricing condition records"],
      correctAnswer: 1
    },
    {
      question: "What does SAP stand for?",
      options: ["Systems, Analytics, Platforms", "Systems Applications and Products in Data Processing", "Software for Accounting Processes", "Standard Application Platform"],
      correctAnswer: 2
    },
    {
      question: "Which is SAP’s modern real-time ERP suite?",
      options: ["SAP R/3", "SAP ECC", "SAP S/4HANA", "SAP BW"],
      correctAnswer: 3
    },
    {
      question: "In the MM procurement cycle, which document usually comes first?",
      options: ["Purchase Order", "Goods Receipt", "Purchase Requisition", "Invoice"],
      correctAnswer: 3
    },
    {
      question: "Which module handles customer-to-cash?",
      options: ["MM", "PP", "SD", "QM"],
      correctAnswer: 3
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const typingDelay = 3;

  useEffect(() => {
    if (!isTyping) return;

    if (charIndex < currentQuestion.question.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentQuestion.question.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, typingDelay);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      setTimeout(() => {
        setShowOptions(true);
        if (currentQuestionIndex === 0 && typeof onReady === 'function') {
          onReady();
        }
      }, 25);
    }
  }, [charIndex, currentQuestion.question, isTyping, currentQuestionIndex, onReady]);

  useEffect(() => {
    if (answered || showFeedback) return;
    
    const questionTimer = setTimeout(() => {
      handleNextQuestion();
    }, 15000);

    return () => clearTimeout(questionTimer);
  }, [currentQuestionIndex, answered, showFeedback]);

  useEffect(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setShowOptions(false);
    setShowFeedback(false);
    
    setTimeout(() => {
      setDisplayedText('');
      setCharIndex(0);
      setIsTyping(true);
      setSelectedAnswer(null);
      setIsCorrect(false);
      setAnswered(false);
      setIsTransitioning(false);
    }, 150);
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (isTransitioning) return;
    setCurrentQuestionIndex(prev => (prev + 1) % quizQuestions.length);
  };

  const handlePrevQuestion = () => {
    if (isTransitioning) return;
    setCurrentQuestionIndex(prev => (prev - 1 + quizQuestions.length) % quizQuestions.length);
  };

  const handleQuestionSelect = (index) => {
    if (isTransitioning || index === currentQuestionIndex) return;
    setCurrentQuestionIndex(index);
  };

  const handleOptionClick = (optionIndex) => {
    if (showFeedback || answered) return;
    
    setSelectedAnswer(optionIndex);
    const correct = optionIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAnswered(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (!isTransitioning) {
        handleNextQuestion();
      }
    }, 3000);
  };

  return (
    <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#182E4A] via-[#182E4A] to-[#182E4A]">
        {/* Top Left Circle SVG */}
        <svg
          className="absolute bottom-50 left-0 w-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          style={{ height: '58%', rotate: '180deg' }}
        >
          <path
            d="M0,900 L300,900 Q500,750 700,550 Q900,400 1100,480 Q1300,560 1440,450 L1440,900 Z"
            fill="#ffffff"
          />
        </svg>

        {/* Bottom cream wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          style={{ height: '58%' }}
        >
          <path
            d="M0,900 L300,900 Q500,750 700,550 Q900,400 1100,480 Q1300,560 1440,450 L1440,900 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="container mx-auto mt-20 px-4 sm:px-2 md:px-8 lg:px-12 py-4 sm:py-8 md:py-12 lg:py-16 flex flex-col justify-center relative z-10">
        {/* Circular Progress Bar */}
        <div className="absolute top-0 mt-5 right-20 z-10">
          <CircularProgressStep 
            currentStep={currentQuestionIndex + 1}
            totalSteps={quizQuestions.length}
            size={80}
            strokeWidth={6}
          />
        </div>

        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-3 sm:space-y-4 md:space-y-6 mt-4">
          {/* Header */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200 bg-clip-text text-transparent">
                Quick Quiz
              </h1>
            </div>
            <p className="text-sm text-gray-100">
              Question {currentQuestionIndex + 1} of {quizQuestions.length} • Score: {score}
            </p>
          </div>

          {/* Question Section */}
          <div className="space-y-4">
            <div className="min-h-[60px] flex items-center justify-center">
              <h2 className="text-base sm:text-lg font-bold text-gray-100 leading-relaxed text-center">
                {displayedText}
                
              </h2>
            </div>
            
            {/* Options */}
            <div className={`grid grid-cols-2 gap-3 transition-all duration-500 ease-out transform ${
              showOptions && !isTransitioning ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={showFeedback || answered || isTransitioning}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  className={`w-full p-3 sm:p-4 min-h-[48px] sm:min-h-[56px] rounded-xl text-left font-medium transition-all duration-500 transform hover:scale-[1.02] active:scale-95 ${
                    showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 text-green-800 shadow-lg scale-105'
                        : index === selectedAnswer && !isCorrect
                        ? 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 text-red-800 shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-500 border-2 border-gray-200 scale-95 opacity-60'
                      : 'bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      showFeedback && index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white scale-110'
                        : showFeedback && index === selectedAnswer && !isCorrect
                        ? 'bg-red-500 text-white scale-110'
                        : 'bg-gradient-to-r from-blue-300 to-blue-500 text-white'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 break-words whitespace-normal text-xs sm:text-sm leading-tight">{option}</span>
                    {showFeedback && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600 animate-bounce" />
                    )}
                    {showFeedback && index === selectedAnswer && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-3 sm:p-4 rounded-xl text-center font-bold animate-bounceIn shadow-lg transition-all duration-500 transform ${
                isCorrect 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 scale-105' 
                  : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200 scale-105'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  {isCorrect ? (
                    <>
                      <Trophy className="w-5 h-5 animate-bounce" />
                      <span>🎉 Excellent! You got it right!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 animate-pulse" />
                      <span>💪 Good try! Keep learning!</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center min-h-*">
          <div className="flex-1 space-y-4 lg:space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mt-12">
              <Brain className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-3xl font-bold bg-white bg-clip-text text-transparent">
                  Interactive Quiz Preview
                </h1>
                <p className="text-gray-400 text-lg">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length} • Score: {score}/{quizQuestions.length}
                </p>
              </div>
            </div>

            {/* Question */}
            <div className="min-h-[80px] flex items-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 leading-tight">
                {displayedText}
              </h2>
            </div>

            {/* Options - Desktop Grid */}
            <div className={`grid grid-cols-2 gap-4 transition-all duration-600 ease-out transform ${
              showOptions && !isTransitioning ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={showFeedback || answered || isTransitioning}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  className={`p-4 lg:p-6 rounded-xl text-left font-semibold transition-all duration-500 transform hover:scale-105 active:scale-95 ${
                    showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 text-green-800 shadow-xl'
                        : index === selectedAnswer && !isCorrect
                        ? 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 text-red-800 shadow-xl'
                        : 'bg-gray-50 text-gray-500 border-2 border-gray-200 scale-95 opacity-60'
                      : 'bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 shadow-md hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      showFeedback && index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white scale-125'
                        : showFeedback && index === selectedAnswer && !isCorrect
                        ? 'bg-red-500 text-white scale-125'
                        : 'bg-gradient-to-r from-blue-300 to-blue-500 text-white'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showFeedback && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-6 h-6 text-green-600 animate-bounce" />
                    )}
                    {showFeedback && index === selectedAnswer && !isCorrect && (
                      <XCircle className="w-6 h-6 text-red-600 animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-center font-bold text-base lg:text-lg animate-bounceIn shadow-xl transition-all duration-500 transform ${
                isCorrect 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 scale-105' 
                  : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200 scale-105'
              }`}>
                <div className="flex items-center justify-center gap-3">
                  {isCorrect ? (
                    <>
                      <Trophy className="w-6 h-6 animate-bounce" />
                      <span>Outstanding! Perfect answer!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 animate-pulse" />
                      <span>Great effort! Keep going!</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Desktop Navigation Controls */}
            <div className="flex items-center justify-center gap-6 py-4">
              <button
                onClick={handlePrevQuestion}
                disabled={isTransitioning}
                className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-blue-600 rotate-180" />
              </button>
              
              <div className="flex space-x-2">
                {quizQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionSelect(index)}
                    disabled={isTransitioning}
                    className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                      index === currentQuestionIndex
                        ? 'bg-blue-500 text-white scale-110 shadow-lg'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:scale-105'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleNextQuestion}
                disabled={isTransitioning}
                className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>

            {/* Desktop Quiz Button */}
            <div className="flex justify-center pt-4">
              <Link href="/quiz" passHref>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-blue-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              </Link>
            </div>
          </div>
          
          {/* Right Side - Animation Space */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="w-full max-w-[700px]">
              <DotLottieReact
                src="https://lottie.host/22c5be73-3d80-42b8-9f36-2a36962bdf72/ZbI024bB27.lottie"
                loop
                autoplay
              />
            </div>

            {/* Button Content */}
            <Link href="/quiz" passHref>
              <button className="relative flex items-center bg-blue-600 p-3 rounded-full justify-center gap-3 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                <Zap className="w-6 h-6 text-white" />
                <span className="text-white font-extrabold">
                  Start Quiz
                </span>
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Bottom Section - Quiz Button and Indicators */}
        <div className="lg:hidden sticky bottom-4 z-50 mt-4 pb-2">
          <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 p-4 rounded-lg shadow-xl backdrop-blur-sm">
            {/* Eye-catching Quiz Button */}
            <div className="flex justify-center mb-4">
              <Link href="/quiz" passHref>
                <button className="relative flex items-center bg-blue-600 px-6 py-3 rounded-full justify-center gap-3 cursor-pointer hover:bg-blue-700 transition-colors duration-300 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6 text-white animate-bounce" />
                    <span className="text-white font-extrabold">
                      Start Quiz
                    </span>
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
            </div>

            {/* Question Indicators - Mobile */}
            <div className="flex justify-center space-x-2">
              {quizQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionSelect(index)}
                  disabled={isTransitioning}
                  className={`h-3 rounded-full transition-all duration-500 disabled:cursor-not-allowed ${
                    index === currentQuestionIndex 
                      ? 'bg-gradient-to-r from-blue-300 to-blue-600 w-8 shadow-lg' 
                      : 'bg-gray-300 w-3 hover:bg-gray-400 hover:w-4'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { transform: scale(1.1); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          .animate-bounceIn {
            animation: bounceIn 0.8s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default QuizCompo;
