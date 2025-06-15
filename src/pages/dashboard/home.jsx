import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  // --- New Imports for Modules section ---
  CardFooter, // Added for Modules CardFooter
  Tabs,       // Added for Modules if needed
  TabsHeader, // Added for Modules if needed
  Tab,        // Added for Modules if needed
  Switch,     // Added for Modules Switch
  Button,     // Added for Modules if needed
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
// --- New Imports for Modules section from @heroicons/react/24/solid ---
import {
  HomeIcon, // Added for Modules section
  ChatBubbleLeftEllipsisIcon, // Added for Modules section
  Cog6ToothIcon, // Added for Modules section
  PencilIcon, // Added for Modules section
} from "@heroicons/react/24/solid";

import { StatisticsCard } from "@/widgets/cards";
import { statisticsCardsData, projectsData,} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid"; // Already here

export function Home() {
  return (
    // Wrap everything in a single parent div or a React Fragment (<></>)
    <div className="min-h-screen"> {/* Added a wrapper div */}
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={footer}
            />
          ))}
        </div>
      </div> {/* End of existing div */}

      {/* Start of the Modules section content */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Modules
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Science and Technology Modules Available:
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, isEnabled }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Switch
                        key={tag}
                        id={tag}
                        label="Lock/Unlock"
                        defaultChecked={isEnabled}
                        labelProps={{
                          className: "text-sm font-normal text-blue-gray-500",
                        }}
                      />
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      {/* End of the Modules section content */}
    </div> // End of the main wrapper div
  );
}

export default Home;