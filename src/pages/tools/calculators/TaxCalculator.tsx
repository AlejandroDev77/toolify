import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateTax } from '../../../utils/calculators/tax';

export default function TaxCalculator() {
  const { t } = useTranslation();
  const [income, setIncome] = useState('75000');
  const [deductions, setDeductions] = useState('13850');
  const [result, setResult] = useState<ReturnType<typeof calculateTax> | null>(null);

  const handleCalculate = () => {
    const inc = parseFloat(income);
    const ded = parseFloat(deductions);
    if (isNaN(inc) || isNaN(ded)) return;
    
    const taxResult = calculateTax(inc, ded);
    setResult(taxResult);
  };

  return (
    <ToolLayout
      title={t('tools.taxcalculator.name')}
      description={t('tools.taxcalculator.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.grossIncome')}
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="75000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.deductions')}
          </label>
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="13850"
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
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.taxableIncome')}</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${result.taxableIncome.toLocaleString()}
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.totalTax')}</p>
                <p className="text-2xl font-bold text-red-600">
                  ${result.totalTax.toLocaleString()}
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.effectiveRate')}</p>
                <p className="text-2xl font-bold text-purple-600">
                  {result.effectiveRate.toFixed(2)}%
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.netIncome')}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${result.netIncome.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">{t('common.taxBreakdown')}</h3>
              <div className="space-y-2">
                {result.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.bracket}</span>
                    <span className="font-medium">${item.tax.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
