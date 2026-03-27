import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { extractEmails } from '../../../utils/text/textAnalysis';

export default function EmailExtractor() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [emails, setEmails] = useState<string[]>([]);

  const handleExtract = () => setEmails(extractEmails(text));

  return (
    <ToolLayout title={t('tools.emailextractor.name')} description={t('tools.emailextractor.description')}>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('common.text')}</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg" placeholder={t('common.enterText')} /></div>
        <button onClick={handleExtract} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.extract')}</button>
        {emails.length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-900 mb-3">{t('common.found')} {emails.length} {t('common.emails')}</p>
            <div className="space-y-2">
              {emails.map((email, i) => (<div key={i} className="bg-white p-2 rounded border border-green-200 text-sm font-mono">{email}</div>))}
            </div>
          </div>
        )}
        {emails.length === 0 && text && (<div className="bg-gray-50 p-4 rounded-lg text-center text-gray-600">{t('common.noEmailsFound')}</div>)}
      </div>
    </ToolLayout>
  );
}
