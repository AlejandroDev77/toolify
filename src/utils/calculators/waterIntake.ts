// Water Intake Calculator Utilities

export interface WaterIntakeResult {
  dailyIntake: number; // liters
  glasses: number; // 250ml glasses
  recommendation: string;
}

export function calculateWaterIntake(
  weight: number, // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive',
  climate: 'cold' | 'moderate' | 'hot' = 'moderate'
): WaterIntakeResult {
  // Base calculation: 30-35ml per kg
  let baseIntake = weight * 0.033; // liters

  // Activity multiplier
  const activityMultipliers = {
    sedentary: 1.0,
    light: 1.1,
    moderate: 1.2,
    active: 1.3,
    veryActive: 1.5,
  };

  baseIntake *= activityMultipliers[activityLevel];

  // Climate adjustment
  const climateAdjustments = {
    cold: 0.9,
    moderate: 1.0,
    hot: 1.2,
  };

  const dailyIntake = baseIntake * climateAdjustments[climate];
  const glasses = Math.round(dailyIntake * 4); // 250ml glasses

  let recommendation: string;
  if (dailyIntake < 2) {
    recommendation = 'Low - Consider increasing water intake';
  } else if (dailyIntake < 3) {
    recommendation = 'Adequate - Good hydration level';
  } else if (dailyIntake < 4) {
    recommendation = 'Good - Excellent hydration';
  } else {
    recommendation = 'High - Ensure proper electrolyte balance';
  }

  return {
    dailyIntake: Math.round(dailyIntake * 10) / 10,
    glasses,
    recommendation,
  };
}
