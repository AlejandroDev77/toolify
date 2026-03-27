// Random Number Generator Logic
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMultipleRandomNumbers(
  count: number,
  min: number,
  max: number,
  unique: boolean = false
): number[] {
  const numbers: number[] = [];
  
  if (unique && (max - min + 1) < count) {
    throw new Error('Cannot generate unique numbers: range too small');
  }

  while (numbers.length < count) {
    const num = generateRandomNumber(min, max);
    if (!unique || !numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers;
}
