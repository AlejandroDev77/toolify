// Currency Converter Utilities (Fixed rates - for demo)

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to USD
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 149.50 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.36 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', rate: 0.88 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.12 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', rate: 17.08 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 4.97 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 18.65 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', rate: 91.50 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', rate: 1342.50 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.34 },
];

export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string
): number {
  const fromCurrency = CURRENCIES.find(c => c.code === fromCode);
  const toCurrency = CURRENCIES.find(c => c.code === toCode);

  if (!fromCurrency || !toCurrency) return 0;

  // Convert to USD first, then to target currency
  const amountInUSD = amount / fromCurrency.rate;
  return amountInUSD * toCurrency.rate;
}
