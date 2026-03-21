import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, Download, Scissors, CheckCircle2, Loader2, FileText, Check } from 'lucide-react';
import { splitPDF } from '../../../utils/pdf/pdfOperations';
import ToolLayout from '../../ToolLayout';
import SEO from '../../../components/SEO';
import PDFPagePreview from '../../../components/pdf/PDFPagePreview';

export default function SplitPDF() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [splitPages, setSplitPages] = useState<Uint8Array[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());

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
        setSplitPages([]);
        setSelectedPages(new Set());
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSplitPages([]);
      setSelectedPages(new Set());
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const pages = await splitPDF(file);
      setSplitPages(pages);
      // Seleccionar todas las páginas por defecto
      setSelectedPages(new Set(pages.map((_, i) => i)));
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const togglePageSelection = (index: number) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedPages(newSelected);
  };

  const selectAll = () => {
    setSelectedPages(new Set(splitPages.map((_, i) => i)));
  };

  const deselectAll = () => {
    setSelectedPages(new Set());
  };

  const downloadPage = (pageData: Uint8Array, index: number) => {
    const blob = new Blob([pageData as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `page-${index + 1}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSelected = () => {
    const sortedIndices = Array.from(selectedPages).sort((a, b) => a - b);
    sortedIndices.forEach((index, i) => {
      setTimeout(() => downloadPage(splitPages[index], index), i * 100);
    });
  };

  return (
    <>
      <SEO 
        title={t('tools.splitpdf.title')}
        description={t('tools.splitpdf.longDescription')}
        keywords={t('tools.splitpdf.keywords')}
      />
      <ToolLayout
        title={t('tools.splitpdf.name')}
        description={t('tools.splitpdf.description')}
        icon={Scissors}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 mb-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                  <span className="font-semibold">{t('pdf.uploadPDF')}</span>
                </div>
                <p className="text-sm text-white/80">{t('pdf.uploadPDFDesc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                  <span className="font-semibold">{t('pdf.splitPages')}</span>
                </div>
                <p className="text-sm text-white/80">{t('pdf.splitPagesDesc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                  <span className="font-semibold">{t('pdf.downloadPages')}</span>
                </div>
                <p className="text-sm text-white/80">{t('pdf.downloadPagesDesc')}</p>
              </div>
            </div>
          </div>

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
                    ? 'border-blue-500 bg-blue-50 scale-105' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}>
                  <div className={`transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
                    <FileUp className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      {dragActive ? t('pdf.dropHere') : t('pdf.dragOrClick')}
                    </p>
                    <p className="text-sm text-gray-500">{t('pdf.selectPDFToSplit')}</p>
                    <div className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
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
            {file && splitPages.length === 0 && (
              <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                
                <button
                  onClick={handleSplit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {t('common.processing')}
                    </>
                  ) : (
                    <>
                      <Scissors className="w-6 h-6" />
                      {t('pdf.splitPDF')}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Páginas divididas con selección */}
            {splitPages.length > 0 && (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-500 p-3 rounded-full">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-800">{t('pdf.splitComplete')}</h3>
                        <p className="text-green-600">
                          {selectedPages.size} {t('pdf.of')} {splitPages.length} {t('pdf.pagesSelected')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={selectAll}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
                      >
                        {t('pdf.selectAll')}
                      </button>
                      <button
                        onClick={deselectAll}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 transition"
                      >
                        {t('pdf.deselectAll')}
                      </button>
                      <button
                        onClick={downloadSelected}
                        disabled={selectedPages.size === 0}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
                      >
                        <Download className="w-5 h-5" />
                        {t('pdf.downloadSelected')}
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {t('pdf.pages')} ({splitPages.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {splitPages.map((pageData, index) => {
                    const isSelected = selectedPages.has(index);
                    return (
                      <div
                        key={index}
                        onClick={() => togglePageSelection(index)}
                        className={`group relative bg-white p-3 rounded-xl transition-all duration-300 border-2 cursor-pointer ${
                          isSelected
                            ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        {/* Checkbox visual */}
                        <div className={`absolute top-1 right-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                          isSelected
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white border-gray-300 group-hover:border-blue-400'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          {/* Vista previa del PDF */}
                          <div className="w-full flex justify-center">
                            <PDFPagePreview 
                              pageData={pageData}
                              pageNumber={index + 1}
                              width={140}
                              height={180}
                            />
                          </div>
                          <span className={`text-sm font-bold transition ${
                            isSelected ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {t('pdf.page')} {index + 1}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
