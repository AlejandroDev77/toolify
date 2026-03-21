import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { csvToJSON } from '../../../utils/developer/formatters';
import { Copy, Check } from 'lucide-react';

export default function CSVToJSON() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const json = csvToJSON(input);
      setOutput(JSON.stringify(json, null, 2));
    } catch (err) {
      setOutput('Error: Invalid CSV format');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title={t('tools.csvtojson.name')} description={t('tools.csvtojson.description')}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.csvInput')}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm" placeholder="name,age,city&#10;John,30,NYC&#10;Jane,25,LA" />
        </div>
        <button onClick={handleConvert} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.convert')}</button>
        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">{t('common.jsonOutput')}</label>
              <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('common.copied') : t('common.copy')}
              </button>
            </div>
            <textarea value={output} readOnly className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50" />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
