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
    setProfileData({
      ...profileData,
      firstName: editData.firstName,
      lastName: editData.lastName,
      username: editData.username,
      ...(editData.password && { password: "*******" })
    });
    setIsEditOpen(false);
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
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {profileData.firstName} {profileData.lastName}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Teacher
                </Typography>
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

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} handler={setIsEditOpen}>
        <DialogHeader>Edit Profile</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                First Name
              </Typography>
              <Input
                size="lg"
                placeholder="Enter first name"
                value={editData.firstName}
                onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSaveChanges}>
            <span>Save Changes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
