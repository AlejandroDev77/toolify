// Profit Margin Calculator Utilities

export interface ProfitMarginResult {
  revenue: number;
  cost: number;
  profit: number;
  profitMargin: number;
  markup: number;
}

export function calculateProfitMargin(revenue: number, cost: number): ProfitMarginResult {
  const profit = revenue - cost;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const markup = cost > 0 ? (profit / cost) * 100 : 0;

  return {
    revenue,
    cost,
    profit,
    profitMargin,
    markup,
  };
}

export function calculateRevenueFromMargin(cost: number, marginPercent: number): number {
  return cost / (1 - marginPercent / 100);
}

export function calculateCostFromMargin(revenue: number, marginPercent: number): number {
  return revenue * (1 - marginPercent / 100);
}
