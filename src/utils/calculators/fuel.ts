// Fuel/Gas Calculator Logic
export interface FuelResult {
  totalCost: number;
  fuelNeeded: number;
  costPerKm: number;
  costPerMile: number;
}

export function calculateFuelCost(
  distance: number,
  fuelEfficiency: number, // km/L or mpg
  fuelPrice: number,
  unit: 'metric' | 'imperial' = 'metric'
): FuelResult {
  const fuelNeeded = distance / fuelEfficiency;
  const totalCost = fuelNeeded * fuelPrice;
  const costPerKm = unit === 'metric' ? totalCost / distance : (totalCost / distance) * 1.60934;
  const costPerMile = unit === 'imperial' ? totalCost / distance : (totalCost / distance) / 1.60934;

  return {
    totalCost: Math.round(totalCost * 100) / 100,
    fuelNeeded: Math.round(fuelNeeded * 100) / 100,
    costPerKm: Math.round(costPerKm * 100) / 100,
    costPerMile: Math.round(costPerMile * 100) / 100,
  };
}

export function calculateFuelEfficiency(
  distance: number,
  fuelUsed: number
): number {
  // Returns km/L for metric or mpg for imperial
  const efficiency = distance / fuelUsed;
  return Math.round(efficiency * 100) / 100;
}
