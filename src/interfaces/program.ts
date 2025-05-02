export interface Level {
  level: number;
  busd: number;
  people: number;
  cycles: number;
}

export interface ProgramType {
  type: string;
  price: string;
  levels: Level[];
}
