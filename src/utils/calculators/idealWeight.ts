// Ideal Weight Calculator Utilities

export interface IdealWeightResult {
  robinson: number;
  miller: number;
  devine: number;
  hamwi: number;
  average: number;
  bmiRange: { min: number; max: number };
}

export function calculateIdealWeight(
  gender: 'male' | 'female',
  height: number // cm
): IdealWeightResult {
  const heightInches = height / 2.54;
  const heightOverFive = heightInches - 60;

  let robinson: number;
  let miller: number;
  let devine: number;
  let hamwi: number;

  if (gender === 'male') {
    robinson = 52 + 1.9 * heightOverFive;
    miller = 56.2 + 1.41 * heightOverFive;
    devine = 50 + 2.3 * heightOverFive;
    hamwi = 48 + 2.7 * heightOverFive;
  } else {
    robinson = 49 + 1.7 * heightOverFive;
    miller = 53.1 + 1.36 * heightOverFive;
    devine = 45.5 + 2.3 * heightOverFive;
    hamwi = 45.5 + 2.2 * heightOverFive;
  }

  const average = (robinson + miller + devine + hamwi) / 4;

  // Healthy BMI range (18.5 - 24.9)
  const heightM = height / 100;
  const bmiRange = {
    min: 18.5 * heightM * heightM,
    max: 24.9 * heightM * heightM,
  };

  return {
    robinson,
    miller,
    devine,
    hamwi,
    average,
    bmiRange,
  };
}
