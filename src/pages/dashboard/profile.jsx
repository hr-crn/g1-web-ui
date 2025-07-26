import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import {
  PencilIcon,
} from "@heroicons/react/24/solid";

import { ProfileInfoCard} from "@/widgets/cards";


export function Profile() {
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
                  Hera Carino
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
                "Name": "Hera Carino",
                username: "herascarino",
                password: "*******"
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />
            
          </div>

        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
