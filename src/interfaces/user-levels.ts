import { ILevel } from "./level";
import { IUser } from "./user";

export interface IUserLevel {
  id: number;
  total_revenue: number;
  missed_revenue: number;
  gift_revenue: number;
  unlock: boolean;
  freeze: boolean;
  user: IUser;
  level: ILevel;
  created_at: string;
  updated_at: string;
}

export interface IUserLevelRequest {
  user_id?: number;
  level?: number;
  program_id?: number;
}
