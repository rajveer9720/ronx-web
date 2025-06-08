import { IPaginate, IPagination } from "./pagination";

export interface IUser {
  id: number;
  wallet_address: string;
  refer_code: string;
  is_disabled: boolean;
  parent: IUser;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IUserReferral extends IUser {
  profits: number;
}

export interface IUserLogin {
  wallet_address: string;
}

export interface IUserStats {
  referrals?: number;
  profits?: number;
  investments?: number;
  ratio?: number;
}

export interface IUserRequest {
  id?: number;
  refer_code?: string;
  wallet_address?: string;
}

export interface IUserReferralResponse {
  data: IUserReferral[];
  pagination: IPagination;
}

export interface IUserReferralRequest extends IUserRequest, IPaginate {}
