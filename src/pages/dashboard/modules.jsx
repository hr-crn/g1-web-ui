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
import { sectionData, moduleProgressData } from "@/data";
import { useNavigate } from "react-router-dom"; // For navigation
import React, { useState } from "react";

export function Modules() {

  const navigate = useNavigate(); // Initialize useNavigate hook
  
  // Helper function to create a URL-friendly slug from the module name
  const getModuleSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Function to handle the navigation to the module progress page
  const handleViewProgress = (moduleName) => {
    const moduleSlug = getModuleSlug(moduleName);
    // Navigates to e.g., /introduction-to-react-progress
    navigate(`/${moduleSlug}-progress`);
    console.log(`Navigating to /${moduleSlug}-progress`);
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
           
            <Typography variant="h6" color="white">
              Module
            </Typography>
            
          
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["module name", "actions"].map(
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
              {moduleProgressData.map(
                ({ moduleName }, key) => {
                  const className = `py-3 px-5 ${
                    key === moduleProgressData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={moduleName}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                        
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {moduleName}
                          </Typography>
                        </div>
                      </td>
    
                      
                  
              
                      
                      <td className={className}>
                       <Typography
                          as="a" // Render as an anchor tag for semantic correctness
                          href={`/${getModuleSlug(moduleName)}-progress`} // Optional: for direct link/right-click copy
                          onClick={(e) => { // Use onClick for React Router navigation
                            e.preventDefault(); // Prevent default anchor tag behavior
                            handleViewProgress(moduleName);
                          }}
                          variant="small"
                          color="blue-gray"
                          className="font-bold cursor-pointer hover:underline" // Add pointer and underline on hover
                        >
                          View Progress
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

export default Modules;