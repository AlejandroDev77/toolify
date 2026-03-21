// Body Fat Calculator Utilities

export interface BodyFatResult {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  category: string;
}

// US Navy Method
export function calculateBodyFatNavy(
  gender: 'male' | 'female',
  weight: number, // kg
  height: number, // cm
  neck: number, // cm
  waist: number, // cm
  hip?: number // cm (required for females)
): BodyFatResult {
  let bodyFatPercentage: number;

  if (gender === 'male') {
    bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    if (!hip) hip = waist;
    bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }

  bodyFatPercentage = Math.max(0, Math.min(100, bodyFatPercentage));

  const fatMass = (bodyFatPercentage / 100) * weight;
  const leanMass = weight - fatMass;

  let category: string;
  if (gender === 'male') {
    if (bodyFatPercentage < 6) category = 'Essential Fat';
    else if (bodyFatPercentage < 14) category = 'Athletes';
    else if (bodyFatPercentage < 18) category = 'Fitness';
    else if (bodyFatPercentage < 25) category = 'Average';
    else category = 'Obese';
  } else {
    if (bodyFatPercentage < 14) category = 'Essential Fat';
    else if (bodyFatPercentage < 21) category = 'Athletes';
    else if (bodyFatPercentage < 25) category = 'Fitness';
    else if (bodyFatPercentage < 32) category = 'Average';
    else category = 'Obese';
  }

  return {
    bodyFatPercentage,
    fatMass,
    leanMass,
    category,
  };
}
