import { useState } from 'react';
import SEO from '../../components/SEO';
import { seoConfig } from '../../utils/seoConfig';
import FileUploader from '../../components/shared/FileUploader';
import ToolLayout from '../ToolLayout';
import { Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

export default function ImageToBase64() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [base64, setBase64] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setError('');
    if (!selectedFile.type.includes('image')) {
      setError('Por favor sube un archivo de imagen válido.');
      return;
    }
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setBase64('');
    setCopied(false);
  };

  const processConvert = () => {
    if (!file) return;
    setIsConverting(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result as string);
      setIsConverting(false);
    };
    reader.onerror = () => {
      setError('Error al leer el archivo.');
      setIsConverting(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (!base64) return;
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setFile(null);
    setPreview('');
    setBase64('');
    setError('');
    setCopied(false);
  };

  return (
    <>
      <SEO {...seoConfig.imageToBase64} />
      <ToolLayout
        title="Image → Base64"
        description="Convierte imágenes a una cadena Base64 para incrustarlas directamente en tu código HTML o CSS."
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
            title="Sube tu imagen para codificarla"
            onFileSelect={handleFileSelect}
          />
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Imagen Original</span>
                <div className="relative w-full aspect-video md:aspect-square border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img src={preview} alt="Original" className="max-w-full max-h-full object-contain p-2" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Código Base64</span>
                  {base64 && (
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copiado' : 'Copiar código'}
                    </button>
                  )}
                </div>
                
                <div className="relative w-full flex-grow border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-4">
                  {base64 ? (
                    <textarea
                      readOnly
                      value={base64}
                      className="w-full h-full min-h-[250px] bg-transparent resize-none outline-none text-xs text-slate-700 font-mono break-all"
                    />
                  ) : (
                    <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 text-sm gap-2">
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
              
              {!base64 && (
                <button
                  onClick={processConvert}
                  disabled={isConverting}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 ${isConverting ? 'animate-spin' : ''}`} />
                  {isConverting ? 'Convirtiendo...' : 'Convertir a Base64'}
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
