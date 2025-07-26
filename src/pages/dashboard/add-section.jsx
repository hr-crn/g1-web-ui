// src/pages/AddSection.jsx

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function AddSection() {
  const [sectionName, setSectionName] = useState("");
  const navigate = useNavigate();

  const handleCreateSection = (e) => {
    e.preventDefault();

    if (sectionName.trim() === "") {
      alert("Section Name cannot be empty!");
      return;
    }

    console.log("Attempting to create section with name:", sectionName);

    
    alert(`Section "${sectionName}" created successfully! (Simulated)`);

   
    navigate('/dashboard/section'); // Redirect back to the dashboard/sections page
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader variant="gradient" color="gray" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Add New Section
          </Typography>
        </CardHeader>
        <CardBody className="p-4">
          <form onSubmit={handleCreateSection}>
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
                className="focus:!border-t-blue-gray-900"
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
                color="gray"
                className="hover:bg-green-500 hover:text-white"
              >
                Create Section
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddSection;