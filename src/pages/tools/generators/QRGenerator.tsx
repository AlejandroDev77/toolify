import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { QrCode, Download } from 'lucide-react';
import { generateQRCodeURL, downloadQRCode } from '../../../utils/generators/qrCode';

export default function QRGenerator() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [size, setSize] = useState(300);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [qrUrl, setQrUrl] = useState('');

  const handleGenerate = () => {
    if (!text.trim()) return;
    const url = generateQRCodeURL({ text, size, errorCorrection });
    setQrUrl(url);
  };

  const handleDownload = () => {
    if (qrUrl) {
      downloadQRCode(qrUrl, 'qrcode.png');
    }
  };

  return (
    <>
      <SEO
        title={t('tools.qrgenerator.name')}
        description={t('tools.qrgenerator.description')}
        keywords="QR code generator, QR generator, código QR"
      />
      <ToolLayout
        title={t('tools.qrgenerator.name')}
        description={t('tools.qrgenerator.description')}
        icon={QrCode}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('common.textOrURL')}
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('common.textOrURLPlaceholder')}
                  className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('common.size')}: {size}x{size} px
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100px</span>
                  <span>1000px</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('common.errorCorrection')}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'L', label: `${t('common.low')} (7%)` },
                    { value: 'M', label: `${t('common.medium')} (15%)` },
                    { value: 'Q', label: `${t('common.high')} (25%)` },
                    { value: 'H', label: `${t('common.veryHigh')} (30%)` },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setErrorCorrection(option.value as any)}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                        errorCorrection === option.value
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!text.trim()}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.generateQR')}
              </button>
            </div>
          </div>

          {qrUrl && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-bold text-gray-900 mb-6">{t('common.yourQRCode')}</h3>
              <div className="inline-block p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg mb-6">
                <img src={qrUrl} alt="QR Code" className="max-w-full" />
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
              >
                <Download className="w-5 h-5" />
                {t('common.downloadQRCode')}
              </button>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
