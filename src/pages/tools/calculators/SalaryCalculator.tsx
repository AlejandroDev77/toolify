import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Briefcase } from 'lucide-react';
import { calculateSalary } from '../../../utils/calculators/salary';

export default function SalaryCalculator() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual'>('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [result, setResult] = useState<ReturnType<typeof calculateSalary> | null>(null);

  const handleCalculate = () => {
    const amt = parseFloat(amount);
    const hours = parseFloat(hoursPerWeek);
    
    if (isNaN(amt) || isNaN(hours) || amt <= 0 || hours <= 0) return;
    
    const salaryResult = calculateSalary(amt, period, hours);
    setResult(salaryResult);
  };

  const periods = [
    { id: 'hourly', label: 'Por Hora' },
    { id: 'daily', label: 'Diario' },
    { id: 'weekly', label: 'Semanal' },
    { id: 'biweekly', label: 'Quincenal' },
    { id: 'monthly', label: 'Mensual' },
    { id: 'annual', label: 'Anual' },
  ] as const;

  return (
    <>
      <SEO
        title={t('tools.salarycalculator.name')}
        description={t('tools.salarycalculator.description')}
        keywords="salary calculator, wage converter, salario, sueldo"
      />
      <ToolLayout
        title={t('tools.salarycalculator.name')}
        description={t('tools.salarycalculator.description')}
        icon={Briefcase}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Período de Pago
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {periods.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPeriod(p.id)}
                      className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                        period === p.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.amount')} ($)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="50000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.hoursPerWeek')}
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  placeholder="40"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                {t('common.calculateSalary')}
              </button>
            </div>
          </div>

          {result && (
            <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { label: 'Anual', value: result.annual, color: 'from-blue-500 to-indigo-500' },
                { label: 'Mensual', value: result.monthly, color: 'from-green-500 to-emerald-500' },
                { label: 'Quincenal', value: result.biweekly, color: 'from-purple-500 to-pink-500' },
                { label: 'Semanal', value: result.weekly, color: 'from-orange-500 to-red-500' },
                { label: 'Diario', value: result.daily, color: 'from-cyan-500 to-blue-500' },
                { label: 'Por Hora', value: result.hourly, color: 'from-yellow-500 to-orange-500' },
              ].map((item) => (
                <div key={item.label} className={`bg-linear-to-br ${item.color} rounded-2xl p-1 shadow-lg`}>
                  <div className="bg-white/95 backdrop-blur-md rounded-[1.2rem] p-6 text-center">
                    <div className="text-sm font-semibold text-gray-600 mb-2">{item.label}</div>
                    <div className="text-3xl font-black text-gray-900">
                      ${item.value.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
