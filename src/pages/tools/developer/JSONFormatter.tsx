import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { FileJson, Copy, Check, AlertCircle } from 'lucide-react';
import { formatJSON } from '../../../utils/developer/formatters';

export default function JSONFormatter() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      const formatted = formatJSON(input, false);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError('JSON inválido. Verifica la sintaxis.');
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      const minified = formatJSON(input, true);
      setOutput(minified);
      setError(null);
    } catch (err) {
      setError('JSON inválido. Verifica la sintaxis.');
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
        title={t('tools.jsonformatter.name')}
        description={t('tools.jsonformatter.description')}
        keywords="JSON formatter, JSON validator, format JSON, minify JSON"
      />
      <ToolLayout
        title={t('tools.jsonformatter.name')}
        description={t('tools.jsonformatter.description')}
        icon={FileJson}
      >
        <div className="space-y-8 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Entrada JSON</h3>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className="w-full h-96 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleFormat}
                  className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Formatear
                </button>
                <button
                  onClick={handleMinify}
                  className="flex-1 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Minificar
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Salida</h3>
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
                    <div className="font-semibold text-red-900 mb-1">Error de JSON</div>
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              ) : (
                <textarea
                  value={output}
                  readOnly
                  placeholder="El JSON formateado aparecerá aquí..."
                  className="w-full h-96 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 font-mono text-sm resize-none"
                />
              )}
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
