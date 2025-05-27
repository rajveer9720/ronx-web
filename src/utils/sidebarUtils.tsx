import {
  CalculateRounded,
  GridViewRounded,
  BarChartRounded,
  Diversity3Rounded,
} from "@mui/icons-material";
import { Navigation } from "@toolpad/core/AppProvider";
import { RoutePaths } from "./routes";

export const Sidebar: Navigation = [
  {
    title: "Dashboard",
    icon: <GridViewRounded />,
    segment: RoutePaths.DASHBOARD,
  },
  {
    title: "Referrals",
    icon: <Diversity3Rounded />,
    segment: RoutePaths.REFERRAL,
  },
  {
    title: "Activity",
    icon: <BarChartRounded />,
    segment: RoutePaths.ACTIVITY,
  },
  {
    title: "Calculator",
    icon: <CalculateRounded />,
    segment: RoutePaths.CALCULATOR,
  },
];
