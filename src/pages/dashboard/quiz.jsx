import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  // --- New Imports for Menu ---
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { quizProgressData } from "@/data";
import { useNavigate } from "react-router-dom"; // For navigation
import React, { useState } from "react";

export function Quiz() {

 const navigate = useNavigate(); // Initialize useNavigate hook

  // Helper function to create a URL-friendly slug from the quiz name
  const getQuizSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Function to handle the navigation to the scores page
  const handleViewScores = (quizName) => {
    const quizSlug = getQuizSlug(quizName);
    navigate(`/${quizSlug}-score`); // Navigates to e.g., /math-quiz-score
    console.log(`Navigating to /${quizSlug}-score`);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
           <Typography variant="h6" color="white">
              Quiz Progress
            </Typography>
          
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["quiz name", "actions"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {quizProgressData.map(
                ({ quizName }, key) => {
                  const className = `py-3 px-5 ${
                    key === quizProgressData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={quizName}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                        
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {quizName}
                          </Typography>
                        </div>
                      </td>
    
                      
                  
              
              
                      <td className={className}>
                        <Typography
                          as="a" // Render as an anchor tag for semantic correctness
                          href={`/${getQuizSlug(quizName)}-score`} // Optional: for direct link/right-click copy
                          onClick={(e) => { // Use onClick for React Router navigation
                            e.preventDefault(); // Prevent default anchor tag behavior
                            handleViewScores(quizName);
                          }}
                          variant="small"
                          color="blue-gray"
                          className="font-bold cursor-pointer hover:underline" // Add pointer and underline on hover
                        >
                          View Scores
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Quiz;
