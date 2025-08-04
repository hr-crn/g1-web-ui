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


function AddStudent() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (fullName.trim() === "" || username.trim() === "" || password.trim() === "") {
      alert("All fields are required!");
      return;
    }
    // Simulate student creation
    console.log("Creating student:", { fullName, username, password });
    alert(`Student "${fullName}" created successfully! (Simulated)`);
    navigate('/dashboard/students');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader variant="gradient" color="gray" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Add New Student
          </Typography>
        </CardHeader>
        <CardBody className="p-4">
          <form onSubmit={handleAddStudent}>
            <div className="mb-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold mb-2 block"
              >
                Full Name
              </Typography>
              <Input
                type="text"
                label="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                size="lg"
                required
                className="focus:!border-t-blue-gray-900"
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
                className="focus:!border-t-blue-gray-900"
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
                Password
              </Typography>
              <Input
                type="password"
                label="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Add Student
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddStudent;