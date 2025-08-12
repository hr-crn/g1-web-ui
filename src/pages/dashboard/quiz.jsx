import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Chip,
} from "@material-tailwind/react";
import { quizProgressData } from "@/data";
import { useNavigate } from "react-router-dom"; // For navigation
import React, { useState } from "react";

export function Quiz() {

 const navigate = useNavigate(); // Initialize useNavigate hook

  // Quiz Scores Modal states
  const [isScoresModalOpen, setIsScoresModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Helper function to create a URL-friendly slug from the quiz name
  const getQuizSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Function to handle opening the scores modal
  const handleViewScores = (quizName) => {
    setSelectedQuiz(quizName);
    setIsScoresModalOpen(true);
    console.log(`Opening scores modal for: ${quizName}`);
  };

  // Mock scores data - in a real app, this would come from your backend
  const getScoresData = (quizName) => {
    // This is mock data - replace with actual data fetching
    return [
      { studentName: "John Doe", section: "A", score: 85, status: "Passed" },
      { studentName: "Jane Smith", section: "B", score: 92, status: "Passed" },
      { studentName: "Mike Johnson", section: "A", score: 78, status: "Passed" },
      { studentName: "Sarah Wilson", section: "C", score: 65, status: "Failed" },
      { studentName: "Tom Brown", section: "B", score: 88, status: "Passed" },
    ];
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 bg-gradient-to-r from-purple-800 to-purple-900 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Typography variant="h6" color="white" className="font-bold">
                📝
              </Typography>
            </div>
            <Typography variant="h6" color="white" className="font-bold">
              Quiz Progress
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
              <tr>
                {[
                  { key: "quiz name", icon: "📝", label: "Quiz Name" },
                  { key: "actions", icon: "⚡", label: "Actions" }
                ].map((col) => (
                  <th
                    key={col.key}
                    className="border-b-2 border-purple-100 py-4 px-5 text-left hover:bg-purple-100 transition-colors duration-200"
                  >
                    <Typography
                      variant="small"
                      className="text-xs font-bold uppercase text-purple-700 flex items-center gap-2"
                    >
                      <span>{col.icon}</span>
                      {col.label}
                    </Typography>
                  </th>
                ))}
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
                    <tr
                      key={quizName}
                      className="hover:bg-purple-50 transition-all duration-200 cursor-pointer transform hover:scale-[1.01] hover:shadow-sm"
                    >
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                            📝
                          </div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold hover:text-purple-600 transition-colors duration-200"
                          >
                            {quizName}
                          </Typography>
                        </div>
                      </td>
    
                      
                  
              
              
                      <td className={className}>
                        <button
                          onClick={() => handleViewScores(quizName)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                          <span>📊</span>
                          View Scores
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Quiz Scores Modal */}
      <Dialog
        open={isScoresModalOpen}
        handler={setIsScoresModalOpen}
        size="xl"
        className="max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Scores for "{selectedQuiz}"
          </Typography>
          <Typography variant="small" color="blue-gray">
            {selectedQuiz ? getScoresData(selectedQuiz).length : 0} student(s)
          </Typography>
        </DialogHeader>
        <DialogBody className="px-0">
          {selectedQuiz && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr className="border-b border-blue-gray-50">
                    <th className="py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Student Name
                      </Typography>
                    </th>
                    <th className="py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Section
                      </Typography>
                    </th>
                    <th className="py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Score
                      </Typography>
                    </th>
                    <th className="py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Status
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getScoresData(selectedQuiz).map(
                    ({ studentName, section, score, status }, key, scoresArray) => {
                      const className = `py-3 px-5 ${
                        key === scoresArray.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={`${studentName}-${key}`}>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              {studentName}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {section}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray" className="font-bold">
                              {score}%
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={status === "Passed" ? "green" : "red"}
                              value={status}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setIsScoresModalOpen(false)}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Quiz;
