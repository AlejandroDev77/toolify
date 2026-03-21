import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Clock, Calendar } from 'lucide-react';
import { calculateTimeDifference } from '../../../utils/calculators/timeDifference';

export default function TimeDifference() {
  const { t } = useTranslation();
  const [date1, setDate1] = useState('');
  const [time1, setTime1] = useState('00:00');
  const [date2, setDate2] = useState('');
  const [time2, setTime2] = useState('00:00');
  const [result, setResult] = useState<ReturnType<typeof calculateTimeDifference> | null>(null);

  const handleCalculate = () => {
    if (!date1 || !date2) return;
    
    const d1 = new Date(`${date1}T${time1}`);
    const d2 = new Date(`${date2}T${time2}`);
    
    const timeDiff = calculateTimeDifference(d1, d2);
    setResult(timeDiff);
  };

  return (
    <>
      <SEO
        title={t('tools.timedifference.name')}
        description={t('tools.timedifference.description')}
        keywords="time difference calculator, date calculator, days between dates"
      />
      <ToolLayout
        title={t('tools.timedifference.name')}
        description={t('tools.timedifference.description')}
        icon={Clock}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Fecha y Hora Inicial</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={date1}
                    onChange={(e) => setDate1(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                  <input
                    type="time"
                    value={time1}
                    onChange={(e) => setTime1(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Fecha y Hora Final</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={date2}
                    onChange={(e) => setDate2(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                  <input
                    type="time"
                    value={time2}
                    onChange={(e) => setTime2(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Calcular Diferencia
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8">
                  <Calendar className="w-12 h-12 mx-auto mb-6 text-gray-700" />
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-gray-900">{result.years}</div>
                      <div className="text-sm font-semibold text-gray-600">{t('common.yearsOld')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-black text-gray-900">{result.months}</div>
                      <div className="text-sm font-semibold text-gray-600">{t('common.months')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-black text-gray-900">{result.days}</div>
                      <div className="text-sm font-semibold text-gray-600">{t('common.days')}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-black text-gray-900">{result.hours}</div>
                      <div className="text-xs font-semibold text-gray-600">{t('common.hours')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-gray-900">{result.minutes}</div>
                      <div className="text-xs font-semibold text-gray-600">{t('common.minutes')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-gray-900">{result.seconds}</div>
                      <div className="text-xs font-semibold text-gray-600">{t('common.seconds')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <div className="text-sm font-semibold text-blue-600 mb-2">{t('common.totalDays')}</div>
                  <div className="text-3xl font-black text-blue-900">{result.totalDays.toLocaleString()}</div>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
                  <div className="text-sm font-semibold text-purple-600 mb-2">{t('common.totalHours')}</div>
                  <div className="text-3xl font-black text-purple-900">{result.totalHours.toLocaleString()}</div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                  <div className="text-sm font-semibold text-green-600 mb-2">{t('common.totalMinutes')}</div>
                  <div className="text-3xl font-black text-green-900">{result.totalMinutes.toLocaleString()}</div>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                  <div className="text-sm font-semibold text-orange-600 mb-2">{t('common.totalSeconds')}</div>
                  <div className="text-3xl font-black text-orange-900">{result.totalSeconds.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
