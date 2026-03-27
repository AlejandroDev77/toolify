import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateMacros, type MacroSplit } from '../../../utils/calculators/macros';

export default function MacroCalculator() {
  const { t } = useTranslation();
  const [calories, setCalories] = useState('2000');
  const [split, setSplit] = useState<MacroSplit>('balanced');
  const [result, setResult] = useState<ReturnType<typeof calculateMacros> | null>(null);

  const handleCalculate = () => {
    const cal = parseFloat(calories);
    if (isNaN(cal) || cal < 500 || cal > 10000) return;
    const macros = calculateMacros(cal, split);
    setResult(macros);
  };

  return (
    <ToolLayout title={t('tools.macrocalculator.name')} description={t('tools.macrocalculator.description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.dailyCalories')}</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.macroSplit')}</label>
          <select value={split} onChange={(e) => setSplit(e.target.value as MacroSplit)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="balanced">{t('common.balanced')} (30/40/30)</option>
            <option value="lowCarb">{t('common.lowCarb')} (30/30/40)</option>
            <option value="highProtein">{t('common.highProtein')} (40/30/30)</option>
            <option value="keto">{t('common.keto')} (25/5/70)</option>
          </select>
        </div>
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.calculate')}</button>
        {result && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('common.protein')}</p>
              <p className="text-3xl font-bold text-red-600">{result.protein.toFixed(0)}g</p>
              <p className="text-xs text-gray-500">{result.proteinCalories.toFixed(0)} cal</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('common.carbs')}</p>
              <p className="text-3xl font-bold text-blue-600">{result.carbs.toFixed(0)}g</p>
              <p className="text-xs text-gray-500">{result.carbsCalories.toFixed(0)} cal</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('common.fat')}</p>
              <p className="text-3xl font-bold text-yellow-600">{result.fat.toFixed(0)}g</p>
              <p className="text-xs text-gray-500">{result.fatCalories.toFixed(0)} cal</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
