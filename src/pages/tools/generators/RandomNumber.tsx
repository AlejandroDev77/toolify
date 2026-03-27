import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Dices, RefreshCw } from 'lucide-react';
import { generateMultipleRandomNumbers } from '../../../utils/generators/randomNumber';

export default function RandomNumber() {
  const { t } = useTranslation();
  const [numbers, setNumbers] = useState<number[]>([]);
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);

  const handleGenerate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    
    if (isNaN(minNum) || isNaN(maxNum) || minNum >= maxNum) return;
    
    try {
      const newNumbers = generateMultipleRandomNumbers(count, minNum, maxNum, unique);
      setNumbers(newNumbers);
    } catch (error) {
      alert(t('randomNumber.errorUnique'));
    }
  };

  return (
    <>
      <SEO
        title={t('tools.randomnumber.name')}
        description={t('tools.randomnumber.description')}
        keywords="random number generator, número aleatorio"
      />
      <ToolLayout
        title={t('tools.randomnumber.name')}
        description={t('tools.randomnumber.description')}
        icon={Dices}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('randomNumber.min')}
                  </label>
                  <input
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('randomNumber.max')}
                  </label>
                  <input
                    type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('randomNumber.quantity2')}: {count}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={unique}
                  onChange={(e) => setUnique(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium text-gray-700">{t('randomNumber.unique')}</span>
              </label>

              <button
                onClick={handleGenerate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {count > 1 ? t('randomNumber.generates') : t('randomNumber.generate')}
              </button>
            </div>
          </div>

          {numbers.length > 0 && (
            <div className="bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8">
                <Dices className="w-12 h-12 mx-auto mb-6 text-gray-700" />
                <div className="flex flex-wrap justify-center gap-4">
                  {numbers.map((num, index) => (
                    <div
                      key={index}
                      className="bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 min-w-[100px] text-center shadow-lg"
                    >
                      <div className="text-4xl font-black">{num}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
