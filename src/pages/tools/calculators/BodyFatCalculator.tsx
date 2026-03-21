import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateBodyFatNavy } from '../../../utils/calculators/bodyFat';

export default function BodyFatCalculator() {
  const { t } = useTranslation();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('80');
  const [height, setHeight] = useState('180');
  const [neck, setNeck] = useState('38');
  const [waist, setWaist] = useState('90');
  const [hip, setHip] = useState('100');
  const [result, setResult] = useState<ReturnType<typeof calculateBodyFatNavy> | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);
    
    if (isNaN(w) || isNaN(h) || isNaN(n) || isNaN(wa)) return;
    
    const bodyFatResult = calculateBodyFatNavy(gender, w, h, n, wa, gender === 'female' ? hi : undefined);
    setResult(bodyFatResult);
  };

  return (
    <ToolLayout
      title={t('tools.bodyfatcalculator.name')}
      description={t('tools.bodyfatcalculator.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.gender')}
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as 'male' | 'female')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="male">{t('common.male')}</option>
            <option value="female">{t('common.female')}</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.weight')} (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.height')} (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.neck')} (cm)
            </label>
            <input
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.waist')} (cm)
            </label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {gender === 'female' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('common.hip')} (cm)
              </label>
              <input
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {t('common.calculate')}
        </button>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">{t('common.bodyFatPercentage')}</p>
              <p className="text-4xl font-bold text-blue-600">
                {result.bodyFatPercentage.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 mt-2">{result.category}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.fatMass')}</p>
                <p className="text-2xl font-bold text-red-600">
                  {result.fatMass.toFixed(1)} kg
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.leanMass')}</p>
                <p className="text-2xl font-bold text-green-600">
                  {result.leanMass.toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
