import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { formatXML } from '../../../utils/developer/formatters';
import { Copy, Check } from 'lucide-react';

export default function XMLFormatter() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      setError('');
      const formatted = formatXML(input);
      setOutput(formatted);
    } catch (err) {
      setError(t('common.invalidXML'));
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title={t('tools.xmlformatter.name')}
      description={t('tools.xmlformatter.description')}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.input')}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="<root><item>value</item></root>"
          />
        </div>

        <button
          onClick={handleFormat}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {t('common.format')}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {t('common.output')}
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('common.copied') : t('common.copy')}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
