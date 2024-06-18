import {
  Book,
  Calendar,
  CircleHelp,
  CircuitBoard,
  ClipboardType,
  FileQuestion,
  Folder,
  Notebook,
  Settings,
  Timer,
  Trash,
  User,
  UserRound,
  Users,
  icons,
} from "lucide-react";
import { Search, Home } from "lucide-react";

export const menuList = [
  {
    group: "General",
    items: [
      {
        link: "/home",
        text: "Home",
        icon: <Home size={20} />,
      },
      // {
      //   link: "/search",
      //   text: "Search",
      //   icon: <Search size={20} />,
      // },
      {
        link: "/settings",
        text: "Settings",
        icon: <Settings size={20} />,
      },
    ],
  },
  {
    group: "Main",
    items: [
      {
        link: "/board",
        text: "Board",
        icon: <ClipboardType size={20} />,
      },
      {
        link: "/journal",
        text: "Journal",
        icon: <Book size={20} />,
      },
      {
        link: "/notes",
        text: "Notes",
        icon: <Notebook size={20} />,
      },
      {
        link: "/pomodoro",
        text: "Pomodoro",
        icon: <Timer size={20} />,
      },
      {
        link: "/reminder",
        text: "Reminder",
        icon: <Calendar size={20} />,
      },

      // {
      //   link: "/resources",
      //   text: "Resources",
      //   icon: <Folder size={20} />,
      // },

      // {
      //   link: "/flashcard",
      //   text: "Flash Card",
      //   icon: <FileQuestion size={20} />,
      // },
    ],
  },
  {
    group: "Others",
    items: [
      {
        link: "/aboutUs",
        text: "About Us",
        icon: <Users size={20} />,
      },
      {
        link: "/help",
        text: "Help",
        icon: <CircleHelp size={20} />,
      },
      {
        link: "/trash",
        text: "Trash",
        icon: <Trash size={20} />,
      },
    ],
  },
];
