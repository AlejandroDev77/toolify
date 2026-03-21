import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateRetirement } from '../../../utils/calculators/retirement';

export default function RetirementCalculator() {
  const { t } = useTranslation();
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [result, setResult] = useState<ReturnType<typeof calculateRetirement> | null>(null);

  const handleCalculate = () => {
    const curr = parseFloat(currentAge);
    const ret = parseFloat(retirementAge);
    const sav = parseFloat(currentSavings);
    const cont = parseFloat(monthlyContribution);
    const ret_rate = parseFloat(annualReturn);
    if (isNaN(curr) || isNaN(ret) || isNaN(sav) || isNaN(cont) || isNaN(ret_rate)) return;
    const retirement = calculateRetirement(curr, ret, sav, cont, ret_rate);
    setResult(retirement);
  };

  return (
    <ToolLayout title={t('tools.retirementcalculator.name')} description={t('tools.retirementcalculator.description')}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.currentAge')}</label><input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.retirementAge')}</label><input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.currentSavings')}</label><input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.monthlyContribution')}</label><input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.annualReturn')} (%)</label><input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
        </div>
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.calculate')}</button>
        {result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <p className="text-sm text-gray-600 mb-2">{t('common.totalSavings')}</p>
              <p className="text-4xl font-bold text-green-600">${result.totalSavings.toLocaleString()}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm text-gray-600">{t('common.totalContributions')}</p><p className="text-2xl font-bold text-blue-600">${result.totalContributions.toLocaleString()}</p></div>
              <div className="bg-purple-50 p-4 rounded-lg"><p className="text-sm text-gray-600">{t('common.totalInterest')}</p><p className="text-2xl font-bold text-purple-600">${result.totalInterest.toLocaleString()}</p></div>
              <div className="bg-orange-50 p-4 rounded-lg"><p className="text-sm text-gray-600">{t('common.monthlyIncome')}</p><p className="text-2xl font-bold text-orange-600">${result.monthlyIncome.toLocaleString()}</p></div>
              <div className="bg-pink-50 p-4 rounded-lg"><p className="text-sm text-gray-600">{t('common.yearsOfIncome')}</p><p className="text-2xl font-bold text-pink-600">{result.yearsOfIncome} {t('common.years')}</p></div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
