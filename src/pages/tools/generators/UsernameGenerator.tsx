import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { generateUsername } from '../../../utils/generators/content';
import { RefreshCw } from 'lucide-react';

export default function UsernameGenerator() {
  const { t } = useTranslation();
  const [baseName, setBaseName] = useState('');
  const [usernames, setUsernames] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!baseName.trim()) return;
    setUsernames(generateUsername(baseName));
  };

  return (
    <ToolLayout title={t('tools.usernamegenerator.name')} description={t('tools.usernamegenerator.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.baseName')}</label><input type="text" value={baseName} onChange={(e) => setBaseName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="john, sarah, tech..." /></div>
        <button onClick={handleGenerate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"><RefreshCw className="w-5 h-5" />{t('common.generate')}</button>
        {usernames.length > 0 && (
          <div className="grid md:grid-cols-2 gap-3">
            {usernames.map((username, i) => (<div key={i} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200"><p className="font-mono text-lg font-semibold text-purple-900">{username}</p></div>))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
