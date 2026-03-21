import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateKeywordDensity } from '../../../utils/text/textAnalysis';

export default function KeywordDensity() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateKeywordDensity> | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    const keywords = calculateKeywordDensity(text, 15);
    setResult(keywords);
  };

  return (
    <ToolLayout title={t('tools.keyworddensity.name')} description={t('tools.keyworddensity.description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')}</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg" placeholder={t('common.enterText')} />
        </div>
        <button onClick={handleAnalyze} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.analyze')}</button>
        {result && result.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('common.keyword')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('common.count')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('common.density')}</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm">{item.keyword}</td>
                    <td className="px-4 py-3 text-sm">{item.count}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-600">{item.density.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
