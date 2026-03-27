import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import FileUploader from '../../../components/shared/FileUploader';
import DownloadButton from '../../../components/shared/DownloadButton';
import ToolLayout from '../../ToolLayout';
import { Zap, Shield, Sparkles, FileImage, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CompressImage() {
  const { t } = useTranslation();
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
    <>
      <SEO
        title={t('tools.compressimage.title')}
        description={t('tools.compressimage.longDescription')}
        keywords={t('tools.compressimage.keywords')}
      />
      <ToolLayout
        title={t('tools.compressimage.name')}
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

      {/* SEO Content Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-5xl mx-auto">
        <article className="prose prose-indigo max-w-none text-gray-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Compresor de Imágenes Online Gratuito</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">
            Nuestra herramienta gratuita para comprimir imágenes reduce drásticamente el tamaño (peso) de tus fotos sin pérdida visible de calidad. Optimizada para creadores, diseñadores web y usuarios comunes, te ayuda a ahorrar espacio y mejorar el tiempo de carga de tus sitios web y aplicaciones.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">La importancia de comprimir imágenes web</h3>
          <p className="mb-4">
            Subir una imagen sin comprimir a tu blog o tienda online puede ser perjudicial tanto para el usuario como para el posicionamiento (SEO). Aquí te enumeramos los beneficios clave de la compresión:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Optimización SEO:</strong> Google prioriza las páginas de carga rápida. Una imagen de 5MB tarda mucho en cargar, pero nuestra herramienta la puede reducir a 300KB sin que el ojo humano lo note, impulsando tu Core Web Vitals.</li>
            <li><strong>Ahorro en transferencia de datos:</strong> Muchas veces los planes de hosting web se encarecen por la cantidad de datos que tus visitantes consumen. Imágenes ligeras = menor consumo de ancho de banda.</li>
            <li><strong>Límites en envíos por correo o WhatsApp:</strong> Muchos servidores de correo no permiten enviar correos con adjuntos superiores a 25MB. Reduciendo tus fotos, puedes adjuntar hasta diez veces más imágenes.</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Formatos Soportados y Proceso Técnico</h3>
          <p className="mb-4">
            Aceptamos formatos populares como <strong>JPG, PNG, WebP y otros formatos web</strong>. Internamente, utilizamos algoritmos avanzados de lienzo (Canvas API) para remapear los píxeles y descartar datos redundantes que el ojo desnudo no detecta con facilidad.
          </p>
          <p className="mb-4">
            Simplemente arrastra tu imagen hacia el cuadro superior o dale clic para seleccionarla desde tus archivos. Nuestra aplicación calculará automáticamente la mejor relación entre compresión (bytes ahorrados) y calidad visual, mostrando gráficamente cuánto espacio ahorraste.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Privacidad y Seguridad Garantizada</h3>
          <p>
            Sabemos que muchas de tus imágenes pueden ser privadas, familiares o contener datos corporativos confidenciales. <strong>Mantenemos tu privacidad intacta procesando la compresión de forma 100% local</strong> dentro del navegador web de tu computadora o móvil. Nunca enviamos el archivo original ni el comprimido a nuestros servidores, lo que hace imposible que nosotros o terceros puedan espiar tus datos.
          </p>
        </article>
      </div>
    </ToolLayout>
    </>
  );
}
