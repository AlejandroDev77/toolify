import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Users, DollarSign } from 'lucide-react';
import { calculateTip } from '../../../utils/calculators/tip';

export default function TipCalculator() {
  const { t } = useTranslation();
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [result, setResult] = useState<ReturnType<typeof calculateTip> | null>(null);

  const handleCalculate = () => {
    const bill = parseFloat(billAmount);
    if (isNaN(bill) || bill <= 0) return;
    
    const tipResult = calculateTip(bill, tipPercentage, numberOfPeople);
    setResult(tipResult);
  };

  const quickTips = [10, 15, 18, 20, 25];

  return (
    <>
      <SEO
        title={t('tools.tipcalculator.name')}
        description={t('tools.tipcalculator.description')}
        keywords="tip calculator, propina, split bill, dividir cuenta"
      />
      <ToolLayout
        title={t('tools.tipcalculator.name')}
        description={t('tools.tipcalculator.description')}
        icon={DollarSign}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.billAmount')}
                </label>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="100.00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('common.tipPercentage')}: {tipPercentage}%
                </label>
                <div className="flex gap-2 mb-4">
                  {quickTips.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => setTipPercentage(tip)}
                      className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all ${
                        tipPercentage === tip
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={tipPercentage}
                  onChange={(e) => setTipPercentage(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.numberOfPeople')}
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl transition-colors"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-4xl font-black text-gray-900">{numberOfPeople}</div>
                  </div>
                  <button
                    onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                {t('common.calculateTip')}
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-green-500 to-emerald-500 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                  <div className="text-sm font-semibold text-gray-600 mb-2">Total por Persona</div>
                  <div className="text-6xl font-black text-gray-900 mb-6">
                    ${result.totalPerPerson}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">{t('common.totalTip')}</div>
                      <div className="text-3xl font-black text-green-600">${result.tipAmount}</div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">{t('common.totalWithTip')}</div>
                      <div className="text-3xl font-black text-gray-900">${result.totalWithTip}</div>
                    </div>
                  </div>
                </div>
              </div>

              {numberOfPeople > 1 && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                  <div className="text-sm font-semibold text-blue-600 mb-2">{t('common.tipPerPerson')}</div>
                  <div className="text-3xl font-black text-blue-900">${result.tipPerPerson}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
