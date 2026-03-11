import { useState } from 'react';
import FileUploader from '../../components/shared/FileUploader';
import ToolLayout from '../ToolLayout';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';

export default function ImageToWebp() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFile: File) => {
    setError('');
    if (!selectedFile.type.includes('image')) {
      setError('Por favor sube un archivo de imagen válido.');
      return;
    }
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setConvertedUrl('');
  };

  const processConvert = () => {
    if (!file || !preview) return;
    setIsConverting(true);
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw image
      ctx.drawImage(img, 0, 0);
      
      // Convert to WebP 
      const converted = canvas.toDataURL('image/webp', 0.85); // 0.85 quality
      setConvertedUrl(converted);
      setIsConverting(false);
    };
    img.onerror = () => {
      setError('Error al procesar la imagen.');
      setIsConverting(false);
    };
  };

  const handleDownload = () => {
    if (!convertedUrl) return;
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = `convertido-${file?.name.replace(/\.[^/.]+$/, '.webp') || 'imagen.webp'}`;
    link.click();
  };

  const resetAll = () => {
    setFile(null);
    setPreview('');
    setConvertedUrl('');
    setError('');
  };

  return (
    <ToolLayout
      title="Image → WebP"
      description="Convierte tus imágenes a formato WebP, el formato más eficiente para la web."
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-200">
            <AlertCircle className="w-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!file ? (
          <FileUploader
            accept="image/*"
            title="Sube cualquier imagen"
            onFileSelect={handleFileSelect}
          />
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mb-8">
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Original</span>
                <div className="relative w-full aspect-square border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img src={preview} alt="Original" className="max-w-full max-h-full object-contain p-2" />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Resultado (WebP)</span>
                <div className="relative w-full aspect-square border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  {convertedUrl ? (
                    <img src={convertedUrl} alt="Convertido" className="max-w-full max-h-full object-contain p-2" />
                  ) : (
                    <div className="text-gray-400 text-sm flex flex-col items-center gap-2">
                       <RefreshCw className="w-8 h-8 opacity-20" />
                       <p>Esperando conversión...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={resetAll}
                className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
              >
                Subir otra imagen
              </button>
              
              {!convertedUrl ? (
                <button
                  onClick={processConvert}
                  disabled={isConverting}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 ${isConverting ? 'animate-spin' : ''}`} />
                  {isConverting ? 'Convirtiendo...' : 'Convertir a WebP'}
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Descargar WebP
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
