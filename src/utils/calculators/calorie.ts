// Calorie/TDEE Calculator Logic
export interface CalorieResult {
  bmr: number; // Basal Metabolic Rate
  tdee: number; // Total Daily Energy Expenditure
  goals: {
    extremeLoss: number; // -1000 cal
    weightLoss: number; // -500 cal
    mildLoss: number; // -250 cal
    maintain: number;
    mildGain: number; // +250 cal
    weightGain: number; // +500 cal
    extremeGain: number; // +1000 cal
  };
}

export function calculateCalories(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive',
  unit: 'metric' | 'imperial' = 'metric'
): CalorieResult {
  let bmr: number;

  // Convert imperial to metric if needed
  let weightKg = weight;
  let heightCm = height;

  if (unit === 'imperial') {
    weightKg = weight * 0.453592; // pounds to kg
    heightCm = height * 2.54; // inches to cm
  }

  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    veryActive: 1.9, // Very hard exercise, physical job
  };

  const tdee = bmr * activityMultipliers[activityLevel];

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    goals: {
      extremeLoss: Math.round(tdee - 1000),
      weightLoss: Math.round(tdee - 500),
      mildLoss: Math.round(tdee - 250),
      maintain: Math.round(tdee),
      mildGain: Math.round(tdee + 250),
      weightGain: Math.round(tdee + 500),
      extremeGain: Math.round(tdee + 1000),
    },
  };
}
