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

  // New states for section selector and search
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Add Student Modal states
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newSection, setNewSection] = useState("");
  const [availableSections, setAvailableSections] = useState([]);

  // Batch Add Students states
  const [pendingStudents, setPendingStudents] = useState([]);
  const [showSectionAssignment, setShowSectionAssignment] = useState(false);
  const [batchSection, setBatchSection] = useState("");

  // Edit Student Modal states
  const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editStudentName, setEditStudentName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editSection, setEditSection] = useState("");

  // Archived Students Modal states
  const [isArchivedStudentsOpen, setIsArchivedStudentsOpen] = useState(false);

  // Load students from localStorage on component mount
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    console.log('Loaded students from localStorage:', savedStudents); // Debug log

    if (savedStudents.length === 0) {
      // If no saved students, use initial data and ensure all have archived property
      const studentsWithArchived = studentsData.map(student => ({
        ...student,
        archived: student.archived || false // Ensure archived property exists
      }));
      console.log('Using initial data:', studentsWithArchived); // Debug log
      localStorage.setItem('students', JSON.stringify(studentsWithArchived));
      setCurrentStudentsData(studentsWithArchived);
    } else {
      // Ensure existing students have archived property for backward compatibility
      const studentsWithArchived = savedStudents.map(student => ({
        ...student,
        archived: student.archived || false // Default to false if missing
      }));
      console.log('Students with archived property:', studentsWithArchived); // Debug log
      setCurrentStudentsData(studentsWithArchived);
      // Update localStorage with the corrected data
      localStorage.setItem('students', JSON.stringify(studentsWithArchived));
    }

    // Load available sections for the add student modal
    const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
    const activeSections = savedSections.filter(s => !s.archived);
    setAvailableSections(activeSections);
  }, []);

  // Filter students based on section parameter, archive status, selected section, and search query
  useEffect(() => {
    let filtered = currentStudentsData;

    // Filter by archive status
    if (showArchived) {
      filtered = filtered.filter(student => student.archived);
    } else {
      filtered = filtered.filter(student => !student.archived);
    }

    // Filter by section if specified in URL params
    if (sectionFilter) {
      filtered = filtered.filter(
        student => student.section.toLowerCase() === sectionFilter.toLowerCase()
      );
    }

    // Filter by selected section from dropdown (only if not "All Students")
    if (selectedSection && selectedSection !== "") {
      filtered = filtered.filter(
        student => student.section.toLowerCase() === selectedSection.toLowerCase()
      );
    }

    // Filter by search query if search is active
    if (searchQuery) {
      filtered = filtered.filter(student =>
        student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [sectionFilter, currentStudentsData, showArchived, selectedSection, searchQuery]);

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

    // Check if username already exists in current students or pending students
    const usernameExists = currentStudentsData.some(
      student => student.username.toLowerCase() === newUsername.trim().toLowerCase()
    ) || pendingStudents.some(
      student => student.username.toLowerCase() === newUsername.trim().toLowerCase()
    );

    if (usernameExists) {
      alert("A student with this username already exists!");
      return;
    }

    // Create new student object (without section for now)
    const newStudent = {
      studentName: newStudentName.trim(),
      username: newUsername.trim(),
      section: "", // Will be assigned later
      archived: false,
      id: Date.now() // Temporary ID for pending students
    };

    // Add to pending students list
    setPendingStudents(prev => [...prev, newStudent]);

    console.log("Student added to pending list:", newStudent);

    // Reset form but keep modal open
    setNewStudentName("");
    setNewUsername("");
    setNewSection("");
  };

  const handleCancelAddStudent = () => {
    setIsAddStudentOpen(false);
    setNewStudentName("");
    setNewUsername("");
    setNewSection("");
    setPendingStudents([]);
    setShowSectionAssignment(false);
    setBatchSection("");
  };

  // Remove student from pending list
  const removePendingStudent = (studentId) => {
    setPendingStudents(prev => prev.filter(student => student.id !== studentId));
  };

  // Handle batch section assignment
  const handleBatchSectionAssignment = () => {
    if (pendingStudents.length === 0) {
      alert("No students to assign!");
      return;
    }
    setShowSectionAssignment(true);
  };

  // Confirm batch assignment
  const confirmBatchAssignment = () => {
    if (batchSection === "") {
      alert("Please select a section!");
      return;
    }

    // Assign section to all pending students and add to main list
    const studentsWithSection = pendingStudents.map(student => {
      const { id, ...studentWithoutId } = student; // Remove temporary id
      return {
        ...studentWithoutId,
        section: batchSection
      };
    });

    const updatedStudents = [...currentStudentsData, ...studentsWithSection];
    setCurrentStudentsData(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Update section student count
    const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
    const updatedSections = savedSections.map(s =>
      s.sectionName === batchSection
        ? { ...s, noOfStudents: s.noOfStudents + pendingStudents.length }
        : s
    );
    localStorage.setItem('sections', JSON.stringify(updatedSections));

    alert(`${pendingStudents.length} students added to ${batchSection} section successfully!`);

    // Reset everything
    setPendingStudents([]);
    setShowSectionAssignment(false);
    setBatchSection("");
    setIsAddStudentOpen(false);
    setNewStudentName("");
    setNewUsername("");
    setNewSection("");
  };

  // Function to handle editing a student
  const handleEditStudent = (username) => {
    console.log(`Editing student: ${username}`);
    // Find the student to edit
    const studentToEdit = currentStudentsData.find(student => student.username === username);
    if (studentToEdit) {
      setEditingStudent(studentToEdit);
      setEditStudentName(studentToEdit.studentName);
      setEditUsername(studentToEdit.username);
      setEditSection(studentToEdit.section);
      setIsEditStudentOpen(true);
    }
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

  // Handler for section selection
  const handleSectionSelect = (value) => {
    console.log("Selected section:", value); // Debug log
    setSelectedSection(value);
    setSearchQuery(""); // Reset search when section changes
  };

  // Handler for search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Debug function to reset student data
  const resetStudentData = () => {
    if (confirm('This will reset all student data to the original state. Are you sure?')) {
      const studentsWithArchived = studentsData.map(student => ({
        ...student,
        archived: false
      }));
      localStorage.setItem('students', JSON.stringify(studentsWithArchived));
      setCurrentStudentsData(studentsWithArchived);
      alert('Student data has been reset!');
    }
  };

  // Handle updating student
  const handleUpdateStudent = (e) => {
    e.preventDefault();

    if (editStudentName.trim() === "") {
      alert("Student Name cannot be empty!");
      return;
    }

    if (editUsername.trim() === "") {
      alert("Username cannot be empty!");
      return;
    }

    if (editSection === "") {
      alert("Please select a section!");
      return;
    }

    // Check if username already exists (excluding current student)
    const usernameExists = currentStudentsData.some(
      student => student.username.toLowerCase() === editUsername.trim().toLowerCase() &&
                 student.username !== editingStudent.username
    );

    if (usernameExists) {
      alert("A student with this username already exists!");
      return;
    }

    // Update student data
    const updatedStudents = currentStudentsData.map(student =>
      student.username === editingStudent.username
        ? {
            ...student,
            studentName: editStudentName.trim(),
            username: editUsername.trim(),
            section: editSection
          }
        : student
    );

    setCurrentStudentsData(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Update section student counts if section changed
    if (editingStudent.section !== editSection) {
      const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
      const updatedSections = savedSections.map(s => {
        if (s.sectionName === editingStudent.section) {
          // Remove from old section
          return { ...s, noOfStudents: Math.max(0, s.noOfStudents - 1) };
        } else if (s.sectionName === editSection) {
          // Add to new section
          return { ...s, noOfStudents: s.noOfStudents + 1 };
        }
        return s;
      });
      localStorage.setItem('sections', JSON.stringify(updatedSections));
    }

    console.log("Student updated successfully");
    alert(`Student "${editStudentName}" updated successfully!`);

    // Close modal and reset form
    handleCancelEditStudent();
  };

  // Handle canceling edit student
  const handleCancelEditStudent = () => {
    setIsEditStudentOpen(false);
    setEditingStudent(null);
    setEditStudentName("");
    setEditUsername("");
    setEditSection("");
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
              {selectedSection ? ` - ${selectedSection}` : " - All Students"}
            </Typography>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Typography variant="small" color="white">
                  Show Archived
                </Typography>
                <Switch
                  checked={showArchived}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIsArchivedStudentsOpen(true);
                      setShowArchived(false); // Keep the switch off, just open modal
                    } else {
                      setShowArchived(false);
                    }
                  }}
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

              {/* Temporary Debug Button */}
              <Button
                size="sm"
                variant="outlined"
                color="white"
                onClick={resetStudentData}
                className="mr-2 text-xs"
              >
                Reset Data
              </Button>

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
          {/* Stats Display with Section Selector and Search */}
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

              {/* Section Selector and Search Bar */}
              <div className="flex items-center gap-4">
                <div className="w-60">
                  <Select
                    placeholder={selectedSection || "Select section"}
                    value={selectedSection}
                    onChange={handleSectionSelect}
                    className="!bg-gray-100 !border-gray-300 !text-gray-900"
                    labelProps={{
                      className: "hidden",
                    }}
                    menuProps={{
                      className: "!bg-white !text-gray-900 !max-h-60 !overflow-y-auto !z-[9999] !mt-2",
                    }}
                    containerProps={{
                      className: "!min-w-0",
                    }}
                  >
                    <Option value="">All Students</Option>
                    {availableSections.map((section) => (
                      <Option key={section.sectionName} value={section.sectionName}>
                        {section.sectionName}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="w-60">
                  <Input
                    type="text"
                    placeholder="Search students by name or username"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="!bg-gray-100 !border-gray-300 !text-gray-900"
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{
                      className: "!min-w-0",
                    }}
                  />
                </div>
              </div>
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
      <Dialog
        open={isAddStudentOpen}
        handler={setIsAddStudentOpen}
        size="xl"
        className="max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <Typography variant="h5" color="blue-gray">
              Add Students (Batch Mode)
            </Typography>
            <Typography variant="small" color="blue-gray">
              {pendingStudents.length} student(s) pending
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="flex gap-6">
            {/* Left side - Add Student Form */}
            <div className="flex-1">
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
                  <Button
                    type="submit"
                    variant="gradient"
                    color="blue"
                    className="mt-4"
                  >
                    Add to List
                  </Button>
                </div>
              </form>
            </div>

            {/* Right side - Pending Students List */}
            <div className="flex-1 border-l border-gray-200 pl-6">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Students to Add ({pendingStudents.length})
              </Typography>

              {pendingStudents.length === 0 ? (
                <Typography variant="small" color="gray" className="text-center py-8">
                  No students added yet. Add students using the form on the left.
                </Typography>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {pendingStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {student.studentName}
                        </Typography>
                        <Typography variant="small" color="gray">
                          @{student.username}
                        </Typography>
                      </div>
                      <Button
                        size="sm"
                        variant="text"
                        color="red"
                        onClick={() => removePendingStudent(student.id)}
                        className="p-2"
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Section Assignment */}
              {pendingStudents.length > 0 && (
                <div className="mt-6">
                  {!showSectionAssignment ? (
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={handleBatchSectionAssignment}
                      className="w-full"
                    >
                      ✓ Assign Section to All Students
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Select Section for All Students
                      </Typography>
                      <Select
                        label="Select section"
                        value={batchSection}
                        onChange={(value) => setBatchSection(value)}
                        size="lg"
                      >
                        {availableSections.map((sectionItem) => (
                          <Option key={sectionItem.sectionName} value={sectionItem.sectionName}>
                            {sectionItem.sectionName} ({sectionItem.noOfStudents} students)
                          </Option>
                        ))}
                      </Select>
                      <div className="flex gap-2">
                        <Button
                          variant="text"
                          color="gray"
                          onClick={() => setShowSectionAssignment(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={confirmBatchAssignment}
                          className="flex-1"
                        >
                          Confirm Assignment
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancelAddStudent}
          >
            <span>Close & Cancel All</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Edit Student Modal */}
      <Dialog open={isEditStudentOpen} handler={setIsEditStudentOpen}>
        <DialogHeader>Edit Student</DialogHeader>
        <DialogBody>
          <form onSubmit={handleUpdateStudent}>
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
                  value={editStudentName}
                  onChange={(e) => setEditStudentName(e.target.value)}
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
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
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
                  value={editSection}
                  onChange={(value) => setEditSection(value)}
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
            onClick={handleCancelEditStudent}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="gray" onClick={handleUpdateStudent}>
            <span>Update Student</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Archived Students Modal */}
      <Dialog
        open={isArchivedStudentsOpen}
        handler={setIsArchivedStudentsOpen}
        size="xl"
        className="max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Archived Students
          </Typography>
          <Typography variant="small" color="blue-gray">
            {currentStudentsData.filter(s => s.archived).length} archived student(s)
          </Typography>
        </DialogHeader>
        <DialogBody className="px-0">
          {currentStudentsData.filter(s => s.archived).length === 0 ? (
            <div className="text-center py-8">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                No Archived Students
              </Typography>
              <Typography variant="small" color="blue-gray">
                There are currently no archived students.
              </Typography>
            </div>
          ) : (
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
                        Username
                      </Typography>
                    </th>
                    <th className="py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Section
                      </Typography>
                    </th>
                    <th className="py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Actions
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudentsData.filter(s => s.archived).map(
                    ({ studentName, username, section }, key, filteredArray) => {
                      const className = `py-3 px-5 ${
                        key === filteredArray.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={username} className="opacity-60">
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Typography variant="small" color="blue-gray" className="font-semibold">
                                {studentName}
                                <Chip
                                  size="sm"
                                  value="Archived"
                                  color="gray"
                                  className="ml-2 inline-block"
                                />
                              </Typography>
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
                            <Button
                              size="sm"
                              variant="outlined"
                              color="green"
                              onClick={() => {
                                handleArchiveStudent(username);
                                // Update the modal content by keeping it open
                              }}
                              className="hover:bg-green-50"
                            >
                              Unarchive
                            </Button>
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
            onClick={() => setIsArchivedStudentsOpen(false)}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Students;
