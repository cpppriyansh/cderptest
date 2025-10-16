import React, { Suspense } from "react";
import { getQuizByTopic } from "@/utils/quizUtils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import QuizContent from "@/components/quiz/QuizContent";

export async function generateMetadata({ params }) {
  // Ensure params is resolved
  const resolvedParams = await Promise.resolve(params);
  const { topic } = resolvedParams;
  const quiz = topic ? getQuizByTopic(topic) : null;

  if (!quiz) {
    return {
      title: "Quiz Not Found - Connecting Dots ERP",
      description:
        "The requested quiz topic was not found. Explore our other interactive quizzes to test your knowledge.",
    };
  }

  const formattedTopic = topic
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = `${formattedTopic} Quiz | Test Your Knowledge - Connecting Dots ERP`;
  const description = `Challenge yourself with our comprehensive ${formattedTopic} quiz. Test your skills with ${quiz.questions?.length || "multiple"} interactive questions and improve your expertise.`;
  const url = `https://connectingdotserp.com/quiz/${topic}`;
  const imageUrl = `https://connectingdotserp.com/images/quiz-${topic}.jpg`;

  return {
    title,
    description,
    keywords: `${formattedTopic} quiz, ${formattedTopic} test, ${formattedTopic} assessment, online quiz, skill test, Connecting Dots ERP`,

    // Open Graph Tags
    openGraph: {
      title,
      description,
      url,
      siteName: "Connecting Dots ERP",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${formattedTopic} Quiz - Connecting Dots ERP`,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    // Twitter Card Tags
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@CD_ERP",
      creator: "@CD_ERP",
    },

    // Additional Meta Tags
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function QuizPage({ params }) {
  // Ensure params is resolved
  const resolvedParams = await Promise.resolve(params);
  console.log('QuizPage params:', resolvedParams); // Debug log
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QuizContent params={resolvedParams} />
    </Suspense>
  );
}
