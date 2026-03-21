// Investment/Compound Interest Calculator Logic
export interface InvestmentResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    balance: number;
    contributions: number;
    interest: number;
  }>;
}

export function calculateInvestment(
  initialAmount: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): InvestmentResult {
  const periods = years * 12; // Total months
  let balance = initialAmount;
  const yearlyBreakdown = [];
  
  let totalContributions = initialAmount;
  const monthlyRate = annualRate / 100 / 12;

  for (let month = 1; month <= periods; month++) {
    // Add monthly contribution
    balance += monthlyContribution;
    totalContributions += monthlyContribution;
    
    // Apply interest
    balance += balance * monthlyRate;

    // Record yearly breakdown
    if (month % 12 === 0) {
      const year = month / 12;
      yearlyBreakdown.push({
        year,
        balance: Math.round(balance * 100) / 100,
        contributions: Math.round(totalContributions * 100) / 100,
        interest: Math.round((balance - totalContributions) * 100) / 100,
      });
    }
  }

  const futureValue = balance;
  const totalInterest = futureValue - totalContributions;

  return {
    futureValue: Math.round(futureValue * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    yearlyBreakdown,
  };
}
