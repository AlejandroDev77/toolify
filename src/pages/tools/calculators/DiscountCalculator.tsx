import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Tag, TrendingDown } from 'lucide-react';
import { calculateDiscount } from '../../../utils/calculators/discount';

export default function DiscountCalculator() {
  const { t } = useTranslation();
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(20);
  const [result, setResult] = useState<ReturnType<typeof calculateDiscount> | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(originalPrice);
    if (isNaN(price) || price <= 0) return;
    
    const discountResult = calculateDiscount(price, discountPercentage);
    setResult(discountResult);
  };

  const quickDiscounts = [10, 20, 30, 50, 70];

  return (
    <>
      <SEO
        title={t('tools.discountcalculator.name')}
        description={t('tools.discountcalculator.description')}
        keywords="discount calculator, sale price, descuento, oferta"
      />
      <ToolLayout
        title={t('tools.discountcalculator.name')}
        description={t('tools.discountcalculator.description')}
        icon={Tag}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.originalPrice')}
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="100.00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('common.discount')}: {discountPercentage}%
                </label>
                <div className="flex gap-2 mb-4">
                  {quickDiscounts.map((discount) => (
                    <button
                      key={discount}
                      onClick={() => setDiscountPercentage(discount)}
                      className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all ${
                        discountPercentage === discount
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {discount}%
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30"
              >
                {t('common.calculateDiscount')}
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-red-500 to-pink-500 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8 text-center">
                  <TrendingDown className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                  <div className="text-sm font-semibold text-gray-600 mb-2">{t('common.finalPrice')}</div>
                  <div className="text-6xl font-black text-gray-900 mb-2">
                    ${result.finalPrice}
                  </div>
                  <div className="text-lg text-gray-500 line-through mb-6">
                    ${parseFloat(originalPrice).toFixed(2)}
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <div className="text-sm font-semibold text-green-600 mb-2">¡Ahorras!</div>
                    <div className="text-4xl font-black text-green-700">
                      ${result.savedAmount}
                    </div>
                    <div className="text-lg font-bold text-green-600 mt-2">
                      ({result.savedPercentage}% {t('common.discount').toLowerCase()})
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
