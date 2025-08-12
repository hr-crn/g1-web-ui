import {
  UsersIcon,
  DocumentTextIcon,
  SwatchIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

export const homeCardsData = [
  {
    color: "orange",
    icon: SwatchIcon,
    title: "Total Section",
    value: "4",
    footer: {
      color: "text-orange-600",
      value: "🏫 View Sections",
      label: "",
      path: "/dashboard/section",
    },
  },
  {
    color: "blue",
    icon: UsersIcon,
    title: "Total Student",
    value: "69",
    footer: {
      color: "text-blue-600",
      value: "👥 View Students",
      label: "",
      path: "/dashboard/students",
    },
  },
  {
    color: "purple",
    icon: DocumentTextIcon,
    title: "Total Quizzes",
    value: "4",
    footer: {
      color: "text-purple-600",
      value: "📝 View Scores",
      label: "",
      path: "/dashboard/quiz",
    },
  },
  {
    color: "green",
    icon: BookOpenIcon,
    title: "Total Modules",
    value: "4",
    footer: {
      color: "text-green-600",
      value: "📚 View Progress",
      label: "",
      path: "/dashboard/modules",
    },
  },
];

export default homeCardsData;
