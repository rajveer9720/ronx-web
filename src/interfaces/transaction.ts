import { IPaginate, IPagination } from "./pagination";
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
  program_id?: number;
  level?: number;
  cycle?: number;
}

export interface ITransactionResponse {
  data: ITransaction[];
  pagination: IPagination;
}

export interface ITransactionPaginateRequest
  extends ITransactionRequest,
    IPaginate {}
