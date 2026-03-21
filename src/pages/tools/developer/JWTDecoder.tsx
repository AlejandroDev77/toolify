import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../ToolLayout';
import { decodeJWT } from '../../../utils/developer/formatters';

export default function JWTDecoder() {
  const { t } = useTranslation();
  const [token, setToken] = useState('');
  const [result, setResult] = useState<ReturnType<typeof decodeJWT> | null>(null);
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      setError('');
      const decoded = decodeJWT(token);
      setResult(decoded);
    } catch (err) {
      setError(t('common.invalidJWT'));
      setResult(null);
    }
  };

  return (
    <ToolLayout title={t('tools.jwtdecoder.name')} description={t('tools.jwtdecoder.description')}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.jwtToken')}</label>
          <textarea value={token} onChange={(e) => setToken(e.target.value)} className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
        </div>
        <button onClick={handleDecode} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">{t('common.decode')}</button>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
        {result && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">{t('common.header')}</h3>
              <pre className="text-sm bg-white p-3 rounded border border-blue-200 overflow-x-auto">{JSON.stringify(result.header, null, 2)}</pre>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">{t('common.payload')}</h3>
              <pre className="text-sm bg-white p-3 rounded border border-green-200 overflow-x-auto">{JSON.stringify(result.payload, null, 2)}</pre>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{t('common.signature')}</h3>
              <p className="text-sm font-mono break-all">{result.signature}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
