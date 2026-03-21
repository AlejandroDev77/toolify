import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { BookOpen, Copy, Check } from 'lucide-react';
import { generateLoremWords, generateLoremSentences, generateLoremParagraphs } from '../../../utils/generators/loremIpsum';

export default function LoremIpsum() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState(3);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    let generated = '';
    switch (type) {
      case 'words':
        generated = generateLoremWords(count);
        break;
      case 'sentences':
        generated = generateLoremSentences(count);
        break;
      case 'paragraphs':
        generated = generateLoremParagraphs(count);
        break;
    }
    setText(generated);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        title={t('tools.loremipsum.name')}
        description={t('tools.loremipsum.description')}
        keywords="lorem ipsum generator, placeholder text, texto de relleno"
      />
      <ToolLayout
        title={t('tools.loremipsum.name')}
        description={t('tools.loremipsum.description')}
        icon={BookOpen}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('common.textType')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'words', label: t('common.words') },
                    { value: 'sentences', label: t('common.sentences') },
                    { value: 'paragraphs', label: t('common.paragraphs') },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setType(option.value as any)}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        type === option.value
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('common.quantity')}: {count}
                </label>
                <input
                  type="range"
                  min="1"
                  max={type === 'words' ? 500 : type === 'sentences' ? 50 : 20}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                {t('common.generateText')}
              </button>
            </div>
          </div>

          {text && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Texto Generado</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? t('common.copied') : t('common.copy')}
                </button>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{text}</p>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
