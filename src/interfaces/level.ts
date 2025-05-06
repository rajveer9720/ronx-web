import { IProgram } from "./program";
import { IUser } from "./user";

export interface ILevel {
  id: number;
  level: number;
  busd: number;
  people: number;
  cycles: number;
  revenue: number;
  missed_revenue: number;
  freeze: boolean;
  active: boolean;
  user: IUser;
  program: IProgram;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null; // nullable ISO date string
}
