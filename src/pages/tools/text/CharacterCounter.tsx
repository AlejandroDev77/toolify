import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Type } from 'lucide-react';
import { countWords, countCharacters, countSentences, countParagraphs } from '../../../utils/text/textTransform';

export default function CharacterCounter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
  });

  useEffect(() => {
    const lines = text.split('\n').length;
    setStats({
      words: countWords(text),
      characters: countCharacters(text, true),
      charactersNoSpaces: countCharacters(text, false),
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
      lines,
    });
  }, [text]);

  return (
    <>
      <SEO
        title={t('tools.charactercounter.name')}
        description={t('tools.charactercounter.description')}
        keywords="character counter, contador de caracteres, text analysis"
      />
      <ToolLayout
        title={t('tools.charactercounter.name')}
        description={t('tools.charactercounter.description')}
        icon={Type}
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: t('common.characters'), value: stats.characters, color: 'from-blue-500 to-indigo-500' },
              { label: t('common.noSpaces'), value: stats.charactersNoSpaces, color: 'from-green-500 to-emerald-500' },
              { label: t('common.words'), value: stats.words, color: 'from-purple-500 to-pink-500' },
              { label: t('common.sentences'), value: stats.sentences, color: 'from-orange-500 to-red-500' },
              { label: t('common.paragraphs'), value: stats.paragraphs, color: 'from-cyan-500 to-blue-500' },
              { label: t('common.lines'), value: stats.lines, color: 'from-yellow-500 to-orange-500' },
            ].map((stat) => (
              <div key={stat.label} className={`bg-linear-to-br ${stat.color} rounded-2xl p-1 shadow-lg`}>
                <div className="bg-white/95 backdrop-blur-md rounded-[1.2rem] p-6 text-center">
                  <div className="text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {text && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Análisis Detallado</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{t('common.avgWordsPerSentence')}:</span>
                  <span className="font-bold text-gray-900">
                    {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : 0}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{t('common.avgCharsPerWord')}:</span>
                  <span className="font-bold text-gray-900">
                    {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : 0}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Tiempo de lectura (aprox):</span>
                  <span className="font-bold text-gray-900">
                    {Math.ceil(stats.words / 200)} min
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Tiempo de habla (aprox):</span>
                  <span className="font-bold text-gray-900">
                    {Math.ceil(stats.words / 130)} min
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
