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
import { sectionData, projectsData } from "@/data"; // Assuming projectsData is still needed here
import { useNavigate } from "react-router-dom"; // For navigation
import React, { useState } from "react";

export function Section() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Helper function to create a URL-friendly slug from the name
  const getSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const handleAddSection = () => {
    console.log("Add Section button clicked!");
    navigate("/add-section"); // This is where the navigation happens
  };

  // --- NEW: Handler for "Manage Module" ---
  const handleManageModule = (sectionName) => {
    const sectionSlug = getSlug(sectionName);
    // Navigate to a dynamic URL, e.g., /lock-module/section-a
    navigate(`/lock-module/${sectionSlug}`);
    console.log(`Navigating to /lock-module/${sectionSlug}`);
  };

  // --- NEW: Placeholder for handleDeleteSection (if not already defined elsewhere) ---
  const handleDeleteSection = (sectionName) => {
    console.log(`Deleting section: ${sectionName}`);
    // Implement your actual delete logic here (e.g., API call, state update)
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="white">
              Sections
            </Typography>
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
                              onClick={() => navigate(`/edit-section/${getSlug(sectionName)}`)}
                              className="text-green-500 hover:bg-green-50 hover:text-green-700" // Corrected hover color
                            >
                              Edit Section
                            </MenuItem>

                            <MenuItem
                               onClick={() => handleDeleteSection(sectionName)} // Call the delete handler
                               className="text-red-500 hover:bg-red-50 hover:text-red-700" // Optional: Add red styling for delete
                            >
                              Delete Section
                            </MenuItem>

                            <MenuItem
                               onClick={() => handleManageModule(sectionName)} // Call the new handler
                               className="text-blue-500 hover:bg-blue-50 hover:text-blue-700" // Optional: Add blue styling
                            >
                              Lock/Unlock Module
                            </MenuItem>

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