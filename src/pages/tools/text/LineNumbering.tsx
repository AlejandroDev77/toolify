import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { addLineNumbers } from '../../../utils/text/textAnalysis';

export default function LineNumbering() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [startFrom, setStartFrom] = useState('1');
  const [result, setResult] = useState('');

  const handleAdd = () => {
    const start = parseInt(startFrom) || 1;
    setResult(addLineNumbers(text, start));
  };

  return (
    <ToolLayout title={t('tools.linenumbering.name')} description={t('tools.linenumbering.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')}</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg" placeholder={t('common.enterText')} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.startFrom')}</label><input type="number" value={startFrom} onChange={(e) => setStartFrom(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
        <button onClick={handleAdd} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.addNumbers')}</button>
        {result && (<div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.result')}</label><textarea value={result} readOnly className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm" /></div>)}
      </div>
    </ToolLayout>
  );
}
