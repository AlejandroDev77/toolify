import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { CreditCard, TrendingUp } from 'lucide-react';
import { calculateLoan } from '../../../utils/calculators/loan';

export default function LoanCalculator() {
  const { t } = useTranslation();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateLoan> | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    
    if (isNaN(p) || isNaN(r) || isNaN(y) || p <= 0 || r < 0 || y <= 0) return;
    
    const loanResult = calculateLoan(p, r, y);
    setResult(loanResult);
    setShowSchedule(false);
  };

  return (
    <>
      <SEO
        title={t('tools.loancalculator.name')}
        description={t('tools.loancalculator.description')}
        keywords="loan calculator, mortgage calculator, payment calculator"
      />
      <ToolLayout
        title={t('tools.loancalculator.name')}
        description={t('tools.loancalculator.description')}
        icon={CreditCard}
      >
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.loanAmount')}
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="10000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.annualInterestRate')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="5.5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.term')}
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Calcular Préstamo
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8">
                  <div className="text-center mb-6">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                    <div className="text-sm font-semibold text-gray-600 mb-2">{t('common.monthlyPayment')}</div>
                    <div className="text-6xl font-black text-gray-900">
                      ${result.monthlyPayment.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Pago Total</div>
                      <div className="text-3xl font-black text-gray-900">
                        ${result.totalPayment.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="text-sm font-semibold text-gray-600 mb-2">{t('common.totalInterestPaid')}</div>
                      <div className="text-3xl font-black text-red-600">
                        ${result.totalInterest.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                {showSchedule ? 'Ocultar' : 'Ver'} Tabla de Amortización
              </button>

              {showSchedule && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Mes</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Pago</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Principal</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Interés</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {result.schedule.map((row) => (
                          <tr key={row.month} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.month}</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-700">${row.payment}</td>
                            <td className="px-4 py-3 text-sm text-right text-green-600">${row.principal}</td>
                            <td className="px-4 py-3 text-sm text-right text-red-600">${row.interest}</td>
                            <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">${row.balance}</td>
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
