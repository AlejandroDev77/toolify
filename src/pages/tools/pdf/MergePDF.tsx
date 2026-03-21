import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, Download, Trash2, FilePlus2, ArrowDown, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { mergePDFs } from '../../../utils/pdf/pdfOperations';
import ToolLayout from '../../ToolLayout';
import SEO from '../../../components/SEO';

export default function MergePDF() {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [mergedPdf, setMergedPdf] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(false);
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
      const pdfFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type === 'application/pdf'
      );
      setFiles([...files, ...pdfFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
      setMergedPdf(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setMergedPdf(null);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    
    setLoading(true);
    try {
      const merged = await mergePDFs(files);
      setMergedPdf(merged);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const downloadMerged = () => {
    if (!mergedPdf) return;
    
    const blob = new Blob([mergedPdf as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title={t('tools.mergepdf.title')}
        description={t('tools.mergepdf.longDescription')}
        keywords={t('tools.mergepdf.keywords')}
      />
      <ToolLayout
        title={t('tools.mergepdf.name')}
        description={t('tools.mergepdf.description')}
        icon={FilePlus2}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header con instrucciones */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 mb-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                  <span className="font-semibold">{t('pdf.step1')}</span>
                </div>
                <p className="text-sm text-white/80">{t('pdf.step1Desc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                  <span className="font-semibold">{t('pdf.step2')}</span>
                </div>
                <p className="text-sm text-white/80">{t('pdf.step2Desc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                  <span className="font-semibold">{t('pdf.step3')}</span>
                </div>
                <p className="text-sm text-white/80">{t('pdf.step3Desc')}</p>
              </div>
            </div>
          </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Zona de carga con drag & drop */}
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
                ? 'border-red-500 bg-red-50 scale-105' 
                : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
            }`}>
              <div className={`transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
                <FileUp className="w-16 h-16 mx-auto mb-4 text-red-500" />
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  {dragActive ? t('pdf.dropHere') : t('pdf.dragOrClick')}
                </p>
                <p className="text-sm text-gray-500">{t('pdf.selectMultiplePDFs')}</p>
                <div className="mt-4 inline-block bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
                  {t('pdf.selectFiles')}
                </div>
              </div>
            </div>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Lista de archivos con reordenamiento */}
        {files.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {t('pdf.selectedFiles')} ({files.length})
              </h3>
              {files.length >= 2 && (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('pdf.readyToMerge')}
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className="group flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border-2 border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ArrowDown className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-md">
                    <FileText className="w-10 h-10 text-purple-500" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    #{index + 1}
                  </div>
                  
                  <button
                    onClick={() => removeFile(index)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón de combinar */}
        {files.length > 0 && (
          <button
            onClick={handleMerge}
            disabled={files.length < 2 || loading}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                {t('common.processing')}
              </>
            ) : (
              <>
                <FilePlus2 className="w-6 h-6" />
                {t('pdf.mergePDFs')}
              </>
            )}
          </button>
        )}

        {/* Resultado exitoso */}
        {mergedPdf && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-800">{t('pdf.mergeComplete')}</h3>
                <p className="text-green-600">{t('pdf.mergeSuccess')}</p>
              </div>
            </div>
            <button
              onClick={downloadMerged}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6" />
              {t('pdf.downloadMerged')}
            </button>
          </div>
        )}
      </div>
        </div>
      </ToolLayout>
    </>
  );
}
