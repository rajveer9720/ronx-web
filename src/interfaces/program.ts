export interface IProgram {
  id: number;
  name: string;
  price: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null; // nullable ISO date string
}
