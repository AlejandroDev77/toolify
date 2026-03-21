import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Type, Copy, Check } from 'lucide-react';
import { toUpperCase, toLowerCase, toTitleCase, toSentenceCase } from '../../../utils/text/textTransform';

export default function TextCase() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const transformations = [
    { id: 'upper', label: t('common.uppercaseText'), fn: toUpperCase },
    { id: 'lower', label: t('common.lowercase'), fn: toLowerCase },
    { id: 'title', label: t('common.titleCase'), fn: toTitleCase },
    { id: 'sentence', label: t('common.sentenceCase'), fn: toSentenceCase },
  ];

  const handleCopy = (transformed: string, id: string) => {
    navigator.clipboard.writeText(transformed);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <SEO
        title={t('tools.textcase.name')}
        description={t('tools.textcase.description')}
        keywords="text case converter, uppercase, lowercase, title case"
      />
      <ToolLayout
        title={t('tools.textcase.name')}
        description={t('tools.textcase.description')}
        icon={Type}
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
            <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {transformations.map((transform) => {
                const transformed = transform.fn(text);
                return (
                  <div key={transform.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-900">{transform.label}</h3>
                      <button
                        onClick={() => handleCopy(transformed, transform.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        {copied === transform.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-gray-700 break-words">{transformed}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
