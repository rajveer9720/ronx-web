import { AttachMoney, Diversity3, Groups, Percent } from "@mui/icons-material";
import React from "react";
import * as dashboardData from "../mock";
import { DashboardCardData } from "../interfaces/dashboard";

export const getDashboardCards = (): DashboardCardData[] => [
  {
    title: "Partners",
    icon: React.createElement(Diversity3, { color: "primary" }),
    start: 0,
    end: dashboardData.cards.partners,
  },
  {
    title: "Team",
    icon: React.createElement(Groups, { color: "primary" }),
    start: 0,
    end: dashboardData.cards.team,
  },
  {
    title: "Ratio",
    icon: React.createElement(Percent, { color: "secondary" }),
    start: 0,
    suffix: "%",
    decimals: 2,
    end: dashboardData.cards.ratio,
  },
  {
    title: "Profits",
    icon: React.createElement(AttachMoney, { color: "secondary" }),
    start: 0,
    decimals: 4,
    end: dashboardData.cards.profits,
  },
];
