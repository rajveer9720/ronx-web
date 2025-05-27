import { IUser } from "./user";
import { IUserLevel } from "./user-levels";

export interface ITransaction {
  id: number;
  hash: string;
  type?: string;
  event_name?: string;
  amount: number;
  place: number;
  spill_up: boolean;
  spill_down: boolean;
  user: IUser;
  user_level: IUserLevel;
  created_at: string;
}

export interface ITransactionRequest {
  user_id?: number;
  parent_id?: number;
  program_id?: number;
  level?: number;
  cycle?: number;
}
