import { IProgram } from "./program";

export interface ILevel {
  id: number;
  level: number;
  busd: number;
  program: IProgram;
  created_at: string;
  updated_at: string;
}
