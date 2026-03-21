// Tax Calculator Utilities

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  netIncome: number;
  breakdown: { bracket: string; tax: number }[];
}

// US Federal Tax Brackets 2024 (Single)
export const US_TAX_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: null, rate: 0.37 },
];

export function calculateTax(
  income: number,
  deductions: number = 0,
  brackets: TaxBracket[] = US_TAX_BRACKETS_SINGLE
): TaxResult {
  const taxableIncome = Math.max(0, income - deductions);
  let totalTax = 0;
  const breakdown: { bracket: string; tax: number }[] = [];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const bracketMin = bracket.min;
    const bracketMax = bracket.max || Infinity;

    if (taxableIncome > bracketMin) {
      const taxableInBracket = Math.min(taxableIncome, bracketMax) - bracketMin;
      const taxInBracket = taxableInBracket * bracket.rate;
      
      if (taxInBracket > 0) {
        totalTax += taxInBracket;
        breakdown.push({
          bracket: `${(bracket.rate * 100).toFixed(0)}% (${bracketMin.toLocaleString()} - ${bracketMax === Infinity ? '∞' : bracketMax.toLocaleString()})`,
          tax: taxInBracket,
        });
      }
    }
  }

  const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
  const netIncome = income - totalTax;

  return {
    grossIncome: income,
    taxableIncome,
    totalTax,
    effectiveRate,
    netIncome,
    breakdown,
  };
}
