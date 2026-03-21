import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Hash, Copy, Check, RefreshCw } from 'lucide-react';
import { generateMultipleUUIDs } from '../../../utils/generators/uuid';

export default function UUIDGenerator() {
  const { t } = useTranslation();
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = () => {
    const newUuids = generateMultipleUUIDs(count);
    setUuids(newUuids);
    setCopiedIndex(null);
  };

  const handleCopy = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <SEO
        title={t('tools.uuidgenerator.name')}
        description={t('tools.uuidgenerator.description')}
        keywords="UUID generator, GUID, unique identifier"
      />
      <ToolLayout
        title={t('tools.uuidgenerator.name')}
        description={t('tools.uuidgenerator.description')}
        icon={Hash}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('uuid.quantity')}: {count}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {count > 1 ? t('uuid.generates') : t('uuid.generate')}
              </button>
            </div>
          </div>

          {uuids.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {uuids.length} UUID{uuids.length > 1 ? 's' : ''} {uuids.length > 1 ? t('uuid.generateds') : t('uuid.generated')}
                </h3>
                {uuids.length > 1 && (
                  <button
                    onClick={handleCopyAll}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                  >
                    {copiedIndex === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedIndex === -1 ? t('uuid.copied') : t('uuid.copyAll')}
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <span className="font-mono text-sm text-gray-900">{uuid}</span>
                    <button
                      onClick={() => handleCopy(uuid, index)}
                      className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
