import { ReactNode } from "react";

export interface IDashboardCardData {
  title: string;
  icon: ReactNode;
  start: number;
  end: number;
  suffix?: string;
  decimals?: number;
}
