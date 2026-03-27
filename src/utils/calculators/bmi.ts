// BMI Calculator Logic
export interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  categoryLabel: string;
  healthyWeightRange: { min: number; max: number };
}

export function calculateBMI(weight: number, height: number, unit: 'metric' | 'imperial'): BMIResult {
  let bmi: number;
  
  if (unit === 'imperial') {
    // weight in pounds, height in inches
    bmi = (weight / (height * height)) * 703;
  } else {
    // weight in kg, height in meters
    bmi = weight / (height * height);
  }

  let category: BMIResult['category'];
  let categoryLabel: string;

  if (bmi < 18.5) {
    category = 'underweight';
    categoryLabel = 'Bajo peso';
  } else if (bmi < 25) {
    category = 'normal';
    categoryLabel = 'Peso normal';
  } else if (bmi < 30) {
    category = 'overweight';
    categoryLabel = 'Sobrepeso';
  } else {
    category = 'obese';
    categoryLabel = 'Obesidad';
  }

  // Calculate healthy weight range
  const heightSquared = unit === 'imperial' ? (height * height) / 703 : height * height;
  const healthyWeightRange = {
    min: Math.round(18.5 * heightSquared * 10) / 10,
    max: Math.round(24.9 * heightSquared * 10) / 10,
  };

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    categoryLabel,
    healthyWeightRange,
  };
}
