import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Ruler, ArrowRight } from 'lucide-react';
import { convertUnit, units, type UnitCategory } from '../../../utils/calculators/unitConverter';

export default function UnitConverter() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<UnitCategory>('length');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    
    try {
      const converted = convertUnit(v, fromUnit, toUnit, category);
      setResult(converted);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    const unitKeys = Object.keys(units[newCategory]);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
    setResult(null);
  };

  const categoryLabels: Record<UnitCategory, string> = {
    length: t('common.length'),
    weight: t('common.weight'),
    temperature: t('common.temperature'),
    volume: 'Volumen',
    area: 'Área',
    speed: 'Velocidad',
  };

  const currentUnits = units[category];

  return (
    <>
      <SEO
        title={t('tools.unitconverter.name')}
        description={t('tools.unitconverter.description')}
        keywords="unit converter, convert units, measurement converter"
      />
      <ToolLayout
        title={t('tools.unitconverter.name')}
        description={t('tools.unitconverter.description')}
        icon={Ruler}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryLabels) as UnitCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.value')}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="100"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">De</label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg bg-white"
                  >
                    {Object.entries(currentUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">A</label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg bg-white"
                  >
                    {Object.entries(currentUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleConvert}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Convertir
              </button>
            </div>
          </div>

          {result !== null && (
            <div className="bg-linear-to-br from-green-500 to-teal-500 rounded-3xl p-1 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8">
                <Ruler className="w-12 h-12 mx-auto mb-6 text-gray-700" />
                
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-gray-900">{parseFloat(value)}</div>
                    <div className="text-sm font-semibold text-gray-600 mt-2">
                      {currentUnits[fromUnit].symbol}
                    </div>
                  </div>
                  
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                  
                  <div className="text-center">
                    <div className="text-4xl font-black text-green-600">
                      {result.toFixed(6).replace(/\.?0+$/, '')}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 mt-2">
                      {currentUnits[toUnit].symbol}
                    </div>
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
