import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Calculator, Activity } from 'lucide-react';
import { calculateBMI } from '../../../utils/calculators/bmi';

export default function BMICalculator() {
  const { t } = useTranslation();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateBMI> | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;
    
    const bmiResult = calculateBMI(w, h, unit);
    setResult(bmiResult);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'underweight': return 'from-blue-500 to-cyan-500';
      case 'normal': return 'from-green-500 to-emerald-500';
      case 'overweight': return 'from-orange-500 to-yellow-500';
      case 'obese': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <>
      <SEO
        title={t('tools.bmicalculator.name')}
        description={t('tools.bmicalculator.description')}
        keywords="BMI calculator, body mass index, health calculator"
      />
      <ToolLayout
        title={t('tools.bmicalculator.name')}
        description={t('tools.bmicalculator.description')}
        icon={Calculator}
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
                Métrico (kg, m)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  unit === 'imperial'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Imperial (lb, in)
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Peso {unit === 'metric' ? '(kg)' : '(lb)'}
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  placeholder={unit === 'metric' ? '70' : '154'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Altura {unit === 'metric' ? '(m)' : '(in)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  placeholder={unit === 'metric' ? '1.75' : '69'}
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Calcular IMC
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`bg-linear-to-br ${getCategoryColor(result.category)} rounded-3xl p-1 shadow-2xl`}>
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8 text-center">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                  <div className="text-6xl font-black mb-2 text-gray-900">{result.bmi}</div>
                  <div className="text-2xl font-bold text-gray-700 mb-4">{result.categoryLabel}</div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 mt-6">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Rango de peso saludable</p>
                    <div className="flex items-center justify-center gap-3 text-lg font-bold text-gray-800">
                      <span>{result.healthyWeightRange.min}</span>
                      <span className="text-gray-400">-</span>
                      <span>{result.healthyWeightRange.max}</span>
                      <span className="text-sm text-gray-500">{unit === 'metric' ? 'kg' : 'lb'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Bajo peso', range: '< 18.5', color: 'bg-blue-100 text-blue-700' },
                  { label: 'Normal', range: '18.5 - 24.9', color: 'bg-green-100 text-green-700' },
                  { label: 'Sobrepeso', range: '25 - 29.9', color: 'bg-orange-100 text-orange-700' },
                  { label: 'Obesidad', range: '≥ 30', color: 'bg-red-100 text-red-700' },
                ].map((item) => (
                  <div key={item.label} className={`${item.color} rounded-2xl p-4 text-center`}>
                    <div className="font-bold text-sm mb-1">{item.label}</div>
                    <div className="text-xs font-semibold opacity-75">{item.range}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
