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
import { sectionData } from "@/data";
import { useNavigate } from "react-router-dom"; // For navigation
import React, { useState } from "react";

export function Section() {

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Helper function to create a URL-friendly slug from the section name
  const getSectionSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const handleAddSection = () => {
    console.log("Add Section button clicked!");
    navigate("/add-section"); // This is where the navigation happens
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
           <div className="flex items-center justify-between">
            <Typography variant="h6" color="white">
              Sections
            </Typography>
            {/* THIS IS THE CLICKABLE PLUSCIRCLEICON */}
             <Tooltip content="Add Section"> 
            <IconButton
              variant="text"
              color="white" // This sets the icon color to white
              onClick={handleAddSection} // This makes it clickable and calls handleAddSection
              className="hover:bg-white/10" // Optional: adds a subtle hover background
            >
              <PlusCircleIcon className="h-6 w-6" />{" "}
              {/* This is your actual icon */}
            </IconButton>
             </Tooltip>
          </div>
          
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Section name", "Total no. of students", "Actions"].map(
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
              {sectionData.map(
                ({ sectionName, noOfStudents }, key) => {
                  const className = `py-3 px-5 ${
                    key === sectionData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={sectionName}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                        
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {sectionName}
                          </Typography>
                        </div>
                      </td>
    
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {noOfStudents}
                        </Typography>
                      </td>
                  
              
                      {/* THIS IS THE MODIFIED TD FOR THE DROPDOWN MENU */}
                      <td className={className}>
                        <Menu> {/* Material Tailwind Menu */}
                          <MenuHandler>
                            {/* The IconButton acts as the trigger for the menu */}
                            <IconButton variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={2}
                                className="h-5 w-5 text-blue-gray-500" // Icon color
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList> {/* The dropdown list of options */}
                            <MenuItem
                              onClick={() => navigate(`/edit-section/${getSectionSlug(sectionName)}`)}
                              className="text-green-500 hover:bg-red-50 hover:text-green-700"
                            >
                              Edit Section
                            </MenuItem>

                            <MenuItem
                               onClick={() => handleDeleteSection(sectionName)} // Call the delete handler
                              className="text-red-500 hover:bg-red-50 hover:text-red-700" // Optional: Add red styling for delete
                            >
                              Delete Section
                            </MenuItem>
                            {/* You can add more MenuItems here as needed */}
                          </MenuList>
                        </Menu>
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

export default Section;
