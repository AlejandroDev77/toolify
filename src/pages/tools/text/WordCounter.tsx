import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { FileText } from 'lucide-react';
import { countWords, countCharacters, countSentences, countParagraphs } from '../../../utils/text/textTransform';

export default function WordCounter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    setStats({
      words: countWords(text),
      characters: countCharacters(text, true),
      charactersNoSpaces: countCharacters(text, false),
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
    });
  }, [text]);

  return (
    <>
      <SEO
        title={t('tools.wordcounter.name')}
        description={t('tools.wordcounter.description')}
        keywords="word counter, character counter, contador de palabras"
      />
      <ToolLayout
        title={t('tools.wordcounter.name')}
        description={t('tools.wordcounter.description')}
        icon={FileText}
      >
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe o pega tu texto aquí..."
              className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg resize-none"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: t('common.words'), value: stats.words, color: 'from-blue-500 to-indigo-500' },
              { label: t('common.characters'), value: stats.characters, color: 'from-green-500 to-emerald-500' },
              { label: t('common.noSpaces'), value: stats.charactersNoSpaces, color: 'from-purple-500 to-pink-500' },
              { label: t('common.sentences'), value: stats.sentences, color: 'from-orange-500 to-red-500' },
              { label: t('common.paragraphs'), value: stats.paragraphs, color: 'from-cyan-500 to-blue-500' },
            ].map((stat) => (
              <div key={stat.label} className={`bg-linear-to-br ${stat.color} rounded-2xl p-1 shadow-lg`}>
                <div className="bg-white/95 backdrop-blur-md rounded-[1.2rem] p-6 text-center">
                  <div className="text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
