import { ILevel } from "./level";

export interface IProgram {
  id: number;
  name: string;
  levels: ILevel[];
  created_at: string;
}


export interface ProgramCardProps {
  textPrimary?: string;
  textSecondary?: string;
  program: IProgram;
  href: string;
}