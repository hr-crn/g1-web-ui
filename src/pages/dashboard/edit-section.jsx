import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

function EditSection() {
  const [sectionName, setSectionName] = useState("");
  const [originalSectionName, setOriginalSectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { sectionSlug } = useParams();

  // Helper function to convert slug back to section name
  const slugToSectionName = (slug) => {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Helper function to convert section name to slug
  const sectionNameToSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  useEffect(() => {
    // Load section data from localStorage
    const savedSections = JSON.parse(localStorage.getItem('sections') || '[]');
    const potentialSectionName = slugToSectionName(sectionSlug);
    
    // Find the section by matching slug or exact name
    const section = savedSections.find(s => 
      sectionNameToSlug(s.sectionName) === sectionSlug || 
      s.sectionName.toLowerCase() === potentialSectionName.toLowerCase()
    );

    if (section) {
      setSectionName(section.sectionName);
      setOriginalSectionName(section.sectionName);
    } else {
      alert("Section not found!");
      navigate('/dashboard/section');
      return;
    }
    
    setLoading(false);
  }, [sectionSlug, navigate]);

  const handleUpdateSection = (e) => {
    e.preventDefault();

    if (sectionName.trim() === "") {
      alert("Section Name cannot be empty!");
      return;
    }

    // Get existing sections from localStorage
    const existingSections = JSON.parse(localStorage.getItem('sections') || '[]');
    
    // Check if new section name already exists (excluding current section)
    const sectionExists = existingSections.some(
      section => section.sectionName.toLowerCase() === sectionName.trim().toLowerCase() 
                 && section.sectionName !== originalSectionName
    );

    if (sectionExists) {
      alert("A section with this name already exists!");
      return;
    }

    // Update the section
    const updatedSections = existingSections.map(section => 
      section.sectionName === originalSectionName 
        ? { ...section, sectionName: sectionName.trim() }
        : section
    );
    
    // Save to localStorage
    localStorage.setItem('sections', JSON.stringify(updatedSections));

    console.log("Section updated successfully:", sectionName);
    alert(`Section updated to "${sectionName}" successfully!`);

    // Redirect back to the dashboard/sections page
    navigate('/dashboard/section');
  };

  const handleCancel = () => {
    navigate('/dashboard/section');
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
            Edit Section
          </Typography>
        </CardHeader>
        <CardBody className="p-4">
          <form onSubmit={handleUpdateSection}>
            <div className="mb-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold mb-2 block"
              >
                Section Name
              </Typography>
              <Input
                type="text"
                label="Enter section name"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                size="lg"
                required
                className="focus:!border-t-green-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
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
                Update Section
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default EditSection;
