//iintegrate lang sa imong code base sa ADDING STUDENTS 

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import StudentAvatar from "@/components/StudentAvatar";

export function AddStudentDialog({
  open,
  onClose,
  onAddStudent,
  pendingStudents,
  onRemovePendingStudent,
  onAssignSection,
  availableSections,
}) {
  const [newStudentName, setNewStudentName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [showSectionAssignment, setShowSectionAssignment] = useState(false);
  const [batchSection, setBatchSection] = useState("");

  const handleCreateStudent = (e) => {
    e.preventDefault();
    onAddStudent({
      studentName: newStudentName,
      username: newUsername,
    });
    setNewStudentName("");
    setNewUsername("");
  };

  const handleAssignSection = () => {
    onAssignSection(batchSection);
    setShowSectionAssignment(false);
    setBatchSection("");
  };

  return (
    <Dialog open={open} handler={onClose} size="xl" className="max-h-[90vh] overflow-y-auto">
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
                  <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
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
                  <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
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
                  className="mt-4 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    <span>➕</span>
                    Add to List
                  </span>
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
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <StudentAvatar name={student.studentName} size="sm" />
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {student.studentName}
                        </Typography>
                        <Typography variant="small" color="gray">
                          @{student.username}
                        </Typography>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="text"
                      color="red"
                      onClick={() => onRemovePendingStudent(student.id)}
                      className="p-2 hover:bg-red-50 hover:scale-110 transition-all duration-200 rounded-full"
                    >
                      <span className="text-red-500 font-bold">✕</span>
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
                    onClick={() => setShowSectionAssignment(true)}
                    className="w-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>✅</span>
                      Assign Section to All Students
                    </span>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      Select Section for All Students
                    </Typography>
                    <select
                      value={batchSection}
                      onChange={(e) => setBatchSection(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select section</option>
                      {availableSections.map((section) => (
                        <option key={section.sectionName} value={section.sectionName}>
                          {section.sectionName}
                        </option>
                      ))}
                    </select>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="text"
                        color="red"
                        onClick={() => setShowSectionAssignment(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="gradient" color="green" onClick={handleAssignSection}>
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
    </Dialog>
  );
}