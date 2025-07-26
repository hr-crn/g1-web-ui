// src/pages/Scores.jsx (or wherever you placed it)

import React from 'react';
import { useParams } from 'react-router-dom'; // Important: to get the quizSlug from the URL
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

function Scores() { // Changed from QuizScorePage to Scores
  const { quizSlug } = useParams(); // This hook extracts the dynamic part of the URL (e.g., "math-quiz")

  // Optional: Convert the slug back to a more readable name for display
  const readableQuizName = quizSlug 
    ? quizSlug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
    : 'Unknown Quiz';

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Scores for {readableQuizName}
          </Typography>
        </CardHeader>
        <CardBody className="p-4">
          <Typography>
            This page will display the detailed scores for the quiz "{readableQuizName}".
          </Typography>
          {/*
            Here, you would typically fetch the actual score data
            from your backend using the `quizSlug` (e.g., `fetchScores(quizSlug)`)
            and then render it.
          */}
        </CardBody>
      </Card>
    </div>
  );
}

export default Scores; 