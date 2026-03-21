import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Network, Copy, Check } from 'lucide-react';
import { encodeURL, decodeURL } from '../../../utils/developer/formatters';

export default function URLEncoder() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    const encoded = encodeURL(input);
    setOutput(encoded);
  };

  const handleDecode = () => {
    const decoded = decodeURL(input);
    setOutput(decoded);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        title={t('tools.urlencode.name')}
        description={t('tools.urlencode.description')}
        keywords="URL encoder, URL decoder, encode URL, decode URL"
      />
      <ToolLayout
        title={t('tools.urlencode.name')}
        description={t('tools.urlencode.description')}
        icon={Network}
      >
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Entrada</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/search?q=hello world"
              className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg resize-none"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleEncode}
                className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Codificar URL
              </button>
              <button
                onClick={handleDecode}
                className="flex-1 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Decodificar URL
              </button>
            </div>
          </div>

          {output && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Resultado</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? t('common.copied') : t('common.copy')}
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-700 break-all font-mono text-sm">{output}</p>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
