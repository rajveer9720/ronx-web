import { DashboardRounded, AccessTimeRounded } from "@mui/icons-material";
import { Navigation } from "@toolpad/core/AppProvider";

export const Sidebar: Navigation = [
  { title: "Dashboard", icon: <DashboardRounded />, segment: "user/dashboard" },
  {
    title: "Activity",
    icon: <AccessTimeRounded />,
    segment: "user/activity",
  },
];
