import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const [studentName, setStudentName] = useState("");
  const [username, setUsername] = useState("");
  const [section, setSection] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [availableSections, setAvailableSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { studentSlug } = useParams();

  // Helper function to convert slug back to username
  const slugToUsername = (slug) => {
    return slug.replace(/-/g, '_');
  };

  // Helper function to convert username to slug
  const usernameToSlug = (username) => {
    return username.replace(/_/g, '-');
  };

  useEffect(() => {
    // Load available sections from localStorage
    const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
    const activeSections = savedSections.filter(s => !s.archived);
    setAvailableSections(activeSections);

    // Load student data from localStorage
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const potentialUsername = slugToUsername(studentSlug);
    
    // Find the student by matching slug or exact username
    const student = savedStudents.find(s => 
      usernameToSlug(s.username) === studentSlug || 
      s.username === potentialUsername
    );

    if (student) {
      setStudentName(student.studentName);
      setUsername(student.username);
      setSection(student.section);
      setOriginalUsername(student.username);
    } else {
      alert("Student not found!");
      navigate('/dashboard/students');
      return;
    }
    
    setLoading(false);
  }, [studentSlug, navigate]);

  const handleUpdateStudent = (e) => {
    e.preventDefault();

    if (studentName.trim() === "") {
      alert("Student Name cannot be empty!");
      return;
    }

    if (username.trim() === "") {
      alert("Username cannot be empty!");
      return;
    }

    if (section === "") {
      alert("Please select a section!");
      return;
    }

    // Get existing students from localStorage
    const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
    
    // Check if new username already exists (excluding current student)
    const usernameExists = existingStudents.some(
      student => student.username.toLowerCase() === username.trim().toLowerCase() 
                 && student.username !== originalUsername
    );

    if (usernameExists) {
      alert("A student with this username already exists!");
      return;
    }

    // Find the original student to get the old section
    const originalStudent = existingStudents.find(s => s.username === originalUsername);
    const oldSection = originalStudent ? originalStudent.section : null;

    // Update the student
    const updatedStudents = existingStudents.map(student => 
      student.username === originalUsername 
        ? { 
            ...student, 
            studentName: studentName.trim(),
            username: username.trim(),
            section: section
          }
        : student
    );
    
    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Update section student counts if section changed
    if (oldSection && oldSection !== section) {
      const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
      const updatedSections = savedSections.map(s => {
        if (s.sectionName === oldSection) {
          return { ...s, noOfStudents: Math.max(0, s.noOfStudents - 1) };
        } else if (s.sectionName === section) {
          return { ...s, noOfStudents: s.noOfStudents + 1 };
        }
        return s;
      });
      localStorage.setItem('sections', JSON.stringify(updatedSections));
    }

    console.log("Student updated successfully:", { studentName, username, section });
    alert(`Student "${studentName}" updated successfully!`);

    // Redirect back to the students page
    navigate('/dashboard/students');
  };

  const handleCancel = () => {
    navigate('/dashboard/students');
  };

  if (loading) {
    return (
      <div className="mt-12 mb-8 flex flex-col items-center">
        <Typography variant="h6" color="blue-gray">
          Loading...
        </Typography>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader variant="gradient" color="green" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Edit Student Information
          </Typography>
        </CardHeader>
        <CardBody className="p-4">
          <form onSubmit={handleUpdateStudent}>
            <div className="mb-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold mb-2 block"
              >
                Student Name
              </Typography>
              <Input
                type="text"
                label="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                size="lg"
                required
                className="focus:!border-t-green-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="mb-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold mb-2 block"
              >
                Username
              </Typography>
              <Input
                type="text"
                label="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
                required
                className="focus:!border-t-green-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="mb-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold mb-2 block"
              >
                Section
              </Typography>
              <Select
                label="Select section"
                value={section}
                onChange={(value) => setSection(value)}
                size="lg"
                required
                className="focus:!border-t-green-900"
              >
                {availableSections.map((sectionItem) => (
                  <Option key={sectionItem.sectionName} value={sectionItem.sectionName}>
                    {sectionItem.sectionName}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="flex gap-4 justify-end mt-4">
              <Button
                type="button"
                variant="outlined"
                color="red"
                onClick={handleCancel}
                className="hover:bg-red-500 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                color="green"
                className="hover:bg-green-600"
              >
                Update Student
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default EditStudent;
