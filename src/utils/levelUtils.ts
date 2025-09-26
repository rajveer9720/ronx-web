import { Theme } from "@mui/material";
import { IUserLevel } from "../interfaces/user-levels";
import { createElement, ReactNode } from "react";
import {
  WarningAmberRounded,
  RedeemRounded,
  CachedRounded,
  AccountBalanceWalletRounded,
} from "@mui/icons-material";
import { ITransaction } from "../interfaces/transaction";
import { INodeData } from "../interfaces/grid";
import { ProgramIds } from "./programUtils";

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

export const getNodeColor = (theme: Theme, txn: ITransaction): string => {
  if (txn.spill_up) return "#ff6b6b"; 
  if (txn.spill_down) return "#4ecdc4";
  return theme.palette.primary.main;
};

export const getNodesData = (
  theme: Theme,
  transactions: ITransaction[],
  program_id: number
) => {
  const totalSlots = program_id === ProgramIds.X3 ? 3 : 6;
  const nodes: INodeData[] = [];
  for (let i = 1; i <= totalSlots; i++) {
    const txn = transactions.find((transaction) => transaction.place === i);
    
    if (txn) {
      nodes.push({
        id: i.toString(),
        label: txn.user.id.toString(),
        link: `/user/${txn.user.id}`,
        nodeColor: getNodeColor(theme, txn),
        spillInfo: {
          spill_up: txn.spill_up,
          spill_down: txn.spill_down,
        },
      });
    } else {
      nodes.push({
        id: i.toString(),
        label: "NA",
        link: "/",
        nodeColor: theme.palette.common.white,
        spillInfo: {
          spill_up: false,
          spill_down: false,
        },
      });
    }
  }
  return nodes;
};

export const getLevelListItems = (level: IUserLevel, cycles: number = 1) => {
  let items: any[] = [];

  items = [
    {
      icon: createElement(CachedRounded, {
        sx: { color: "white" },
      }),
      label: "Cycles",
      value: cycles,
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



export const canUpgradeLevel = (
  currentLevel: number,
  allUserLevels: IUserLevel[] = []
): boolean => {
  const unlockedLevels = allUserLevels
    .filter((level) => level.unlock)
    .map((level) => level.level?.level || 0)
    .sort((a, b) => a - b);

  if (unlockedLevels.length === 0) {
    return currentLevel === 1;
  }

  const highestUnlockedLevel = Math.max(...unlockedLevels);

  return (
    unlockedLevels.includes(currentLevel) ||
    currentLevel === highestUnlockedLevel + 1
  );
};

export const getNextRequiredLevel = (allUserLevels: IUserLevel[] = []): number => {
  const unlockedLevels = allUserLevels
    .filter((level) => level.unlock)
    .map((level) => level.level?.level || 0)
    .sort((a, b) => a - b);

  if (unlockedLevels.length === 0) {
    return 1;
  }

  return Math.max(...unlockedLevels) + 1;
};




