import {
  DashboardRounded,
  AccessTimeRounded,
  CalculateOutlined,
} from "@mui/icons-material";
import { Navigation } from "@toolpad/core/AppProvider";

export const Sidebar: Navigation = [
  { title: "Dashboard", icon: <DashboardRounded />, segment: "user/dashboard" },
  {
    title: "Activity",
    icon: <AccessTimeRounded />,
    segment: "user/activity",
  },
  {
    title: "Calculator",
    icon: <CalculateOutlined />,
    segment: "user/calculator",
  },
];
