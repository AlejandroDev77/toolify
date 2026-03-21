import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { compareTexts } from '../../../utils/text/textAnalysis';

export default function TextDiff() {
  const { t } = useTranslation();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState<ReturnType<typeof compareTexts> | null>(null);

  const handleCompare = () => {
    if (!text1.trim() || !text2.trim()) return;
    const diff = compareTexts(text1, text2);
    setResult(diff);
  };

  return (
    <ToolLayout title={t('tools.textdiff.name')} description={t('tools.textdiff.description')}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')} 1</label>
            <textarea value={text1} onChange={(e) => setText1(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')} 2</label>
            <textarea value={text2} onChange={(e) => setText2(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <button onClick={handleCompare} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.compare')}</button>
        {result && (
          <div className="space-y-4">
            {result.added.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">{t('common.added')} ({result.added.length})</h3>
                {result.added.map((line, i) => <p key={i} className="text-sm text-green-700">+ {line}</p>)}
              </div>
            )}
            {result.removed.length > 0 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">{t('common.removed')} ({result.removed.length})</h3>
                {result.removed.map((line, i) => <p key={i} className="text-sm text-red-700">- {line}</p>)}
              </div>
            )}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{t('common.unchanged')} ({result.unchanged.length})</h3>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
