import {
  Calculate,
  SpaceDashboard,
  BarChart,
  ViewTimeline,
  Diversity3,
} from "@mui/icons-material";
import { Navigation } from "@toolpad/core/AppProvider";

export const Sidebar: Navigation = [
  { title: "Dashboard", icon: <SpaceDashboard />, segment: "user/dashboard" },
  {
    title: "Activity",
    icon: <ViewTimeline />,
    segment: "user/activity",
  },
  {
    title: "Partners",
    icon: <Diversity3 />,
    segment: "user/partners",
  },
  {
    title: "Stats",
    icon: <BarChart />,
    segment: "user/stats",
  },
  {
    title: "Calculator",
    icon: <Calculate />,
    segment: "user/calculator",
  },
];
