// Salary Calculator Logic
export interface SalaryBreakdown {
  annual: number;
  monthly: number;
  biweekly: number;
  weekly: number;
  daily: number;
  hourly: number;
}

export function calculateSalary(
  amount: number,
  period: 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual',
  hoursPerWeek: number = 40
): SalaryBreakdown {
  let hourlyRate: number;

  // Convert everything to hourly rate first
  switch (period) {
    case 'hourly':
      hourlyRate = amount;
      break;
    case 'daily':
      hourlyRate = amount / 8; // Assuming 8-hour workday
      break;
    case 'weekly':
      hourlyRate = amount / hoursPerWeek;
      break;
    case 'biweekly':
      hourlyRate = amount / (hoursPerWeek * 2);
      break;
    case 'monthly':
      hourlyRate = amount / (hoursPerWeek * 52 / 12);
      break;
    case 'annual':
      hourlyRate = amount / (hoursPerWeek * 52);
      break;
  }

  const daily = hourlyRate * 8;
  const weekly = hourlyRate * hoursPerWeek;
  const biweekly = weekly * 2;
  const monthly = (hourlyRate * hoursPerWeek * 52) / 12;
  const annual = hourlyRate * hoursPerWeek * 52;

  return {
    hourly: Math.round(hourlyRate * 100) / 100,
    daily: Math.round(daily * 100) / 100,
    weekly: Math.round(weekly * 100) / 100,
    biweekly: Math.round(biweekly * 100) / 100,
    monthly: Math.round(monthly * 100) / 100,
    annual: Math.round(annual * 100) / 100,
  };
}
