// Macro Calculator Utilities

export interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
}

export type MacroSplit = 'balanced' | 'lowCarb' | 'highProtein' | 'keto' | 'custom';

export function calculateMacros(
  calories: number,
  split: MacroSplit = 'balanced',
  customProtein?: number,
  customCarbs?: number,
  customFat?: number
): MacroResult {
  let proteinPercent: number;
  let carbsPercent: number;
  let fatPercent: number;

  if (split === 'custom' && customProtein && customCarbs && customFat) {
    proteinPercent = customProtein;
    carbsPercent = customCarbs;
    fatPercent = customFat;
  } else {
    switch (split) {
      case 'lowCarb':
        proteinPercent = 30;
        carbsPercent = 30;
        fatPercent = 40;
        break;
      case 'highProtein':
        proteinPercent = 40;
        carbsPercent = 30;
        fatPercent = 30;
        break;
      case 'keto':
        proteinPercent = 25;
        carbsPercent = 5;
        fatPercent = 70;
        break;
      default: // balanced
        proteinPercent = 30;
        carbsPercent = 40;
        fatPercent = 30;
    }
  }

  const proteinCalories = calories * (proteinPercent / 100);
  const carbsCalories = calories * (carbsPercent / 100);
  const fatCalories = calories * (fatPercent / 100);

  return {
    calories,
    protein: proteinCalories / 4, // 4 cal per gram
    carbs: carbsCalories / 4, // 4 cal per gram
    fat: fatCalories / 9, // 9 cal per gram
    proteinCalories,
    carbsCalories,
    fatCalories,
  };
}
