import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { removeDuplicateLines } from '../../../utils/text/textAnalysis';

export default function RemoveDuplicates() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleRemove = () => setResult(removeDuplicateLines(text));

  return (
    <ToolLayout title={t('tools.removeduplicates.name')} description={t('tools.removeduplicates.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')}</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg" placeholder={t('common.enterText')} /></div>
        <button onClick={handleRemove} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.removeDuplicates')}</button>
        {result && (<div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.result')}</label><textarea value={result} readOnly className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" /></div>)}
      </div>
    </ToolLayout>
  );
}
