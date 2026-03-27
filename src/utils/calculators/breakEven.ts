// Break Even Calculator Utilities

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  profitAtTarget?: number;
  marginOfSafety?: number;
}

export function calculateBreakEven(
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number,
  targetUnits?: number
): BreakEvenResult {
  const contributionMargin = pricePerUnit - variableCostPerUnit;
  const breakEvenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : 0;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;

  let profitAtTarget: number | undefined;
  let marginOfSafety: number | undefined;

  if (targetUnits) {
    const totalRevenue = targetUnits * pricePerUnit;
    const totalVariableCosts = targetUnits * variableCostPerUnit;
    profitAtTarget = totalRevenue - totalVariableCosts - fixedCosts;
    marginOfSafety = targetUnits > breakEvenUnits 
      ? ((targetUnits - breakEvenUnits) / targetUnits) * 100 
      : 0;
  }

  return {
    breakEvenUnits,
    breakEvenRevenue,
    profitAtTarget,
    marginOfSafety,
  };
}
