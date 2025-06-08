import { ILevel } from "./level";
import { IPaginate, IPagination } from "./pagination";
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

export interface IUserLevelRequest extends IPaginate {
  user_id?: number;
  level?: number;
  program_id?: number;
}

export interface IUserLevelResponse {
  data: IUserLevel[];
  pagination: IPagination;
  total_cycles: number;
}
