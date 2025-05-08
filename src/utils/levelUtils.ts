import { Theme } from "@mui/material";
import { ILevel } from "../interfaces/level";
import { Colors } from "./colors";

export const getBgColor = (level: ILevel, theme: Theme): string => {
  if (level.missed_revenue > 0) return Colors.missed_revenue;
  if (level.active) return Colors.active;
  return theme.palette.text.primary;
};

export const EmptyLevel: ILevel = {
  level: 0,
  busd: 0,
  cycles: 0,
  people: 0,
  revenue: 0,
  missed_revenue: 0,
  freeze: false,
  active: false,
  program: {} as any,
  user: {} as any,
  id: 0,
  created_at: "",
  updated_at: "",
  deleted_at: "",
};
