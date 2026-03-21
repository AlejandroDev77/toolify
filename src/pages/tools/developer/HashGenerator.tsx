import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { generateHash } from '../../../utils/developer/formatters';
import { Copy, Check } from 'lucide-react';

export default function HashGenerator() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<'md5' | 'sha1' | 'sha256'>('sha256');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    const result = await generateHash(input, algorithm);
    setHash(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title={t('tools.hashgenerator.name')} description={t('tools.hashgenerator.description')}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.input')}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg" placeholder={t('common.enterText')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.algorithm')}</label>
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value as any)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="md5">MD5</option>
            <option value="sha1">SHA-1</option>
            <option value="sha256">SHA-256</option>
          </select>
        </div>
        <button onClick={handleGenerate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.generate')}</button>
        {hash && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">{t('common.hash')}</label>
              <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('common.copied') : t('common.copy')}
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <p className="font-mono text-sm break-all">{hash}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
