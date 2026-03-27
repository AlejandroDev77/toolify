import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, Download, RotateCw, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { rotatePDF } from '../../../utils/pdf/pdfOperations';
import ToolLayout from '../../ToolLayout';
import SEO from '../../../components/SEO';

export default function RotatePDF() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [rotatedPdf, setRotatedPdf] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const pdfFile = e.dataTransfer.files[0];
      if (pdfFile.type === 'application/pdf') {
        setFile(pdfFile);
        setRotatedPdf(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setRotatedPdf(null);
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const rotated = await rotatePDF(file, rotation);
      setRotatedPdf(rotated);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const downloadRotated = () => {
    if (!rotatedPdf) return;
    
    const blob = new Blob([rotatedPdf as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rotated.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title={t('tools.rotatepdf.title')}
        description={t('tools.rotatepdf.longDescription')}
        keywords={t('tools.rotatepdf.keywords')}
      />
      <ToolLayout
        title={t('tools.rotatepdf.name')}
        description={t('tools.rotatepdf.description')}
        icon={RotateCw}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Zona de carga */}
        <div className="mb-8">
          <label 
            className="block w-full"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
              dragActive 
                ? 'border-orange-500 bg-orange-50 scale-105' 
                : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
            }`}>
              <div className={`transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
                <FileUp className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  {dragActive ? t('pdf.dropHere') : t('pdf.dragOrClick')}
                </p>
                <p className="text-sm text-gray-500">{t('pdf.selectPDFToRotate')}</p>
                <div className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                  {t('common.selectFile')}
                </div>
              </div>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Archivo seleccionado y opciones */}
        {file && !rotatedPdf && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <FileText className="w-12 h-12 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
            </div>

            {/* Selector de rotación */}
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-800 mb-4">
                {t('pdf.rotationAngle')}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[90, 180, 270].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setRotation(angle as 90 | 180 | 270)}
                    className={`p-6 rounded-xl border-3 transition-all duration-300 flex flex-col items-center gap-3 ${
                      rotation === angle
                        ? 'border-orange-500 bg-orange-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-4 rounded-full transition ${
                      rotation === angle ? 'bg-orange-500' : 'bg-gray-200'
                    }`}>
                      <RotateCw className={`w-8 h-8 ${
                        rotation === angle ? 'text-white' : 'text-gray-600'
                      }`} style={{ transform: `rotate(${angle}deg)` }} />
                    </div>
                    <span className={`font-bold text-lg ${
                      rotation === angle ? 'text-orange-600' : 'text-gray-700'
                    }`}>{angle}°</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleRotate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {t('common.processing')}
                </>
              ) : (
                <>
                  <RotateCw className="w-6 h-6" />
                  {t('pdf.rotatePDF')}
                </>
              )}
            </button>
          </div>
        )}

        {/* Resultado */}
        {rotatedPdf && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-500 p-3 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">{t('pdf.rotationComplete')}</h3>
                  <p className="text-green-600">{t('pdf.rotationSuccess')}</p>
                </div>
              </div>

              <button
                onClick={downloadRotated}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <Download className="w-6 h-6" />
                {t('common.download')}
              </button>
            </div>
          </div>
        )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
