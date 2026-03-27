// Mortgage Calculator Logic
export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principalPaid: number;
  interestPaid: number;
  payoffDate: Date;
}

export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  loanTerm: number, // years
  interestRate: number,
  propertyTax: number = 0, // annual
  homeInsurance: number = 0, // annual
  pmi: number = 0 // monthly
): MortgageResult {
  const principal = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  // Calculate base mortgage payment (P&I)
  const monthlyPI =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Add property tax, insurance, and PMI
  const monthlyTax = propertyTax / 12;
  const monthlyInsurance = homeInsurance / 12;
  const monthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + pmi;

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = monthlyPI * numberOfPayments - principal;

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + numberOfPayments);

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    principalPaid: Math.round(principal * 100) / 100,
    interestPaid: Math.round(totalInterest * 100) / 100,
    payoffDate,
  };
}
