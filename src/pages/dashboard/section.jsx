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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  PlusCircleIcon,
  PencilIcon,
  ArchiveBoxIcon,
  LockClosedIcon,
  UsersIcon
} from "@heroicons/react/24/outline";
import { sectionData as initialSectionData, projectsData } from "@/data"; // Assuming projectsData is still needed here
import { useNavigate } from "react-router-dom"; // For navigation
import React, { useState, useEffect } from "react";

export function Section() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [sections, setSections] = useState(initialSectionData);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  // Edit Section Modal states
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editSectionName, setEditSectionName] = useState("");

  // Load sections from localStorage on component mount
  useEffect(() => {
    const savedSections = localStorage.getItem('sections');
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  // Save sections to localStorage whenever sections change
  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [sections]);

  // Helper function to create a URL-friendly slug from the name
  const getSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const handleAddSection = () => {
    console.log("Add Section button clicked!");
    setIsAddSectionOpen(true);
  };

  const handleCreateSection = (e) => {
    e.preventDefault();

    if (newSectionName.trim() === "") {
      window.showToast("Section Name cannot be empty!", "error");
      return;
    }

    // Check if section name already exists
    const sectionExists = sections.some(
      section => section.sectionName.toLowerCase() === newSectionName.trim().toLowerCase()
    );

    if (sectionExists) {
      window.showToast("A section with this name already exists!", "error");
      return;
    }

    // Create new section object
    const newSection = {
      sectionName: newSectionName.trim(),
      noOfStudents: 0,
      archived: false
    };

    // Add new section to existing sections
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);

    console.log("Section created successfully:", newSection);
    window.showToast(`Section "${newSectionName}" created successfully!`, "success");

    // Close modal and reset form
    setIsAddSectionOpen(false);
    setNewSectionName("");
  };

  const handleCancelAddSection = () => {
    setIsAddSectionOpen(false);
    setNewSectionName("");
  };

  // Handler for Edit Section
  const handleEditSection = (sectionName) => {
    console.log(`Editing section: ${sectionName}`);
    // Find the section to edit
    const sectionToEdit = sections.find(section => section.sectionName === sectionName);
    if (sectionToEdit) {
      setEditingSection(sectionToEdit);
      setEditSectionName(sectionToEdit.sectionName);
      setIsEditSectionOpen(true);
    }
  };

  // Handler for Archive Section
  const handleArchiveSection = (sectionName) => {
    const updatedSections = sections.map(section =>
      section.sectionName === sectionName
        ? { ...section, archived: !section.archived }
        : section
    );
    setSections(updatedSections);
    console.log(`Toggling archive status for section: ${sectionName}`);
  };

  // Handler for Lock/Unlock Module
  const handleLockUnlockModule = (sectionName) => {
    const sectionSlug = getSlug(sectionName);
    navigate(`/lock-module/${sectionSlug}`);
    console.log(`Navigating to lock/unlock modules for section: ${sectionName}`);
  };

  // Handler for View Students
  const handleViewStudents = (sectionName) => {
    // Navigate to students page with section filter
    navigate(`/dashboard/students?section=${encodeURIComponent(sectionName)}`);
    console.log(`Viewing students for section: ${sectionName}`);
  };

  // Handle updating section
  const handleUpdateSection = (e) => {
    e.preventDefault();

    if (editSectionName.trim() === "") {
      window.showToast("Section Name cannot be empty!", "error");
      return;
    }

    // Check if section name already exists (excluding current section)
    const sectionExists = sections.some(
      section => section.sectionName.toLowerCase() === editSectionName.trim().toLowerCase() &&
                 section.sectionName !== editingSection.sectionName
    );

    if (sectionExists) {
      window.showToast("A section with this name already exists!", "error");
      return;
    }

    // Update section data
    const updatedSections = sections.map(section =>
      section.sectionName === editingSection.sectionName
        ? {
            ...section,
            sectionName: editSectionName.trim()
          }
        : section
    );

    setSections(updatedSections);

    // Also update students data if section name changed
    if (editingSection.sectionName !== editSectionName.trim()) {
      const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
      const updatedStudents = savedStudents.map(student =>
        student.section === editingSection.sectionName
          ? { ...student, section: editSectionName.trim() }
          : student
      );
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    }

    console.log("Section updated successfully");
    window.showToast(`Section "${editSectionName}" updated successfully!`, "success");

    // Close modal and reset form
    handleCancelEditSection();
  };

  // Handle canceling edit section
  const handleCancelEditSection = () => {
    setIsEditSectionOpen(false);
    setEditingSection(null);
    setEditSectionName("");
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 bg-gradient-to-r from-orange-800 to-orange-900 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Typography variant="h6" color="white" className="font-bold">
                  🏫
                </Typography>
              </div>
              <Typography variant="h6" color="white" className="font-bold">
                Sections
              </Typography>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                <Typography variant="small" color="white" className="font-medium">
                  {sections.filter(s => !s.archived).length} active section{sections.filter(s => !s.archived).length !== 1 ? 's' : ''}
                </Typography>
              </div>
            </div>
            <Tooltip content="Add New Section">
              <IconButton
                variant="gradient"
                color="orange"
                onClick={handleAddSection}
                className="hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusCircleIcon className="h-6 w-6" />
              </IconButton>
            </Tooltip>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="bg-gradient-to-r from-orange-50 to-orange-100">
              <tr>
                {[
                  { key: "section name", icon: "🏫", label: "Section Name" },
                  { key: "students", icon: "👥", label: "Total Students" },
                  { key: "actions", icon: "⚙️", label: "Actions" }
                ].map((col) => (
                  <th
                    key={col.key}
                    className="border-b-2 border-orange-100 py-4 px-5 text-left hover:bg-orange-100 transition-colors duration-200"
                  >
                    <Typography
                      variant="small"
                      className="text-xs font-bold uppercase text-orange-700 flex items-center gap-2"
                    >
                      <span>{col.icon}</span>
                      {col.label}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sections.map(
                ({ sectionName, noOfStudents, archived }, key) => {
                  const className = `py-3 px-5 ${
                    key === sections.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr
                      key={sectionName}
                      className={`
                        ${archived ? "opacity-50" : ""}
                        hover:bg-orange-50 transition-all duration-200 cursor-pointer
                        transform hover:scale-[1.01] hover:shadow-sm
                      `}
                    >
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                            🏫
                          </div>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold hover:text-orange-600 transition-colors duration-200"
                            >
                              {sectionName}
                              {archived && (
                                <Chip
                                  size="sm"
                                  value="Archived"
                                  color="gray"
                                  className="ml-2 inline-block animate-pulse"
                                />
                              )}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={className}>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full">
                            <span className="text-orange-600">👥</span>
                            <Typography
                              variant="small"
                              className="text-sm font-bold text-orange-700"
                            >
                              {noOfStudents}
                            </Typography>
                          </div>
                          <Typography variant="small" className="text-xs text-gray-500">
                            student{noOfStudents !== 1 ? 's' : ''}
                          </Typography>
                        </div>
                      </td>

                      {/* Enhanced Actions Menu */}
                      <td className={className}>
                        <Menu>
                          <MenuHandler>
                            <IconButton
                              variant="text"
                              color="blue-gray"
                              className="hover:bg-orange-100 transition-all duration-200 hover:scale-110"
                            >
                              <EllipsisVerticalIcon
                                strokeWidth={2}
                                className="h-5 w-5 text-blue-gray-500 hover:text-orange-700 transition-colors duration-200"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                            <MenuItem
                              onClick={() => handleEditSection(sectionName)}
                              className="flex items-center gap-2 text-green-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-1 my-0.5"
                            >
                              <PencilIcon className="h-4 w-4" />
                              ✏️ Edit Section
                            </MenuItem>

                            <MenuItem
                              onClick={() => handleViewStudents(sectionName)}
                              className="flex items-center gap-2 text-purple-600 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 rounded-lg mx-1 my-0.5"
                            >
                              <UsersIcon className="h-4 w-4" />
                              👥 View Students
                            </MenuItem>

                            <MenuItem
                              onClick={() => handleLockUnlockModule(sectionName)}
                              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mx-1 my-0.5"
                            >
                              <LockClosedIcon className="h-4 w-4" />
                              🔒 Lock/Unlock Module
                            </MenuItem>

                            <MenuItem
                              onClick={() => handleArchiveSection(sectionName)}
                              className="flex items-center gap-2 text-orange-600 hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 rounded-lg mx-1 my-0.5"
                            >
                              <ArchiveBoxIcon className="h-4 w-4" />
                              {archived ? "📤 Unarchive Section" : "📦 Archive Section"}
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

      {/* Enhanced Add Section Modal */}
      <Dialog
        open={isAddSectionOpen}
        handler={setIsAddSectionOpen}
        size="md"
        className="bg-white/95 backdrop-blur-sm"
      >
        <DialogHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span>🏫</span>
            </div>
            <Typography variant="h5" color="white" className="font-bold">
              Add New Section
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody className="p-6">
          <form onSubmit={handleCreateSection}>
            <div className="mb-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium flex items-center gap-2"
              >
                <span>🏫</span>
                Section Name
              </Typography>
              <Input
                type="text"
                label="Enter section name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                size="lg"
                required
                className="!border-t-blue-gray-200 focus:!border-t-orange-500 hover:shadow-md transition-all duration-200"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="bg-gray-50 rounded-b-lg">
          <Button
            variant="text"
            color="red"
            onClick={handleCancelAddSection}
            className="mr-2 hover:bg-red-50 hover:scale-105 transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <span>❌</span>
              Cancel
            </span>
          </Button>
          <Button
            variant="gradient"
            color="orange"
            onClick={handleCreateSection}
            className="hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center gap-2">
              <span>➕</span>
              Create Section
            </span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Edit Section Modal */}
      <Dialog open={isEditSectionOpen} handler={setIsEditSectionOpen}>
        <DialogHeader>Edit Section</DialogHeader>
        <DialogBody>
          <form onSubmit={handleUpdateSection}>
            <div className="mb-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Section Name
              </Typography>
              <Input
                type="text"
                label="Enter section name"
                value={editSectionName}
                onChange={(e) => setEditSectionName(e.target.value)}
                size="lg"
                required
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancelEditSection}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="gray" onClick={handleUpdateSection}>
            <span>Update Section</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Section;