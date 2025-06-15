import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  IconButton,
  Menu,         // Import Menu
  MenuHandler,  // Import MenuHandler
  MenuList,     // Import MenuList
  MenuItem, 
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { studentsData } from "@/data";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState } from "react";

export function Students() {

   const navigate = useNavigate(); // Initialize useNavigate hook

  // Manage studentsData as state to allow for deletion and UI updates
  const [currentStudentsData, setCurrentStudentsData] = useState(studentsData);

  // Function to handle adding a new student
  const handleAddStudent = () => {
    console.log("Add Student button clicked!");
    navigate("/add-student"); // Navigate to a new page/form to add a student
  };

  // Function to handle editing a student
  const handleEditStudent = (studentName) => {
    console.log(`Editing student: ${studentName}`);
    // You'll likely navigate to an edit form, passing the student's identifier
    navigate(`/edit-student/${studentName.toLowerCase().replace(/\s/g, '-')}`);
  };

  // Function to handle deleting a student
  const handleDeleteStudent = (studentToDeleteName) => {
    // In a real app, show a confirmation modal first.
    console.log(`Attempting to delete student: ${studentToDeleteName}`);

    // Simulate API call to delete from backend.
    // e.g., axios.delete(`/api/students/${studentToDeleteName}`);

    // Update local state to remove the student from the UI
    const updatedStudents = currentStudentsData.filter(
      (student) => student.studentName !== studentToDeleteName
    );
    setCurrentStudentsData(updatedStudents);
    console.log(`Student "${studentToDeleteName}" has been 'deleted' from UI.`);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          {/* Flex container for "Students" text and PlusCircleIcon */}
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="white">
              Students
            </Typography>
            {/* Tooltip for the PlusCircleIcon */}
            <Tooltip content="Add Student">
              {/* Clickable IconButton for PlusCircleIcon */}
              <IconButton
                variant="text"
                color="white" // Icon color
                onClick={handleAddStudent} // Make it clickable
                className="hover:bg-white/10" // Optional hover effect
              >
                <PlusCircleIcon className="h-6 w-6" /> {/* Adjust size as needed */}
              </IconButton>
            </Tooltip>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["student name","username", "section", "actions"].map((el) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {studentsData.map(
                ({ studentName, username, section }, key) => {
                  const className = `py-3 px-5 ${
                    key === studentsData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={studentName}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {studentName}
                            </Typography>
  
                          </div>
                        </div>
                      </td>
                      
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {username}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {section}
                        </Typography>
                      </td>
                      
                      <td className={className}>
                        <Menu>
                          <MenuHandler>
                            <IconButton variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={2}
                                className="h-5 w-5 text-blue-gray-500" // Icon color
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem onClick={() => handleEditStudent(studentName)}
                            className="text-green-500 hover:bg-red-50 hover:text-green-700"
                            >
                              Edit Student
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleDeleteStudent(studentName)}
                              className="text-red-500 hover:bg-red-50 hover:text-red-700" // Red styling for delete
                            >
                              Delete Student
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

export default Students;
