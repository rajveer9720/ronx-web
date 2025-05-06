export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  wallet_address: string;
  avatar: string;
  referral_code: string;
  is_disabled: boolean;
  upline_id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null; // nullable ISO date string
}
