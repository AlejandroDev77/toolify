import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateWaterIntake } from '../../../utils/calculators/waterIntake';

export default function WaterIntakeCalculator() {
  const { t } = useTranslation();
  const [weight, setWeight] = useState('70');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'>('moderate');
  const [climate, setClimate] = useState<'cold' | 'moderate' | 'hot'>('moderate');
  const [result, setResult] = useState<ReturnType<typeof calculateWaterIntake> | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w < 20 || w > 300) return;
    const waterIntake = calculateWaterIntake(w, activity, climate);
    setResult(waterIntake);
  };

  return (
    <ToolLayout title={t('tools.waterintakecalculator.name')} description={t('tools.waterintakecalculator.description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.weight')} (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.activityLevel')}</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value as any)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="sedentary">{t('common.sedentary')}</option>
            <option value="light">{t('common.light')}</option>
            <option value="moderate">{t('common.moderate')}</option>
            <option value="active">{t('common.active')}</option>
            <option value="veryActive">{t('common.veryActive')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.climate')}</label>
          <select value={climate} onChange={(e) => setClimate(e.target.value as any)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="cold">{t('common.cold')}</option>
            <option value="moderate">{t('common.moderate')}</option>
            <option value="hot">{t('common.hot')}</option>
          </select>
        </div>
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.calculate')}</button>
        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">{t('common.dailyWaterIntake')}</p>
              <p className="text-4xl font-bold text-blue-600">{result.dailyIntake} L</p>
              <p className="text-lg text-gray-600 mt-2">{result.glasses} {t('common.glasses')} (250ml)</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-green-800">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
