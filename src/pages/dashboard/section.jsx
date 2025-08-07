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
      alert("Section Name cannot be empty!");
      return;
    }

    // Check if section name already exists
    const sectionExists = sections.some(
      section => section.sectionName.toLowerCase() === newSectionName.trim().toLowerCase()
    );

    if (sectionExists) {
      alert("A section with this name already exists!");
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
    alert(`Section "${newSectionName}" created successfully!`);

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
    const sectionSlug = getSlug(sectionName);
    navigate(`/edit-section/${sectionSlug}`);
    console.log(`Navigating to edit section: ${sectionName}`);
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
              {sections.map(
                ({ sectionName, noOfStudents, archived }, key) => {
                  const className = `py-3 px-5 ${
                    key === sections.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={sectionName} className={archived ? "opacity-50" : ""}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {sectionName}
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
                              onClick={() => handleEditSection(sectionName)}
                              className="flex items-center gap-2 text-green-500 hover:bg-green-50 hover:text-green-700"
                            >
                              <PencilIcon className="h-4 w-4" />
                              Edit Section
                            </MenuItem>

                            <MenuItem
                              onClick={() => handleArchiveSection(sectionName)}
                              className="flex items-center gap-2 text-orange-500 hover:bg-orange-50 hover:text-orange-700"
                            >
                              <ArchiveBoxIcon className="h-4 w-4" />
                              {archived ? "Unarchive Section" : "Archive Section"}
                            </MenuItem>

                            <MenuItem
                              onClick={() => handleLockUnlockModule(sectionName)}
                              className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <LockClosedIcon className="h-4 w-4" />
                              Lock/Unlock Module
                            </MenuItem>

                            <MenuItem
                              onClick={() => handleViewStudents(sectionName)}
                              className="flex items-center gap-2 text-purple-500 hover:bg-purple-50 hover:text-purple-700"
                            >
                              <UsersIcon className="h-4 w-4" />
                              View Students
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

      {/* Add Section Modal */}
      <Dialog open={isAddSectionOpen} handler={setIsAddSectionOpen}>
        <DialogHeader>Add New Section</DialogHeader>
        <DialogBody>
          <form onSubmit={handleCreateSection}>
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
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
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
            onClick={handleCancelAddSection}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="gray" onClick={handleCreateSection}>
            <span>Create Section</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Section;