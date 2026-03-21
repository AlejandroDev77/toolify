// Tip Calculator Logic
export interface TipResult {
  tipAmount: number;
  totalPerPerson: number;
  tipPerPerson: number;
  totalWithTip: number;
}

export function calculateTip(
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number = 1
): TipResult {
  const tipAmount = (billAmount * tipPercentage) / 100;
  const totalWithTip = billAmount + tipAmount;
  const totalPerPerson = totalWithTip / numberOfPeople;
  const tipPerPerson = tipAmount / numberOfPeople;

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalWithTip: Math.round(totalWithTip * 100) / 100,
    totalPerPerson: Math.round(totalPerPerson * 100) / 100,
    tipPerPerson: Math.round(tipPerPerson * 100) / 100,
  };
}
