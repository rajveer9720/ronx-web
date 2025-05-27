import {
  Diversity3,
  PaymentsRounded,
  Percent,
  TrendingUpRounded,
} from "@mui/icons-material";
import React from "react";
import { IDashboardCardData } from "../interfaces/dashboard";
import { IUserStats } from "../interfaces/user";

export const getDashboardCards = (user_stats?: IUserStats) => {
  let items: IDashboardCardData[] = [];
  items = [
    {
      title: "Referrals",
      icon: React.createElement(Diversity3, {
        color: "primary",
        fontSize: "large",
      }),
      start: 0,
      end: user_stats?.referrals || 0,
    },
    {
      title: "Investments",
      icon: React.createElement(PaymentsRounded, {
        color: "primary",
        fontSize: "large",
      }),
      start: 0,
      decimals: 4,
      end: user_stats?.investments || 0,
    },
    {
      title: "Profits",
      icon: React.createElement(TrendingUpRounded, {
        color: "primary",
        fontSize: "large",
      }),
      start: 0,
      decimals: 4,
      end: user_stats?.profits || 0,
    },
    {
      title: "Ratio",
      icon: React.createElement(Percent, {
        color: "primary",
        fontSize: "large",
      }),
      start: 0,
      suffix: "%",
      decimals: 2,
      end: user_stats?.ratio || 0,
    },
  ];
  return items;
};
