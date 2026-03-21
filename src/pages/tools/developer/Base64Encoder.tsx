import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Code, Copy, Check, AlertCircle } from 'lucide-react';
import { encodeBase64, decodeBase64 } from '../../../utils/developer/formatters';

export default function Base64Encoder() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      const encoded = encodeBase64(input);
      setOutput(encoded);
      setError(null);
    } catch (err) {
      setError('Error al codificar');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeBase64(input);
      setOutput(decoded);
      setError(null);
    } catch (err) {
      setError('Error al decodificar. Asegúrate de que el texto esté en formato Base64 válido.');
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        title={t('tools.base64encode.name')}
        description={t('tools.base64encode.description')}
        keywords="base64 encoder, base64 decoder, encode base64, decode base64"
      />
      <ToolLayout
        title={t('tools.base64encode.name')}
        description={t('tools.base64encode.description')}
        icon={Code}
      >
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Entrada</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe o pega tu texto aquí..."
              className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg resize-none"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleEncode}
                className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Codificar a Base64
              </button>
              <button
                onClick={handleDecode}
                className="flex-1 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Decodificar desde Base64
              </button>
            </div>
          </div>

          {(output || error) && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Resultado</h3>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? t('common.copied') : t('common.copy')}
                  </button>
                )}
              </div>
              {error ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-red-900 mb-1">Error</div>
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-700 break-all font-mono text-sm">{output}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
