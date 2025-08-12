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
import { moduleProgressData } from "@/data";
import { useNavigate } from "react-router-dom"; // For navigation
import React, { useState } from "react";

export function Module() {

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Module Progress Modal states
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  // Helper function to create a URL-friendly slug from the module name
  const getModuleSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Function to handle opening the progress modal
  const handleViewProgress = (moduleName) => {
    setSelectedModule(moduleName);
    setIsProgressModalOpen(true);
    console.log(`Opening progress modal for: ${moduleName}`);
  };

  // Mock progress data - in a real app, this would come from your backend
  const getProgressData = (moduleName) => {
    // This is mock data - replace with actual data fetching
    return [
      { studentName: "John Doe", section: "A", status: "Completed", progress: 100 },
      { studentName: "Jane Smith", section: "B", status: "In Progress", progress: 75 },
      { studentName: "Mike Johnson", section: "A", status: "Completed", progress: 100 },
      { studentName: "Sarah Wilson", section: "C", status: "Not Started", progress: 0 },
      { studentName: "Tom Brown", section: "B", status: "In Progress", progress: 50 },
    ];
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 bg-gradient-to-r from-green-800 to-green-900 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Typography variant="h6" color="white" className="font-bold">
                📚
              </Typography>
            </div>
            <Typography variant="h6" color="white" className="font-bold">
              Module Progress
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="bg-gradient-to-r from-green-50 to-green-100">
              <tr>
                {[
                  { key: "module name", icon: "📚", label: "Module Name" },
                  { key: "actions", icon: "📈", label: "Actions" }
                ].map((col) => (
                  <th
                    key={col.key}
                    className="border-b-2 border-green-100 py-4 px-5 text-left hover:bg-green-100 transition-colors duration-200"
                  >
                    <Typography
                      variant="small"
                      className="text-xs font-bold uppercase text-green-700 flex items-center gap-2"
                    >
                      <span>{col.icon}</span>
                      {col.label}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {moduleProgressData.map(
                ({ moduleName }, key) => {
                  const className = `py-3 px-5 ${
                    key === moduleProgressData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr
                      key={moduleName}
                      className="hover:bg-green-50 transition-all duration-200 cursor-pointer transform hover:scale-[1.01] hover:shadow-sm"
                    >
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                            📚
                          </div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold hover:text-green-600 transition-colors duration-200"
                          >
                            {moduleName}
                          </Typography>
                        </div>
                      </td>
    
                      
                  
              
                      
                      <td className={className}>
                        <button
                          onClick={() => handleViewProgress(moduleName)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                          <span>📈</span>
                          View Progress
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

      {/* Module Progress Modal */}
      <Dialog
        open={isProgressModalOpen}
        handler={setIsProgressModalOpen}
        size="xl"
        className="max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Progress for "{selectedModule}"
          </Typography>
          <Typography variant="small" color="blue-gray">
            {selectedModule ? getProgressData(selectedModule).length : 0} student(s)
          </Typography>
        </DialogHeader>
        <DialogBody className="px-0">
          {selectedModule && (
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
                        Progress
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
                  {getProgressData(selectedModule).map(
                    ({ studentName, section, status, progress }, key, progressArray) => {
                      const className = `py-3 px-5 ${
                        key === progressArray.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      const getStatusColor = (status) => {
                        switch (status) {
                          case "Completed": return "green";
                          case "In Progress": return "blue";
                          case "Not Started": return "gray";
                          default: return "gray";
                        }
                      };

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
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <Typography variant="small" color="blue-gray" className="font-bold">
                                {progress}%
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={getStatusColor(status)}
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
            onClick={() => setIsProgressModalOpen(false)}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Module; 