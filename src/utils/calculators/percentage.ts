// Percentage Calculator Logic

export function calculatePercentageOf(value: number, percentage: number): number {
  return (value * percentage) / 100;
}

export function calculateWhatPercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

export function calculatePercentageChange(oldValue: number, newValue: number): {
  change: number;
  isIncrease: boolean;
} {
  if (oldValue === 0) return { change: 0, isIncrease: false };
  const change = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  return {
    change: Math.abs(change),
    isIncrease: change >= 0,
  };
}

export function calculatePercentageIncrease(value: number, percentage: number): number {
  return value + (value * percentage) / 100;
}

export function calculatePercentageDecrease(value: number, percentage: number): number {
  return value - (value * percentage) / 100;
}
