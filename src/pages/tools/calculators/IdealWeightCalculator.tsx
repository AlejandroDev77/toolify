import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateIdealWeight } from '../../../utils/calculators/idealWeight';

export default function IdealWeightCalculator() {
  const { t } = useTranslation();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('175');
  const [result, setResult] = useState<ReturnType<typeof calculateIdealWeight> | null>(null);

  const handleCalculate = () => {
    const h = parseFloat(height);
    if (isNaN(h) || h < 100 || h > 250) return;
    const idealWeight = calculateIdealWeight(gender, h);
    setResult(idealWeight);
  };

  return (
    <ToolLayout title={t('tools.idealweightcalculator.name')} description={t('tools.idealweightcalculator.description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.gender')}</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="male">{t('common.male')}</option>
            <option value="female">{t('common.female')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.height')} (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.calculate')}</button>
        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <p className="text-sm text-gray-600 mb-2">{t('common.averageIdealWeight')}</p>
              <p className="text-4xl font-bold text-green-600">{result.average.toFixed(1)} kg</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm text-gray-600">Robinson</p><p className="text-2xl font-bold text-blue-600">{result.robinson.toFixed(1)} kg</p></div>
              <div className="bg-purple-50 p-4 rounded-lg"><p className="text-sm text-gray-600">Miller</p><p className="text-2xl font-bold text-purple-600">{result.miller.toFixed(1)} kg</p></div>
              <div className="bg-pink-50 p-4 rounded-lg"><p className="text-sm text-gray-600">Devine</p><p className="text-2xl font-bold text-pink-600">{result.devine.toFixed(1)} kg</p></div>
              <div className="bg-orange-50 p-4 rounded-lg"><p className="text-sm text-gray-600">Hamwi</p><p className="text-2xl font-bold text-orange-600">{result.hamwi.toFixed(1)} kg</p></div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">{t('common.healthyBMIRange')}</p>
              <p className="text-lg font-semibold">{result.bmiRange.min.toFixed(1)} - {result.bmiRange.max.toFixed(1)} kg</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
