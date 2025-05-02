import { ReactNode } from "react";

export interface DashboardCardData {
  title: string;
  icon: ReactNode;
  start: number;
  end: number;
  suffix?: string;
  decimals?: number;
}
