import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateProfitMargin } from '../../../utils/calculators/profitMargin';

export default function ProfitMarginCalculator() {
  const { t } = useTranslation();
  const [revenue, setRevenue] = useState('1000');
  const [cost, setCost] = useState('600');
  const [result, setResult] = useState<ReturnType<typeof calculateProfitMargin> | null>(null);

  const handleCalculate = () => {
    const rev = parseFloat(revenue);
    const cst = parseFloat(cost);
    
    if (isNaN(rev) || isNaN(cst) || rev < 0 || cst < 0) return;
    
    const marginResult = calculateProfitMargin(rev, cst);
    setResult(marginResult);
  };

  return (
    <ToolLayout
      title={t('tools.profitmargincalculator.name')}
      description={t('tools.profitmargincalculator.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.revenue')}
          </label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.cost')}
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
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
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('common.profit')}</p>
              <p className="text-2xl font-bold text-green-600">
                ${result.profit.toLocaleString()}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('common.profitMargin')}</p>
              <p className="text-2xl font-bold text-blue-600">
                {result.profitMargin.toFixed(2)}%
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('common.markup')}</p>
              <p className="text-2xl font-bold text-purple-600">
                {result.markup.toFixed(2)}%
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{t('common.revenue')}</p>
              <p className="text-2xl font-bold text-gray-600">
                ${result.revenue.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
