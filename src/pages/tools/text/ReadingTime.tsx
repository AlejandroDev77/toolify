import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { calculateReadingTime } from '../../../utils/text/textAnalysis';

export default function ReadingTime() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState('200');
  const [result, setResult] = useState<ReturnType<typeof calculateReadingTime> | null>(null);

  const handleCalculate = () => {
    if (!text.trim()) return;
    const wordsPerMinute = parseFloat(wpm);
    const readingTime = calculateReadingTime(text, wordsPerMinute);
    setResult(readingTime);
  };

  return (
    <ToolLayout title={t('tools.readingtime.name')} description={t('tools.readingtime.description')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')}</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg" placeholder={t('common.enterText')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.wordsPerMinute')}</label>
          <input type="number" value={wpm} onChange={(e) => setWpm(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.calculate')}</button>
        {result && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm text-gray-600">{t('common.readingTime')}</p><p className="text-3xl font-bold text-blue-600">{result.minutes}m {result.seconds}s</p></div>
            <div className="bg-green-50 p-4 rounded-lg"><p className="text-sm text-gray-600">{t('common.words')}</p><p className="text-3xl font-bold text-green-600">{result.words}</p></div>
            <div className="bg-purple-50 p-4 rounded-lg"><p className="text-sm text-gray-600">{t('common.speed')}</p><p className="text-3xl font-bold text-purple-600">{wpm} WPM</p></div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
