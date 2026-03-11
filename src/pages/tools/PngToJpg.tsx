import { useState } from 'react';
import SEO from '../../components/SEO';
import { seoConfig } from '../../utils/seoConfig';
import FileUploader from '../../components/shared/FileUploader';
import ToolLayout from '../ToolLayout';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';

export default function PngToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFile: File) => {
    setError('');
    if (!selectedFile.type.includes('png')) {
      setError('Por favor sube un archivo PNG válido.');
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
      
      // Fill with white to prevent transparent background from turning black in JPG
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const converted = canvas.toDataURL('image/jpeg', 0.9);
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
    link.download = `convertido-${file?.name.replace('.png', '.jpg') || 'imagen.jpg'}`;
    link.click();
  };

  const resetAll = () => {
    setFile(null);
    setPreview('');
    setConvertedUrl('');
    setError('');
  };

  return (
    <>
      <SEO {...seoConfig.pngToJpg} />
      <ToolLayout
        title="PNG → JPG"
        description="Convierte imágenes PNG a formato JPG de alta calidad con fondo blanco para las transparencias."
      >
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!file ? (
          <FileUploader
            accept="image/png"
            title="Sube tu imagen PNG"
            onFileSelect={handleFileSelect}
          />
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mb-8">
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Original (PNG)</span>
                <div className="relative w-full aspect-square border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img src={preview} alt="Original" className="max-w-full max-h-full object-contain p-2" />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Resultado (JPG)</span>
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
                  {isConverting ? 'Convirtiendo...' : 'Convertir a JPG'}
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Descargar JPG
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
    </>
  );
}
