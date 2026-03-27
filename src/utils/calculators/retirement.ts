// Retirement Calculator Utilities

export interface RetirementResult {
  totalSavings: number;
  totalContributions: number;
  totalInterest: number;
  monthlyIncome: number;
  yearsOfIncome: number;
}

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  lifeExpectancy: number = 85
): RetirementResult {
  const yearsToRetirement = retirementAge - currentAge;
  const monthlyRate = annualReturn / 100 / 12;
  const months = yearsToRetirement * 12;

  // Future value of current savings
  const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);

  // Future value of monthly contributions
  const futureValueContributions = monthlyContribution * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  const totalSavings = futureValueCurrent + futureValueContributions;
  const totalContributions = currentSavings + (monthlyContribution * months);
  const totalInterest = totalSavings - totalContributions;

  const yearsInRetirement = lifeExpectancy - retirementAge;
  
  // Monthly income assuming 4% withdrawal rate
  const monthlyIncome = (totalSavings * 0.04) / 12;

  return {
    totalSavings,
    totalContributions,
    totalInterest,
    monthlyIncome,
    yearsOfIncome: yearsInRetirement,
  };
}
