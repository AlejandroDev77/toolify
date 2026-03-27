// ROI Calculator Utilities

export interface ROIResult {
  roi: number;
  roiPercentage: number;
  netProfit: number;
  totalReturn: number;
  annualizedROI?: number;
}

export function calculateROI(
  initialInvestment: number,
  finalValue: number,
  timeYears?: number
): ROIResult {
  const netProfit = finalValue - initialInvestment;
  const roi = netProfit / initialInvestment;
  const roiPercentage = roi * 100;

  let annualizedROI: number | undefined;
  if (timeYears && timeYears > 0) {
    annualizedROI = (Math.pow(finalValue / initialInvestment, 1 / timeYears) - 1) * 100;
  }

  return {
    roi,
    roiPercentage,
    netProfit,
    totalReturn: finalValue,
    annualizedROI,
  };
}
