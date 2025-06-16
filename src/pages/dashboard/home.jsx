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
import { homeCardsData, projectsData,} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid"; // Already here

export function Home() {
  return (
    // Wrap everything in a single parent div or a React Fragment (<></>)
    <div className="min-h-screen"> {/* Added a wrapper div */}
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {homeCardsData.map(({ icon, title, footer, ...rest }) => (
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
      </div> 
    </div>
  );
}

export default Home;