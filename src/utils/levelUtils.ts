import { Theme } from "@mui/material";
import { IUserLevel } from "../interfaces/user-levels";
import { createElement, ReactNode } from "react";
import {
  WarningAmberRounded,
  RedeemRounded,
  CachedRounded,
  AccountBalanceWalletRounded,
  PeopleRounded,
} from "@mui/icons-material";

export const getBgColor = (level: IUserLevel, theme: Theme): string => {
  if (level.unlock) return theme.palette.primary.light;
  return theme.palette.grey[900];
};

export const getLevelIconBgColor = (
  level: IUserLevel,
  theme: Theme
): string => {
  if (level.unlock) return theme.palette.primary.light;
  return theme.palette.grey[300];
};

export const getLevelIcon = (level: IUserLevel): ReactNode => {
  if (level.gift_revenue > 0)
    return createElement(RedeemRounded, {
      sx: { color: "white", fontSize: 16 },
    });
  else if (level.missed_revenue > 0)
    return createElement(WarningAmberRounded, {
      sx: { color: "white", fontSize: 16 },
    });
};

export const getLevelListItems = (level: IUserLevel) => {
  let items: any[] = [];

  items = [
    {
      icon: createElement(PeopleRounded, {
        sx: { color: "white" },
      }),
      label: "Partners",
      value: 5,
    },
    {
      icon: createElement(CachedRounded, {
        sx: { color: "white" },
      }),
      label: "Cycles",
      value: 5,
    },
    {
      icon: createElement(RedeemRounded, {
        sx: { color: "white" },
      }),
      label: "Gift Revenue",
      value: level.gift_revenue,
    },
    {
      icon: createElement(WarningAmberRounded, {
        sx: { color: "white" },
      }),
      label: "Missed Revenue",
      value: level.missed_revenue,
    },
    {
      icon: createElement(AccountBalanceWalletRounded, {
        sx: { color: "white" },
      }),
      label: "Total Revenue",
      value: level.total_revenue,
    },
  ];

  return items;
};

export const EmptyUserLevel: IUserLevel = {
  id: 0,
  level: {} as any,
  user: {} as any,
  total_revenue: 0,
  missed_revenue: 0,
  gift_revenue: 0,
  unlock: false,
  freeze: false,
  created_at: "",
  updated_at: "",
};
