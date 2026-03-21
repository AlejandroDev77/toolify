import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, Download, Hash, CheckCircle2, Loader2, AlignCenter, AlignLeft, AlignRight, FileText } from 'lucide-react';
import { addPageNumbers } from '../../../utils/pdf/pdfOperations';
import ToolLayout from '../../ToolLayout';
import SEO from '../../../components/SEO';

export default function AddPageNumbers() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [numberedPdf, setNumberedPdf] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [position, setPosition] = useState<'center' | 'left' | 'right'>('center');

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
        setNumberedPdf(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setNumberedPdf(null);
    }
  };

  const handleAddNumbers = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const numbered = await addPageNumbers(file);
      setNumberedPdf(numbered);
    } catch (error) {
      console.error('Error adding page numbers:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const downloadNumbered = () => {
    if (!numberedPdf) return;
    
    const blob = new Blob([numberedPdf as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'numbered.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title={t('tools.addpagenumbers.title')}
        description={t('tools.addpagenumbers.longDescription')}
        keywords={t('tools.addpagenumbers.keywords')}
      />
      <ToolLayout
        title={t('tools.addpagenumbers.name')}
        description={t('tools.addpagenumbers.description')}
        icon={Hash}
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
                    ? 'border-pink-500 bg-pink-50 scale-105' 
                    : 'border-gray-300 hover:border-pink-400 hover:bg-gray-50'
                }`}>
                  <div className={`transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
                    <FileUp className="w-16 h-16 mx-auto mb-4 text-pink-500" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      {dragActive ? t('pdf.dropHere') : t('pdf.dragOrClick')}
                    </p>
                    <p className="text-sm text-gray-500">{t('pdf.selectPDFToNumber')}</p>
                    <div className="mt-4 inline-block bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition">
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
            {file && !numberedPdf && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                      <FileText className="w-12 h-12 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                {/* Configuración de posición */}
                <div className="mb-6">
                  <label className="block text-lg font-bold text-gray-800 mb-4">
                    {t('pdf.numberPosition')}
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setPosition('left')}
                      className={`p-6 rounded-xl border-3 transition-all duration-300 flex flex-col items-center gap-3 ${
                        position === 'left'
                          ? 'border-pink-500 bg-pink-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-4 rounded-full transition ${
                        position === 'left' ? 'bg-pink-500' : 'bg-gray-200'
                      }`}>
                        <AlignLeft className={`w-8 h-8 ${
                          position === 'left' ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className={`font-bold text-lg ${
                        position === 'left' ? 'text-pink-600' : 'text-gray-700'
                      }`}>{t('pdf.left')}</span>
                    </button>

                    <button
                      onClick={() => setPosition('center')}
                      className={`p-6 rounded-xl border-3 transition-all duration-300 flex flex-col items-center gap-3 ${
                        position === 'center'
                          ? 'border-pink-500 bg-pink-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-4 rounded-full transition ${
                        position === 'center' ? 'bg-pink-500' : 'bg-gray-200'
                      }`}>
                        <AlignCenter className={`w-8 h-8 ${
                          position === 'center' ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className={`font-bold text-lg ${
                        position === 'center' ? 'text-pink-600' : 'text-gray-700'
                      }`}>{t('pdf.center')}</span>
                    </button>

                    <button
                      onClick={() => setPosition('right')}
                      className={`p-6 rounded-xl border-3 transition-all duration-300 flex flex-col items-center gap-3 ${
                        position === 'right'
                          ? 'border-pink-500 bg-pink-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-4 rounded-full transition ${
                        position === 'right' ? 'bg-pink-500' : 'bg-gray-200'
                      }`}>
                        <AlignRight className={`w-8 h-8 ${
                          position === 'right' ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className={`font-bold text-lg ${
                        position === 'right' ? 'text-pink-600' : 'text-gray-700'
                      }`}>{t('pdf.right')}</span>
                    </button>
                  </div>
                </div>

                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Hash className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">{t('pdf.pageNumbersInfo')}</p>
                      <p className="text-sm text-blue-700 mt-1">{t('pdf.pageNumbersPosition')}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleAddNumbers}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-rose-600 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {t('common.processing')}
                    </>
                  ) : (
                    <>
                      <Hash className="w-6 h-6" />
                      {t('pdf.addPageNumbers')}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Resultado */}
            {numberedPdf && (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-500 p-3 rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800">{t('pdf.numberingComplete')}</h3>
                      <p className="text-green-600">{t('pdf.numberingSuccess')}</p>
                    </div>
                  </div>

                  <button
                    onClick={downloadNumbered}
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
