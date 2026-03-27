import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { TrendingUp, DollarSign } from 'lucide-react';
import { calculateInvestment } from '../../../utils/calculators/investment';

export default function InvestmentCalculator() {
  const { t } = useTranslation();
  const [initialAmount, setInitialAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateInvestment> | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleCalculate = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualRate);
    const y = parseFloat(years);
    
    if (isNaN(rate) || isNaN(y) || y <= 0 || rate < 0) return;
    if (initial === 0 && monthly === 0) return;
    
    const investmentResult = calculateInvestment(initial, monthly, rate, y);
    setResult(investmentResult);
    setShowBreakdown(false);
  };

  return (
    <>
      <SEO
        title={t('tools.investmentcalculator.name')}
        description={t('tools.investmentcalculator.description')}
        keywords="investment calculator, compound interest, inversión, interés compuesto"
      />
      <ToolLayout
        title={t('tools.investmentcalculator.name')}
        description={t('tools.investmentcalculator.description')}
        icon={TrendingUp}
      >
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('common.initialInvestmentLabel')}
                  </label>
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(e.target.value)}
                    placeholder="10000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('common.monthlyContributionLabel')}
                  </label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    placeholder="500"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('common.annualReturnRate')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    placeholder="7"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('common.yearsOfInvestment')}
                  </label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="20"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30"
              >
                {t('common.calculateInvestment')}
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8">
                  <div className="text-center mb-6">
                    <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                    <div className="text-sm font-semibold text-gray-600 mb-2">{t('common.futureValue')}</div>
                    <div className="text-6xl font-black text-gray-900 mb-6">
                      ${result.futureValue.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                      <div className="text-sm font-semibold text-blue-600 mb-2">Contribuciones Totales</div>
                      <div className="text-3xl font-black text-blue-900">
                        ${result.totalContributions.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                      <div className="text-sm font-semibold text-green-600 mb-2">Interés Ganado</div>
                      <div className="text-3xl font-black text-green-700">
                        ${result.totalInterest.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                {showBreakdown ? 'Ocultar' : 'Ver'} Desglose Anual
              </button>

              {showBreakdown && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Año</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Balance</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Contribuciones</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Interés</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {result.yearlyBreakdown.map((row) => (
                          <tr key={row.year} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.year}</td>
                            <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                              ${row.balance.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-blue-600">
                              ${row.contributions.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-green-600">
                              ${row.interest.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
