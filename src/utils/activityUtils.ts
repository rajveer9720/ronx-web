import React, { ReactNode } from "react";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { partnerResultsData } from "../mock";

export interface ActivityCardData {
  title: string;
  value: string | number;
  icon: () => ReactNode;
}

export const getActivityCards = (): ActivityCardData[] => [
  {
    title: "Total Investors",
    value: partnerResultsData.totalInvestor,
    icon: () => React.createElement(PeopleRoundedIcon, { color: "primary" }),
  },
  {
    title: "Total Invested (BNB)",
    value: partnerResultsData.totalInvestedBNB,
    icon: () => React.createElement(PaidRoundedIcon, { color: "secondary" }),
  },
  {
    title: "Total Payout (BNB)",
    value: partnerResultsData.totalPayoutBNB.toLocaleString(),
    icon: () => React.createElement(PaidRoundedIcon, { color: "success" }),
  },
];
