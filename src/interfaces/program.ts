import { ILevel } from "./level";

export interface IProgram {
  id: number;
  name: string;
  levels: ILevel[];
  created_at: string;
}
