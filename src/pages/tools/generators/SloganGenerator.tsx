import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { generateSlogan } from '../../../utils/generators/content';
import { RefreshCw } from 'lucide-react';

export default function SloganGenerator() {
  const { t } = useTranslation();
  const [keywords, setKeywords] = useState('');
  const [slogans, setSlogans] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!keywords.trim()) return;
    const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
    setSlogans(generateSlogan(keywordArray));
  };

  return (
    <ToolLayout title={t('tools.slogangenerator.name')} description={t('tools.slogangenerator.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.keywords')}</label><input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="innovation, quality, service (comma separated)" /></div>
        <button onClick={handleGenerate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"><RefreshCw className="w-5 h-5" />{t('common.generate')}</button>
        {slogans.length > 0 && (
          <div className="space-y-3">
            {slogans.map((slogan, i) => (<div key={i} className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200"><p className="text-lg font-semibold text-green-900">{slogan}</p></div>))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
