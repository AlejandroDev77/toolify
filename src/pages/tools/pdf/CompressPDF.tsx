import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, Download, Minimize2, CheckCircle2, Loader2, FileText, TrendingDown } from 'lucide-react';
import { compressPDF } from '../../../utils/pdf/pdfOperations';
import ToolLayout from '../../ToolLayout';
import SEO from '../../../components/SEO';

export default function CompressPDF() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [compressedPdf, setCompressedPdf] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
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
        setOriginalSize(pdfFile.size);
        setCompressedPdf(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedPdf(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const compressed = await compressPDF(file);
      setCompressedPdf(compressed);
      setCompressedSize(compressed.length);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedPdf) return;
    
    const blob = new Blob([compressedPdf as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const compressionRate = originalSize && compressedSize
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <>
      <SEO 
        title={t('tools.compresspdf.title')}
        description={t('tools.compresspdf.longDescription')}
        keywords={t('tools.compresspdf.keywords')}
      />
      <ToolLayout
        title={t('tools.compresspdf.name')}
        description={t('tools.compresspdf.description')}
        icon={Minimize2}
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
                ? 'border-purple-500 bg-purple-50 scale-105' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
            }`}>
              <div className={`transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
                <FileUp className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  {dragActive ? t('pdf.dropHere') : t('pdf.dragOrClick')}
                </p>
                <p className="text-sm text-gray-500">{t('pdf.selectPDFToCompress')}</p>
                <div className="mt-4 inline-block bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition">
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

        {/* Archivo seleccionado */}
        {file && !compressedPdf && (
          <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-500 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-600">{t('pdf.originalSize')}: {formatSize(originalSize)}</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            
            <button
              onClick={handleCompress}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {t('common.processing')}
                </>
              ) : (
                <>
                  <Minimize2 className="w-6 h-6" />
                  {t('pdf.compressPDF')}
                </>
              )}
            </button>
          </div>
        )}

        {/* Resultado */}
        {compressedPdf && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-500 p-3 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">{t('pdf.compressionComplete')}</h3>
                  <p className="text-green-600">{t('pdf.compressionSuccess')}</p>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">{t('pdf.originalSize')}</p>
                  <p className="text-2xl font-bold text-gray-800">{formatSize(originalSize)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">{t('pdf.compressedSize')}</p>
                  <p className="text-2xl font-bold text-green-600">{formatSize(compressedSize)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    {t('pdf.saved')}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">{compressionRate}%</p>
                </div>
              </div>

              <button
                onClick={downloadCompressed}
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
