import {
  CalculateRounded,
  GridViewRounded,
  BarChartRounded,
  ViewTimelineRounded,
  Diversity3Rounded,
} from "@mui/icons-material";
import { Navigation } from "@toolpad/core/AppProvider";

export const Sidebar: Navigation = [
  { title: "Dashboard", icon: <GridViewRounded />, segment: "dashboard" },
  {
    title: "Activity",
    icon: <ViewTimelineRounded />,
    segment: "activity",
  },
  {
    title: "Partners",
    icon: <Diversity3Rounded />,
    segment: "partner",
  },
  {
    title: "Stats",
    icon: <BarChartRounded />,
    segment: "stats",
  },
  {
    title: "Calculator",
    icon: <CalculateRounded />,
    segment: "calculator",
  },
];
