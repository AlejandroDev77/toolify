import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, Download, Trash2, Image as ImageIcon, CheckCircle2, Loader2, ArrowDown } from 'lucide-react';
import { imagesToPDF } from '../../../utils/pdf/pdfOperations';
import ToolLayout from '../../ToolLayout';
import SEO from '../../../components/SEO';

export default function JPGToPDF() {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
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
    
    if (e.dataTransfer.files) {
      const imageFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type.startsWith('image/')
      );
      addFiles(imageFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      addFiles(newFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
    
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    [newPreviews[index], newPreviews[targetIndex]] = [newPreviews[targetIndex], newPreviews[index]];
    
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    
    setLoading(true);
    try {
      const pdf = await imagesToPDF(files);
      setPdfData(pdf);
    } catch (error) {
      console.error('Error converting to PDF:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!pdfData) return;
    
    const blob = new Blob([pdfData as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title={t('tools.jpgtopdf.title')}
        description={t('tools.jpgtopdf.longDescription')}
        keywords={t('tools.jpgtopdf.keywords')}
      />
      <ToolLayout
        title={t('tools.jpgtopdf.name')}
        description={t('tools.jpgtopdf.description')}
        icon={ImageIcon}
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
                ? 'border-green-500 bg-green-50 scale-105' 
                : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
            }`}>
              <div className={`transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
                <FileUp className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  {dragActive ? t('pdf.dropHere') : t('pdf.dragOrClick')}
                </p>
                <p className="text-sm text-gray-500">{t('pdf.selectImagesToConvert')}</p>
                <div className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                  {t('pdf.selectFiles')}
                </div>
              </div>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Lista de imágenes */}
        {files.length > 0 && !pdfData && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {t('pdf.selectedImages')} ({files.length})
              </h3>
              {files.length >= 1 && (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('pdf.readyToConvert')}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {files.map((file, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-3 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg">
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveFile(index, 'up')}
                          disabled={index === 0}
                          className="text-gray-400 hover:text-green-500 disabled:opacity-30 disabled:cursor-not-allowed transition p-1"
                        >
                          <ArrowDown className="w-3 h-3 rotate-180" />
                        </button>
                        <button
                          onClick={() => moveFile(index, 'down')}
                          disabled={index === files.length - 1}
                          className="text-gray-400 hover:text-green-500 disabled:opacity-30 disabled:cursor-not-allowed transition p-1"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1 rounded transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded-lg mb-2 shadow-sm"
                  />
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600 truncate flex-1">{file.name}</p>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold ml-2">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {t('common.processing')}
                </>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6" />
                  {t('pdf.convertToPDF')}
                </>
              )}
            </button>
          </div>
        )}

        {/* Resultado */}
        {pdfData && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-500 p-3 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">{t('pdf.conversionComplete')}</h3>
                  <p className="text-green-600">{t('pdf.conversionSuccess')}</p>
                </div>
              </div>

              <button
                onClick={downloadPDF}
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
