import { AttachMoney, Diversity3, Groups, Percent } from "@mui/icons-material";
import React from "react";
import { IDashboardCardData } from "../interfaces/dashboard";

export const DashboardCards: IDashboardCardData[] = [
  {
    title: "Partners",
    icon: React.createElement(Diversity3, {
      color: "primary",
      fontSize: "large",
    }),
    start: 0,
    end: 2,
  },
  {
    title: "Team",
    icon: React.createElement(Groups, { color: "primary", fontSize: "large" }),
    start: 0,
    end: 7,
  },
  {
    title: "Ratio",
    icon: React.createElement(Percent, { color: "primary", fontSize: "large" }),
    start: 0,
    suffix: "%",
    decimals: 2,
    end: 175,
  },
  {
    title: "Profits",
    icon: React.createElement(AttachMoney, {
      color: "primary",
      fontSize: "large",
    }),
    start: 0,
    decimals: 4,
    end: 35.0001,
  },
];
