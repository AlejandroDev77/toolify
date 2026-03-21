import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateBreakEven } from '../../../utils/calculators/breakEven';

export default function BreakEvenCalculator() {
  const { t } = useTranslation();
  const [fixedCosts, setFixedCosts] = useState('10000');
  const [pricePerUnit, setPricePerUnit] = useState('50');
  const [variableCost, setVariableCost] = useState('30');
  const [targetUnits, setTargetUnits] = useState('1000');
  const [result, setResult] = useState<ReturnType<typeof calculateBreakEven> | null>(null);

  const handleCalculate = () => {
    const fixed = parseFloat(fixedCosts);
    const price = parseFloat(pricePerUnit);
    const variable = parseFloat(variableCost);
    const target = parseFloat(targetUnits);
    
    if (isNaN(fixed) || isNaN(price) || isNaN(variable)) return;
    
    const breakEvenResult = calculateBreakEven(
      fixed,
      price,
      variable,
      !isNaN(target) && target > 0 ? target : undefined
    );
    setResult(breakEvenResult);
  };

  return (
    <ToolLayout
      title={t('tools.breakevencalculator.name')}
      description={t('tools.breakevencalculator.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.fixedCosts')}
          </label>
          <input
            type="number"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.pricePerUnit')}
            </label>
            <input
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.variableCostPerUnit')}
            </label>
            <input
              type="number"
              value={variableCost}
              onChange={(e) => setVariableCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.targetUnits')} ({t('common.optional')})
          </label>
          <input
            type="number"
            value={targetUnits}
            onChange={(e) => setTargetUnits(e.target.value)}
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
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.breakEvenUnits')}</p>
                <p className="text-2xl font-bold text-red-600">
                  {Math.ceil(result.breakEvenUnits).toLocaleString()} {t('common.units')}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('common.breakEvenRevenue')}</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${result.breakEvenRevenue.toLocaleString()}
                </p>
              </div>

              {result.profitAtTarget !== undefined && (
                <>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">{t('common.profitAtTarget')}</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${result.profitAtTarget.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">{t('common.marginOfSafety')}</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {result.marginOfSafety?.toFixed(2)}%
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
