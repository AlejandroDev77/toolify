import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Calculator, Percent } from 'lucide-react';
import {
  calculatePercentageOf,
  calculateWhatPercentage,
  calculatePercentageChange,
  calculatePercentageIncrease,
  calculatePercentageDecrease,
} from '../../../utils/calculators/percentage';

export default function PercentageCalculator() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'of' | 'what' | 'change' | 'increase' | 'decrease'>('of');
  
  // Mode: "of" - X% of Y
  const [percentOf, setPercentOf] = useState('');
  const [valueOf, setValueOf] = useState('');
  
  // Mode: "what" - X is what % of Y
  const [partWhat, setPartWhat] = useState('');
  const [totalWhat, setTotalWhat] = useState('');
  
  // Mode: "change" - % change from X to Y
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  
  // Mode: "increase/decrease" - Increase/Decrease X by Y%
  const [baseValue, setBaseValue] = useState('');
  const [changePercent, setChangePercent] = useState('');

  const getResult = () => {
    switch (mode) {
      case 'of': {
        const p = parseFloat(percentOf);
        const v = parseFloat(valueOf);
        if (isNaN(p) || isNaN(v)) return null;
        return calculatePercentageOf(v, p).toFixed(2);
      }
      case 'what': {
        const part = parseFloat(partWhat);
        const total = parseFloat(totalWhat);
        if (isNaN(part) || isNaN(total)) return null;
        return calculateWhatPercentage(part, total).toFixed(2) + '%';
      }
      case 'change': {
        const old = parseFloat(oldValue);
        const newVal = parseFloat(newValue);
        if (isNaN(old) || isNaN(newVal)) return null;
        const result = calculatePercentageChange(old, newVal);
        return `${result.isIncrease ? '+' : '-'}${result.change.toFixed(2)}%`;
      }
      case 'increase': {
        const base = parseFloat(baseValue);
        const percent = parseFloat(changePercent);
        if (isNaN(base) || isNaN(percent)) return null;
        return calculatePercentageIncrease(base, percent).toFixed(2);
      }
      case 'decrease': {
        const base = parseFloat(baseValue);
        const percent = parseFloat(changePercent);
        if (isNaN(base) || isNaN(percent)) return null;
        return calculatePercentageDecrease(base, percent).toFixed(2);
      }
      default:
        return null;
    }
  };

  const result = getResult();

  return (
    <>
      <SEO
        title={t('tools.percentagecalculator.name')}
        description={t('tools.percentagecalculator.description')}
        keywords="percentage calculator, percent calculator, calculate percentage"
      />
      <ToolLayout
        title={t('tools.percentagecalculator.name')}
        description={t('tools.percentagecalculator.description')}
        icon={Percent}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'of', label: 'X% de Y' },
              { id: 'what', label: 'X es qué % de Y' },
              { id: 'change', label: 'Cambio %' },
              { id: 'increase', label: 'Aumentar %' },
              { id: 'decrease', label: 'Disminuir %' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as any)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  mode === m.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            {mode === 'of' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={percentOf}
                    onChange={(e) => setPercentOf(e.target.value)}
                    placeholder="25"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                  <span className="text-2xl font-bold text-gray-600">% de</span>
                  <input
                    type="number"
                    value={valueOf}
                    onChange={(e) => setValueOf(e.target.value)}
                    placeholder="200"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>
            )}

            {mode === 'what' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={partWhat}
                    onChange={(e) => setPartWhat(e.target.value)}
                    placeholder="50"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                  <span className="text-lg font-bold text-gray-600">es qué % de</span>
                  <input
                    type="number"
                    value={totalWhat}
                    onChange={(e) => setTotalWhat(e.target.value)}
                    placeholder="200"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>
            )}

            {mode === 'change' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={oldValue}
                    onChange={(e) => setOldValue(e.target.value)}
                    placeholder="100"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                  <span className="text-2xl font-bold text-gray-600">→</span>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="150"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>
            )}

            {(mode === 'increase' || mode === 'decrease') && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={baseValue}
                    onChange={(e) => setBaseValue(e.target.value)}
                    placeholder="100"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                  <span className="text-lg font-bold text-gray-600">
                    {mode === 'increase' ? '+' : '-'}
                  </span>
                  <input
                    type="number"
                    value={changePercent}
                    onChange={(e) => setChangePercent(e.target.value)}
                    placeholder="20"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                  <span className="text-2xl font-bold text-gray-600">%</span>
                </div>
              </div>
            )}
          </div>

          {result && (
            <div className="bg-linear-to-br from-green-500 to-emerald-500 rounded-3xl p-1 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8 text-center">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                <div className="text-sm font-semibold text-gray-600 mb-2">Resultado</div>
                <div className="text-6xl font-black text-gray-900">{result}</div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
