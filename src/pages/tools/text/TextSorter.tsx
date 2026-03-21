import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { sortLines } from '../../../utils/text/textAnalysis';

export default function TextSorter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc' | 'length'>('asc');
  const [result, setResult] = useState('');

  const handleSort = () => setResult(sortLines(text, order));

  return (
    <ToolLayout title={t('tools.textsorter.name')} description={t('tools.textsorter.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')}</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg" placeholder={t('common.enterText')} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.sortOrder')}</label><select value={order} onChange={(e) => setOrder(e.target.value as any)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="asc">{t('common.ascending')}</option><option value="desc">{t('common.descending')}</option><option value="length">{t('common.byLength')}</option></select></div>
        <button onClick={handleSort} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.sort')}</button>
        {result && (<div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.result')}</label><textarea value={result} readOnly className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" /></div>)}
      </div>
    </ToolLayout>
  );
}
