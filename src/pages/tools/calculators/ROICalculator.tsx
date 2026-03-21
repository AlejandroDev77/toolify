import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateROI } from '../../../utils/calculators/roi';

export default function ROICalculator() {
  const { t } = useTranslation();
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [finalValue, setFinalValue] = useState('15000');
  const [timeYears, setTimeYears] = useState('3');
  const [result, setResult] = useState<ReturnType<typeof calculateROI> | null>(null);

  const handleCalculate = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const years = parseFloat(timeYears);
    
    if (isNaN(initial) || isNaN(final) || initial <= 0) return;
    
    const roiResult = calculateROI(initial, final, years > 0 ? years : undefined);
    setResult(roiResult);
  };

  return (
    <ToolLayout
      title={t('tools.roicalculator.name')}
      description={t('tools.roicalculator.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.initialInvestment')}
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.finalValue')}
          </label>
          <input
            type="number"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.timeYears')} ({t('common.optional')})
          </label>
          <input
            type="number"
            value={timeYears}
            onChange={(e) => setTimeYears(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {t('common.calculate')}
        </button>

        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <p className="text-sm text-gray-600 mb-2">{t('common.roi')}</p>
              <p className="text-4xl font-bold text-green-600">
                {result.roiPercentage.toFixed(2)}%
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.netProfit')}</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${result.netProfit.toLocaleString()}
                </p>
              </div>

              {result.annualizedROI && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">{t('common.annualizedROI')}</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {result.annualizedROI.toFixed(2)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
