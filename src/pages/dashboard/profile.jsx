import React, { useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  PencilIcon,
} from "@heroicons/react/24/solid";

import { ProfileInfoCard} from "@/widgets/cards";


export function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Hera",
    lastName: "Carino",
    username: "hera.carino",
    email: "hera.carino@deped.gov.ph",
    password: "*******"
  });
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });

  const handleEditClick = () => {
    setEditData({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      username: profileData.username,
      password: ""
    });
    setIsEditOpen(true);
  };

  const handleSaveChanges = () => {
    if (editData.firstName.trim() === "" || editData.lastName.trim() === "") {
      window.showToast("First Name and Last Name cannot be empty!", "error");
      return;
    }

    if (editData.username.trim() === "") {
      window.showToast("Username cannot be empty!", "error");
      return;
    }

    setProfileData({
      ...profileData,
      firstName: editData.firstName,
      lastName: editData.lastName,
      username: editData.username,
      ...(editData.password && { password: "*******" })
    });
    setIsEditOpen(false);
    window.showToast("Profile updated successfully!", "success");
  };

  const handleCancel = () => {
    setIsEditOpen(false);
    setEditData({
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    });
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 bg-[url('/img/background-image.png')] bg-cover bg-center opacity-20" />

        {/* Floating elements for visual interest */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" />
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm animate-pulse delay-1000" />
      </div>

      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
        <CardBody className="p-6">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              {/* Enhanced Avatar */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
                  {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse" />
              </div>

              <div>
                <Typography variant="h4" color="blue-gray" className="mb-2 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {profileData.firstName} {profileData.lastName}
                </Typography>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
                    <Typography
                      variant="small"
                      className="font-semibold text-indigo-700"
                    >
                      👩‍🏫 Teacher
                    </Typography>
                  </div>
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <Typography variant="small" className="font-semibold text-green-700">
                      🟢 Online
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">


            <ProfileInfoCard
              title="Profile Information"
              description=""
              details={{
                "Full Name": `${profileData.firstName} ${profileData.lastName}`,
                "Username": profileData.username,
                "Email": profileData.email,
                "Password": profileData.password
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon
                    className="h-4 w-4 cursor-pointer text-blue-gray-500"
                    onClick={handleEditClick}
                  />
                </Tooltip>
              }
            />

          </div>

        </CardBody>
      </Card>

      {/* Enhanced Edit Profile Dialog */}
      <Dialog
        open={isEditOpen}
        handler={setIsEditOpen}
        size="md"
        className="bg-white/95 backdrop-blur-sm"
      >
        <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span>✏️</span>
            </div>
            <Typography variant="h5" color="white" className="font-bold">
              Edit Profile
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody className="p-6">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium flex items-center gap-2">
                <span>👤</span>
                First Name
              </Typography>
              <Input
                size="lg"
                placeholder="Enter first name"
                value={editData.firstName}
                onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                className="!border-t-blue-gray-200 focus:!border-t-indigo-500 hover:shadow-md transition-all duration-200"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Last Name
              </Typography>
              <Input
                size="lg"
                placeholder="Enter last name"
                value={editData.lastName}
                onChange={(e) => setEditData({...editData, lastName: e.target.value})}
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
                size="lg"
                placeholder="Enter username"
                value={editData.username}
                onChange={(e) => setEditData({...editData, username: e.target.value})}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                New Password (leave blank to keep current)
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Enter new password"
                value={editData.password}
                onChange={(e) => setEditData({...editData, password: e.target.value})}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="bg-gray-50 rounded-b-lg">
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-2 hover:bg-red-50 hover:scale-105 transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <span>❌</span>
              Cancel
            </span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSaveChanges}
            className="hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center gap-2">
              <span>💾</span>
              Save Changes
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
