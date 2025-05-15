import { ILevel } from "./level";
import { IUser } from "./user";

export interface IUserLevel {
  id: number;
  revenue: number;
  missed_revenue: number;
  gift_revenue: number;
  people: number;
  cycles: number;
  active: boolean;
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
