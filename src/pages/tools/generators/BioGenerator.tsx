import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { generateBio } from '../../../utils/generators/content';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function BioGenerator() {
  const { t } = useTranslation();
  const [style, setStyle] = useState<'professional' | 'casual' | 'creative'>('professional');
  const [bio, setBio] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => setBio(generateBio(style));
  const handleCopy = () => {
    navigator.clipboard.writeText(bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title={t('tools.biogenerator.name')} description={t('tools.biogenerator.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.style')}</label><select value={style} onChange={(e) => setStyle(e.target.value as any)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="professional">{t('common.professional')}</option><option value="casual">{t('common.casual')}</option><option value="creative">{t('common.creative')}</option></select></div>
        <button onClick={handleGenerate} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"><RefreshCw className="w-5 h-5" />{t('common.generate')}</button>
        {bio && (<div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"><p className="text-lg text-gray-800 mb-4">{bio}</p><button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition text-sm border border-purple-200">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? t('common.copied') : t('common.copy')}</button></div>)}
      </div>
    </ToolLayout>
  );
}
