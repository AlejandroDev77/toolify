import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Fuel, Navigation } from 'lucide-react';
import { calculateFuelCost } from '../../../utils/calculators/fuel';

export default function FuelCalculator() {
  const { t } = useTranslation();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateFuelCost> | null>(null);

  const handleCalculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(fuelEfficiency);
    const p = parseFloat(fuelPrice);
    
    if (isNaN(d) || isNaN(e) || isNaN(p) || d <= 0 || e <= 0 || p <= 0) return;
    
    const fuelResult = calculateFuelCost(d, e, p, unit);
    setResult(fuelResult);
  };

  return (
    <>
      <SEO
        title={t('tools.fuelcalculator.name')}
        description={t('tools.fuelcalculator.description')}
        keywords="fuel calculator, gas calculator, trip cost, combustible"
      />
      <ToolLayout
        title={t('tools.fuelcalculator.name')}
        description={t('tools.fuelcalculator.description')}
        icon={Fuel}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setUnit('metric')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  unit === 'metric'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Métrico (km, L)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  unit === 'imperial'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Imperial (mi, gal)
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.distance')} {unit === 'metric' ? '(km)' : '(millas)'}
                </label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder={unit === 'metric' ? '500' : '310'}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Eficiencia {unit === 'metric' ? '(km/L)' : '(mpg)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={fuelEfficiency}
                  onChange={(e) => setFuelEfficiency(e.target.value)}
                  placeholder={unit === 'metric' ? '12.5' : '30'}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.fuelPrice')} {unit === 'metric' ? '($/L)' : '($/gal)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                  placeholder={unit === 'metric' ? '1.50' : '3.50'}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Calcular Costo
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-orange-500 to-red-500 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8 text-center">
                  <Navigation className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                  <div className="text-sm font-semibold text-gray-600 mb-2">Costo Total del Viaje</div>
                  <div className="text-6xl font-black text-gray-900 mb-6">
                    ${result.totalCost}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">
                        Combustible Necesario
                      </div>
                      <div className="text-2xl font-black text-orange-600">
                        {result.fuelNeeded} {unit === 'metric' ? 'L' : 'gal'}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">
                        Costo por {unit === 'metric' ? 'km' : 'mi'}
                      </div>
                      <div className="text-2xl font-black text-gray-900">
                        ${unit === 'metric' ? result.costPerKm : result.costPerMile}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
