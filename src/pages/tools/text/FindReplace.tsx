import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { findAndReplace } from '../../../utils/text/textAnalysis';

export default function FindReplace() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [result, setResult] = useState('');

  const handleReplace = () => setResult(findAndReplace(text, find, replace, caseSensitive));

  return (
    <ToolLayout title={t('tools.findreplace.name')} description={t('tools.findreplace.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')}</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg" /></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.find')}</label><input type="text" value={find} onChange={(e) => setFind(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.replace')}</label><input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
        </div>
        <div className="flex items-center gap-2"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" /><label className="text-sm text-gray-700">{t('common.caseSensitive')}</label></div>
        <button onClick={handleReplace} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.replace')}</button>
        {result && (<div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.result')}</label><textarea value={result} readOnly className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" /></div>)}
      </div>
    </ToolLayout>
  );
}
