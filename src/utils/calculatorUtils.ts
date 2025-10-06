import { Colors } from "./colors";
export const stages = [
  { name: `${Colors.title} x3`, costMultiplier: 1, resultMultiplier: 3 },
  { name: `${Colors.title} x4`, costMultiplier: 1, resultMultiplier: 4 },
];

export const slotPrices = [5, 10, 20, 40, 80, 160, 320, 640, 1250, 2500, 5000, 9900];

export const calculateCost = (
  selectedSlots: number[],
  selectedStage: typeof stages[0],
  slotPrices: number[]
): number => {
  return selectedSlots.reduce((total, slot) => {
    const slotCost = slotPrices[slot - 1] * selectedStage.costMultiplier;
    return total + slotCost;
  }, 0);
};

export const calculateResult = (
  selectedSlots: number[],
  selectedStage: typeof stages[0],
  slotPrices: number[]
): number => {
  return selectedSlots.reduce((total, slot) => {
    const slotCost = slotPrices[slot - 1];
    return total + slotCost * selectedStage.resultMultiplier;
  }, 0);
};
