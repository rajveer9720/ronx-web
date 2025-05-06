import {
  Calculate,
  SpaceDashboard,
  BarChart,
  ViewTimeline,
  Diversity3,
} from "@mui/icons-material";
import { Navigation } from "@toolpad/core/AppProvider";

export const Sidebar: Navigation = [
  { title: "Dashboard", icon: <SpaceDashboard />, segment: "dashboard" },
  {
    title: "Activity",
    icon: <ViewTimeline />,
    segment: "activity",
  },
  {
    title: "Partners",
    icon: <Diversity3 />,
    segment: "partner",
  },
  {
    title: "Stats",
    icon: <BarChart />,
    segment: "stats",
  },
  {
    title: "Calculator",
    icon: <Calculate />,
    segment: "calculator",
  },
];
