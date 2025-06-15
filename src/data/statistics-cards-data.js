import {
  UsersIcon,
  DocumentTextIcon,
  SwatchIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: SwatchIcon,
    title: "Total Section",
    value: "4",
    footer: {
      color: "text-green-500",
      value: "View Sections",
      label: "",
      path: "/dashboard/section",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total Student",
    value: "69",
    footer: {
      color: "text-green-500",
      value: "View Students",
      label: "",
      path: "/dashboard/student",
    },
  },
  {
    color: "gray",
    icon: DocumentTextIcon,
    title: "Total Quizzes",
    value: "4",
    footer: {
      color: "text-green-500",
      value: "View Scores",
      label: "",
      path: "/dashboard/quiz",
    },
  },
  {
    color: "gray",
    icon: BookOpenIcon,
    title: "Total Modules",
    value: "4",
    footer: {
      color: "text-green-500",
      value: "View Modules",
      label: "",
      path: "/dashboard/modules",
    },
  },
];

export default statisticsCardsData;
