import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Clock, Calendar, Gift } from 'lucide-react';
import { calculateAge } from '../../../utils/calculators/age';

export default function AgeCalculator() {
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    const date = new Date(birthDate);
    const ageResult = calculateAge(date);
    setResult(ageResult);
  };

  return (
    <>
      <SEO
        title={t('tools.agecalculator.name')}
        description={t('tools.agecalculator.description')}
        keywords="age calculator, calculate age, birthday calculator"
      />
      <ToolLayout
        title={t('tools.agecalculator.name')}
        description={t('tools.agecalculator.description')}
        icon={Clock}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.birthDate')}
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                {t('common.calculateAge')}
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                  <div className="text-6xl font-black mb-2 text-gray-900">{result.years}</div>
                  <div className="text-2xl font-bold text-gray-700 mb-6">{t('common.yearsOld')}</div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-3xl font-black text-gray-900">{result.months}</div>
                      <div className="text-sm font-semibold text-gray-600">{t('common.months')}</div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-3xl font-black text-gray-900">{result.days}</div>
                      <div className="text-sm font-semibold text-gray-600">{t('common.days')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <div className="text-sm font-semibold text-blue-600 mb-2">{t('common.totalDaysLived')}</div>
                  <div className="text-3xl font-black text-blue-900">{result.totalDays.toLocaleString()}</div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                  <div className="text-sm font-semibold text-green-600 mb-2">{t('common.totalMonths')}</div>
                  <div className="text-3xl font-black text-green-900">{result.totalMonths}</div>
                </div>
              </div>

              <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-3xl p-1 shadow-xl">
                <div className="bg-white/90 backdrop-blur-md rounded-[1.4rem] p-6 text-center">
                  <Gift className="w-10 h-10 mx-auto mb-3 text-orange-600" />
                  <div className="text-lg font-bold text-gray-800 mb-2">{t('common.nextBirthday')}</div>
                  <div className="text-3xl font-black text-gray-900 mb-1">{result.nextBirthday.daysUntil}</div>
                  <div className="text-sm font-semibold text-gray-600">{t('common.daysRemaining')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
