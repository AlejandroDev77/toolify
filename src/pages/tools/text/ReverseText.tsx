import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { RotateCw, Copy, Check } from 'lucide-react';
import { reverseText, reverseWords } from '../../../utils/text/textTransform';

export default function ReverseText() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (transformed: string, id: string) => {
    navigator.clipboard.writeText(transformed);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const textReversed = reverseText(text);
  const wordsReversed = reverseWords(text);

  return (
    <>
      <SEO
        title={t('tools.reversetext.name')}
        description={t('tools.reversetext.description')}
        keywords="reverse text, invertir texto, reverse words"
      />
      <ToolLayout
        title={t('tools.reversetext.name')}
        description={t('tools.reversetext.description')}
        icon={RotateCw}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe o pega tu texto aquí..."
              className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg resize-none"
            />
          </div>

          {text && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">Texto Invertido</h3>
                  <button
                    onClick={() => handleCopy(textReversed, 'text')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    {copied === 'text' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'text' ? t('common.copied') : t('common.copy')}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-700 break-words">{textReversed}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">{t('common.wordsReversed')}</h3>
                  <button
                    onClick={() => handleCopy(wordsReversed, 'words')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    {copied === 'words' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'words' ? t('common.copied') : t('common.copy')}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-700 break-words">{wordsReversed}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
