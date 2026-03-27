import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Home, TrendingUp } from 'lucide-react';
import { calculateMortgage } from '../../../utils/calculators/mortgage';

export default function MortgageCalculator() {
  const { t } = useTranslation();
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('');
  const [propertyTax, setPropertyTax] = useState('');
  const [homeInsurance, setHomeInsurance] = useState('');
  const [pmi, setPmi] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateMortgage> | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const term = parseFloat(loanTerm);
    const rate = parseFloat(interestRate);
    const tax = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const pmiAmount = parseFloat(pmi) || 0;
    
    if (isNaN(price) || isNaN(term) || isNaN(rate) || price <= 0 || term <= 0 || rate < 0) return;
    
    const mortgageResult = calculateMortgage(price, down, term, rate, tax, insurance, pmiAmount);
    setResult(mortgageResult);
  };

  return (
    <>
      <SEO
        title={t('tools.mortgagecalculator.name')}
        description={t('tools.mortgagecalculator.description')}
        keywords="mortgage calculator, home loan, hipoteca, préstamo vivienda"
      />
      <ToolLayout
        title={t('tools.mortgagecalculator.name')}
        description={t('tools.mortgagecalculator.description')}
        icon={Home}
      >
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('common.homePrice')}
                  </label>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    placeholder="300000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enganche ($)
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    placeholder="60000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('common.term')}
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg bg-white"
                  >
                    <option value="15">15 {t('common.years')}</option>
                    <option value="20">20 {t('common.years')}</option>
                    <option value="30">30 {t('common.years')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('common.interestRate')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="3.5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Opcionales</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">
                      Impuesto Anual ($)
                    </label>
                    <input
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      placeholder="3000"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">
                      Seguro Anual ($)
                    </label>
                    <input
                      type="number"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(e.target.value)}
                      placeholder="1200"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">
                      PMI Mensual ($)
                    </label>
                    <input
                      type="number"
                      value={pmi}
                      onChange={(e) => setPmi(e.target.value)}
                      placeholder="100"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Calcular Hipoteca
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8">
                  <div className="text-center mb-6">
                    <Home className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                    <div className="text-sm font-semibold text-gray-600 mb-2">{t('common.monthlyPayment')}</div>
                    <div className="text-6xl font-black text-gray-900">
                      ${result.monthlyPayment.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-2">Pago Total</div>
                      <div className="text-2xl font-black text-gray-900">
                        ${result.totalPayment.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-2">{t('common.totalInterestPaid')}</div>
                      <div className="text-2xl font-black text-red-600">
                        ${result.totalInterest.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-2">Fecha Final</div>
                      <div className="text-lg font-black text-gray-900">
                        {result.payoffDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Desglose del Préstamo</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Principal</span>
                    <span className="text-lg font-black text-gray-900">
                      ${result.principalPaid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                    <span className="font-semibold text-red-700">Interés Pagado</span>
                    <span className="text-lg font-black text-red-700">
                      ${result.interestPaid.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
