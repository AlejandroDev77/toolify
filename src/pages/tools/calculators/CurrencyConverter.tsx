import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { CURRENCIES, convertCurrency } from '../../../utils/calculators/currency';
import { ArrowLeftRight } from 'lucide-react';

export default function CurrencyConverter() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt < 0) return;
    
    const converted = convertCurrency(amt, fromCurrency, toCurrency);
    setResult(converted);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (result !== null) {
      setAmount(result.toFixed(2));
      setResult(parseFloat(amount));
    }
  };

  return (
    <ToolLayout
      title={t('tools.currencyconverter.name')}
      description={t('tools.currencyconverter.description')}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.amount')}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.from')}
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.to')}
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {t('common.convert')}
        </button>

        {result !== null && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <div className="text-center">
              <p className="text-gray-600 mb-2">{t('common.result')}</p>
              <p className="text-4xl font-bold text-green-600">
                {CURRENCIES.find(c => c.code === toCurrency)?.symbol}{result.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
              </p>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>{t('common.note')}:</strong> {t('tools.currencyconverter.note')}
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
