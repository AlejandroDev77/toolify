import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Copy, Check } from 'lucide-react';
import { removeExtraSpaces, removeAllSpaces } from '../../../utils/text/textTransform';

export default function RemoveSpaces() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (transformed: string, id: string) => {
    navigator.clipboard.writeText(transformed);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const extraRemoved = removeExtraSpaces(text);
  const allRemoved = removeAllSpaces(text);

  return (
    <>
      <SEO
        title={t('tools.removespaces.name')}
        description={t('tools.removespaces.description')}
        keywords="remove spaces, trim text, eliminar espacios"
      />
      <ToolLayout
        title={t('tools.removespaces.name')}
        description={t('tools.removespaces.description')}
        icon={Copy}
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
                  <h3 className="font-bold text-gray-900">{t('common.extraSpacesRemoved')}</h3>
                  <button
                    onClick={() => handleCopy(extraRemoved, 'extra')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    {copied === 'extra' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'extra' ? t('common.copied') : t('common.copy')}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-700 break-words whitespace-pre-wrap">{extraRemoved}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">{t('common.allSpacesRemoved')}</h3>
                  <button
                    onClick={() => handleCopy(allRemoved, 'all')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'all' ? t('common.copied') : t('common.copy')}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-700 break-words">{allRemoved}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
