import { DashboardRounded, ReceiptLongRounded } from "@mui/icons-material";
import { Navigation } from "@toolpad/core/AppProvider";

export const Sidebar: Navigation = [
  { title: "Dashboard", icon: <DashboardRounded />, segment: "user/dashboard" },
  {
    title: "Transactions",
    icon: <ReceiptLongRounded />,
    segment: "user/transactions",
  },
];
