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
  Switch,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, PlusCircleIcon, PencilIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { studentsData } from "@/data";
import { useNavigate, useSearchParams } from "react-router-dom"; // Import useNavigate and useSearchParams
import React, { useState, useEffect } from "react";

export function Students() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [searchParams] = useSearchParams();
  const sectionFilter = searchParams.get('section');

  // Manage studentsData as state to allow for updates
  const [currentStudentsData, setCurrentStudentsData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  // Add Student Modal states
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newSection, setNewSection] = useState("");
  const [availableSections, setAvailableSections] = useState([]);

  // Load students from localStorage on component mount
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    if (savedStudents.length === 0) {
      // If no saved students, use initial data and save to localStorage
      localStorage.setItem('students', JSON.stringify(studentsData));
      setCurrentStudentsData(studentsData);
    } else {
      setCurrentStudentsData(savedStudents);
    }

    // Load available sections for the add student modal
    const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
    const activeSections = savedSections.filter(s => !s.archived);
    setAvailableSections(activeSections);
  }, []);

  // Filter students based on section parameter and archive status
  useEffect(() => {
    let filtered = currentStudentsData;

    // Filter by archive status
    if (showArchived) {
      filtered = filtered.filter(student => student.archived);
    } else {
      filtered = filtered.filter(student => !student.archived);
    }

    // Filter by section if specified
    if (sectionFilter) {
      filtered = filtered.filter(
        student => student.section.toLowerCase() === sectionFilter.toLowerCase()
      );
    }

    setFilteredStudents(filtered);
  }, [sectionFilter, currentStudentsData, showArchived]);

  // Function to handle adding a new student
  const handleAddStudent = () => {
    console.log("Add Student button clicked!");
    setIsAddStudentOpen(true);
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();

    if (newStudentName.trim() === "") {
      alert("Student Name cannot be empty!");
      return;
    }

    if (newUsername.trim() === "") {
      alert("Username cannot be empty!");
      return;
    }

    if (newSection === "") {
      alert("Please select a section!");
      return;
    }

    // Check if username already exists
    const usernameExists = currentStudentsData.some(
      student => student.username.toLowerCase() === newUsername.trim().toLowerCase()
    );

    if (usernameExists) {
      alert("A student with this username already exists!");
      return;
    }

    // Create new student object
    const newStudent = {
      studentName: newStudentName.trim(),
      username: newUsername.trim(),
      section: newSection,
      archived: false
    };

    // Add new student to existing students
    const updatedStudents = [...currentStudentsData, newStudent];
    setCurrentStudentsData(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Update section student count
    const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
    const updatedSections = savedSections.map(s =>
      s.sectionName === newSection
        ? { ...s, noOfStudents: s.noOfStudents + 1 }
        : s
    );
    localStorage.setItem('sections', JSON.stringify(updatedSections));

    console.log("Student created successfully:", newStudent);
    alert(`Student "${newStudentName}" added successfully!`);

    // Close modal and reset form
    setIsAddStudentOpen(false);
    setNewStudentName("");
    setNewUsername("");
    setNewSection("");
  };

  const handleCancelAddStudent = () => {
    setIsAddStudentOpen(false);
    setNewStudentName("");
    setNewUsername("");
    setNewSection("");
  };

  // Function to handle editing a student
  const handleEditStudent = (username) => {
    console.log(`Editing student: ${username}`);
    // Navigate to edit form using username as slug
    const studentSlug = username.replace(/_/g, '-');
    navigate(`/edit-student/${studentSlug}`);
  };

  // Function to handle archiving a student
  const handleArchiveStudent = (username) => {
    console.log(`Archiving student: ${username}`);

    // Update student archive status
    const updatedStudents = currentStudentsData.map(student =>
      student.username === username
        ? { ...student, archived: !student.archived }
        : student
    );

    setCurrentStudentsData(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Update section student count
    const student = currentStudentsData.find(s => s.username === username);
    if (student) {
      const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
      const updatedSections = savedSections.map(s =>
        s.sectionName === student.section
          ? {
              ...s,
              noOfStudents: student.archived
                ? s.noOfStudents + 1  // Unarchiving - add back to count
                : Math.max(0, s.noOfStudents - 1)  // Archiving - subtract from count
            }
          : s
      );
      localStorage.setItem('sections', JSON.stringify(updatedSections));
    }

    console.log(`Student "${username}" archive status toggled.`);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          {/* Flex container for "Students" text and PlusCircleIcon */}
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="white">
              {showArchived ? "Archived Students" : "Students"}
              {sectionFilter && ` - ${sectionFilter} Section`}
            </Typography>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Typography variant="small" color="white">
                  Show Archived
                </Typography>
                <Switch
                  checked={showArchived}
                  onChange={(e) => setShowArchived(e.target.checked)}
                  color="white"
                  className="h-full w-full checked:bg-white"
                  containerProps={{
                    className: "w-11 h-6",
                  }}
                  circleProps={{
                    className: "before:hidden left-0.5 border-none w-5 h-5 bg-blue-gray-100",
                  }}
                />
              </div>
              <Typography variant="small" color="white" className="mr-2">
                Showing {filteredStudents.length} student(s)
              </Typography>
              {!showArchived && (
                <Tooltip content="Add Student">
                  <IconButton
                    variant="text"
                    color="white"
                    onClick={handleAddStudent}
                    className="hover:bg-white/10"
                  >
                    <PlusCircleIcon className="h-6 w-6" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* Stats Display */}
          <div className="px-6 py-4 border-b border-blue-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <Typography variant="h6" color="blue-gray">
                    {currentStudentsData.filter(s => !s.archived).length}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Active Students
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h6" color="blue-gray">
                    {currentStudentsData.filter(s => s.archived).length}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Archived Students
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h6" color="blue-gray">
                    {currentStudentsData.length}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Total Students
                  </Typography>
                </div>
              </div>
              {showArchived && currentStudentsData.filter(s => s.archived).length === 0 && (
                <Typography variant="small" color="blue-gray" className="italic">
                  No archived students found
                </Typography>
              )}
            </div>
          </div>
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
              {filteredStudents.map(
                ({ studentName, username, section, archived }, key) => {
                  const className = `py-3 px-5 ${
                    key === filteredStudents.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={studentName} className={archived ? "opacity-60" : ""}>
                      <td className={className}>
                        <div className="flex items-center gap-4">

                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {studentName}
                              {archived && (
                                <Chip
                                  size="sm"
                                  value="Archived"
                                  color="gray"
                                  className="ml-2 inline-block"
                                />
                              )}
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
                            <MenuItem
                              onClick={() => handleEditStudent(username)}
                              className="flex items-center gap-2 text-green-500 hover:bg-green-50 hover:text-green-700"
                            >
                              <PencilIcon className="h-4 w-4" />
                              Edit Student
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleArchiveStudent(username)}
                              className="flex items-center gap-2 text-orange-500 hover:bg-orange-50 hover:text-orange-700"
                            >
                              <ArchiveBoxIcon className="h-4 w-4" />
                              {archived ? "Unarchive Student" : "Archive Student"}
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

      {/* Add Student Modal */}
      <Dialog open={isAddStudentOpen} handler={setIsAddStudentOpen}>
        <DialogHeader>Add New Student</DialogHeader>
        <DialogBody>
          <form onSubmit={handleCreateStudent}>
            <div className="flex flex-col gap-4">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Student Name
                </Typography>
                <Input
                  type="text"
                  label="Enter student name"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  size="lg"
                  required
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Username
                </Typography>
                <Input
                  type="text"
                  label="Enter username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  size="lg"
                  required
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Section
                </Typography>
                <Select
                  label="Select section"
                  value={newSection}
                  onChange={(value) => setNewSection(value)}
                  size="lg"
                  required
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                >
                  {availableSections.map((sectionItem) => (
                    <Option key={sectionItem.sectionName} value={sectionItem.sectionName}>
                      {sectionItem.sectionName}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancelAddStudent}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="gray" onClick={handleCreateStudent}>
            <span>Add Student</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Students;
