import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { generateHashtags } from '../../../utils/generators/content';
import { Copy, Check } from 'lucide-react';

export default function HashtagGenerator() {
  const { t } = useTranslation();
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState('10');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const num = parseInt(count) || 10;
    setHashtags(generateHashtags(topic, num));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title={t('tools.hashtaggenerator.name')} description={t('tools.hashtaggenerator.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.topic')}</label><input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="travel, fitness, food..." /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.count')}</label><input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
        <button onClick={handleGenerate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.generate')}</button>
        {hashtags.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
            <div className="flex flex-wrap gap-2 mb-4">
              {hashtags.map((tag, i) => (<span key={i} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600 border border-blue-200">{tag}</span>))}
            </div>
            <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition text-sm border border-blue-200">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? t('common.copied') : t('common.copyAll')}</button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
