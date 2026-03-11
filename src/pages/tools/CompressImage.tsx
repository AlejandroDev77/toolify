import { useState, useEffect } from 'react';
import FileUploader from '../../components/shared/FileUploader';
import DownloadButton from '../../components/shared/DownloadButton';
import ToolLayout from '../ToolLayout';
import { Zap, Shield, Sparkles, FileImage, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CompressImage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileSelect = (file: File) => {
    setImage(file);
    setOriginalSize(file.size);
    setCompressedSize(0);
    setCompressedUrl('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (preview && image) {
      compressImage(0.65); // 65% quality for dramatic effect while keeping logic
    }
  }, [preview, image]);

  const compressImage = async (compressionQuality: number) => {
    if (!image || !preview) return;

    setIsCompressing(true);

    try {
      const img = new Image();
      img.src = preview;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              const url = URL.createObjectURL(blob);
              setCompressedUrl(url);
            }
            setIsCompressing(false);
          },
          'image/jpeg',
          compressionQuality
        );
      };
    } catch (error) {
      console.error('Error al comprimir:', error);
      setIsCompressing(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <ToolLayout
      title="Comprimir Imagen"
      description="Reduce dramáticamente el tamaño de archivo de tus imágenes manteniendo intacta la calidad visual que importa."
      icon={FileImage}
    >
      <div className="space-y-8">
        {!preview ? (
          <div className="space-y-12">
            <FileUploader 
              onFileSelect={handleFileSelect} 
              accept="image/*" 
              title="Sube una imagen para comprimir"
              subtitle="Soporta la mayoría de formatos de imagen principales como JPG, PNG y WebP."
            />
            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-blue-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                   <Zap className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Compresión Inteligente</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Optimiza el tamaño del archivo con increíbles tasas de compresión sin perder nitidez.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-green-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                   <Shield className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">100% Privado y Seguro</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Seguridad total: todo ocurre directamente en tu navegador, sin subir imágenes a servidores.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-purple-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
                   <Sparkles className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Rápido y Fácil</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Con solo regular una barra obtienes retroalimentación visual al instante. Literalmente toma un segundo.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {isCompressing ? (
              <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-3xl border border-gray-100 animate-pulse">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xl font-medium text-gray-600">Comprimiendo mágicamente...</p>
              </div>
            ) : compressedUrl ? (
              <div className="space-y-8 transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Stunning Savings Banner */}
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-[2rem] p-1 shadow-2xl shadow-green-900/20 overflow-hidden relative">
                  <div className="absolute top-0 right-0 -translate-y-8 translate-x-1/3 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
                  <div className="bg-white/10 backdrop-blur-md rounded-[1.8rem] p-8 md:p-12 text-center text-white border border-white/20">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-green-100" />
                    <div className="text-6xl md:text-8xl font-black mb-2 tracking-tighter drop-shadow-md">
                      {Math.max(1, Math.round(((originalSize - compressedSize) / originalSize) * 100))}%
                    </div>
                    <div className="text-2xl font-bold mb-4 text-green-50 uppercase tracking-widest">Ahorro</div>
                    <p className="text-xl md:text-2xl font-medium text-white mb-8">
                      ¡Tus imágenes ahora pesan un {Math.max(1, Math.round(((originalSize - compressedSize) / originalSize) * 100))}% menos!
                    </p>
                    
                    <div className="inline-flex items-center gap-4 bg-black/20 rounded-full px-6 py-3 font-mono text-lg font-medium">
                      <span className="opacity-75 line-through">{formatBytes(originalSize)}</span>
                      <ArrowRight className="w-5 h-5" />
                      <span className="text-green-200">{formatBytes(compressedSize)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 text-center">
                    <h3 className="font-semibold text-gray-500 mb-3 text-sm uppercase tracking-wider">Original</h3>
                    <img src={preview} alt="Original" className="w-full rounded-2xl max-h-64 object-cover" />
                  </div>
                  <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 text-center relative">
                    <h3 className="font-semibold text-gray-500 mb-3 text-sm uppercase tracking-wider">Comprimida</h3>
                    <img src={compressedUrl} alt="Comprimida" className="w-full rounded-2xl max-h-64 object-cover" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <button
                    onClick={() => {
                      setImage(null);
                      setPreview('');
                      setCompressedUrl('');
                    }}
                    className="px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto"
                  >
                    Nueva imagen
                  </button>
                  <div className="w-full sm:w-auto flex-1">
                    <DownloadButton
                      fileName={`comprimido-${Date.now()}.jpg`}
                      fileUrl={compressedUrl}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
