// Unit Converter Logic

export type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed';

export interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export const units: Record<UnitCategory, Record<string, Unit>> = {
  length: {
    meter: {
      name: 'Metro',
      symbol: 'm',
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    kilometer: {
      name: 'Kilómetro',
      symbol: 'km',
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    centimeter: {
      name: 'Centímetro',
      symbol: 'cm',
      toBase: (v) => v / 100,
      fromBase: (v) => v * 100,
    },
    millimeter: {
      name: 'Milímetro',
      symbol: 'mm',
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    mile: {
      name: 'Milla',
      symbol: 'mi',
      toBase: (v) => v * 1609.344,
      fromBase: (v) => v / 1609.344,
    },
    yard: {
      name: 'Yarda',
      symbol: 'yd',
      toBase: (v) => v * 0.9144,
      fromBase: (v) => v / 0.9144,
    },
    foot: {
      name: 'Pie',
      symbol: 'ft',
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048,
    },
    inch: {
      name: 'Pulgada',
      symbol: 'in',
      toBase: (v) => v * 0.0254,
      fromBase: (v) => v / 0.0254,
    },
  },
  weight: {
    kilogram: {
      name: 'Kilogramo',
      symbol: 'kg',
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    gram: {
      name: 'Gramo',
      symbol: 'g',
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    milligram: {
      name: 'Miligramo',
      symbol: 'mg',
      toBase: (v) => v / 1000000,
      fromBase: (v) => v * 1000000,
    },
    ton: {
      name: 'Tonelada',
      symbol: 't',
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    pound: {
      name: 'Libra',
      symbol: 'lb',
      toBase: (v) => v * 0.453592,
      fromBase: (v) => v / 0.453592,
    },
    ounce: {
      name: 'Onza',
      symbol: 'oz',
      toBase: (v) => v * 0.0283495,
      fromBase: (v) => v / 0.0283495,
    },
  },
  temperature: {
    celsius: {
      name: 'Celsius',
      symbol: '°C',
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    fahrenheit: {
      name: 'Fahrenheit',
      symbol: '°F',
      toBase: (v) => (v - 32) * (5 / 9),
      fromBase: (v) => v * (9 / 5) + 32,
    },
    kelvin: {
      name: 'Kelvin',
      symbol: 'K',
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  volume: {
    liter: {
      name: 'Litro',
      symbol: 'L',
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    milliliter: {
      name: 'Mililitro',
      symbol: 'mL',
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    gallon: {
      name: 'Galón',
      symbol: 'gal',
      toBase: (v) => v * 3.78541,
      fromBase: (v) => v / 3.78541,
    },
    quart: {
      name: 'Cuarto',
      symbol: 'qt',
      toBase: (v) => v * 0.946353,
      fromBase: (v) => v / 0.946353,
    },
    pint: {
      name: 'Pinta',
      symbol: 'pt',
      toBase: (v) => v * 0.473176,
      fromBase: (v) => v / 0.473176,
    },
    cup: {
      name: 'Taza',
      symbol: 'cup',
      toBase: (v) => v * 0.236588,
      fromBase: (v) => v / 0.236588,
    },
  },
  area: {
    squareMeter: {
      name: 'Metro cuadrado',
      symbol: 'm²',
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    squareKilometer: {
      name: 'Kilómetro cuadrado',
      symbol: 'km²',
      toBase: (v) => v * 1000000,
      fromBase: (v) => v / 1000000,
    },
    hectare: {
      name: 'Hectárea',
      symbol: 'ha',
      toBase: (v) => v * 10000,
      fromBase: (v) => v / 10000,
    },
    squareMile: {
      name: 'Milla cuadrada',
      symbol: 'mi²',
      toBase: (v) => v * 2589988.11,
      fromBase: (v) => v / 2589988.11,
    },
    acre: {
      name: 'Acre',
      symbol: 'ac',
      toBase: (v) => v * 4046.86,
      fromBase: (v) => v / 4046.86,
    },
    squareFoot: {
      name: 'Pie cuadrado',
      symbol: 'ft²',
      toBase: (v) => v * 0.092903,
      fromBase: (v) => v / 0.092903,
    },
  },
  speed: {
    meterPerSecond: {
      name: 'Metro por segundo',
      symbol: 'm/s',
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    kilometerPerHour: {
      name: 'Kilómetro por hora',
      symbol: 'km/h',
      toBase: (v) => v / 3.6,
      fromBase: (v) => v * 3.6,
    },
    milePerHour: {
      name: 'Milla por hora',
      symbol: 'mph',
      toBase: (v) => v * 0.44704,
      fromBase: (v) => v / 0.44704,
    },
    knot: {
      name: 'Nudo',
      symbol: 'kn',
      toBase: (v) => v * 0.514444,
      fromBase: (v) => v / 0.514444,
    },
  },
};

export function convertUnit(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number {
  const categoryUnits = units[category];
  const from = categoryUnits[fromUnit];
  const to = categoryUnits[toUnit];

  if (!from || !to) {
    throw new Error('Invalid unit');
  }

  const baseValue = from.toBase(value);
  return to.fromBase(baseValue);
}
