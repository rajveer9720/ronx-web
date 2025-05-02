export interface LevelCardType {
  level: number;
  busd: number;
  partner: number;
  cycles: number;
  revenue: number;
  large: boolean;
  disabled: boolean;
}

export interface NavigationType {
  prevLevel: number;
  nextLevel: number;
  uplineId: string;
}

export interface LevelCardData {
  levelCards: LevelCardType[];
  navigation: NavigationType;
}
