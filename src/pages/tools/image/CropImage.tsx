import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import { seoConfig } from '../../../utils/seoConfig';
import FileUploader from '../../../components/shared/FileUploader';
import ToolLayout from '../../ToolLayout';
import { Download, AlertCircle, Crop as CropIcon, MousePointerSquareDashed, Focus, Frame } from 'lucide-react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function CropImage() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string>('');
  const [error, setError] = useState('');
  
  const imgRef = useRef<HTMLImageElement>(null);

  const handleManualCropChange = (field: keyof PixelCrop, value: number) => {
    if (!completedCrop) return;
    const newCrop = { ...completedCrop, [field]: value };
    setCompletedCrop(newCrop);
    setCrop(newCrop);
  };

  const handleFileSelect = (selectedFile: File) => {
    setError('');
    if (!selectedFile.type.includes('image')) {
      setError(t('common.pleaseUploadValidImage'));
      return;
    }
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setCroppedUrl('');
    setCompletedCrop(null);
    setCrop(undefined);
  };

  const processCrop = () => {
    if (!completedCrop || !imgRef.current) return;
    
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    
    const base64Image = canvas.toDataURL('image/png');
    setCroppedUrl(base64Image);
  };

  const handleDownload = () => {
    if (!croppedUrl) return;
    const link = document.createElement('a');
    link.href = croppedUrl;
    link.download = `recortado-${file?.name || 'imagen.png'}`;
    link.click();
  };

  const resetAll = () => {
    setFile(null);
    setPreview('');
    setCrop(undefined);
    setCompletedCrop(null);
    setCroppedUrl('');
    setError('');
  };

  return (
    <>
      <SEO {...seoConfig.cropImage} />
      <ToolLayout
        title="Recortar Imagen"
        description="Recorta partes específicas de tus imágenes con precisión y facilidad."
      >
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-200">
            <AlertCircle className="w-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!file ? (
          <div className="space-y-12">
            <FileUploader
              accept="image/*"
              title="Sube una imagen para recortar"
              onFileSelect={handleFileSelect}
            />

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-indigo-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                   <MousePointerSquareDashed className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Recorte Interactivo Libre</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Dibuja cómodamente sobre tu imagen usando el ratón o comandos precisos para delimitar el área.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-emerald-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                   <Focus className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Control Matemático</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Usa nuestros campos numéricos exactos de ancho, alto y coordenadas para ajustes profesionales detallados.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-fuchsia-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-fuchsia-600">
                   <Frame className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Extracción Transparente</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Todo el proceso retiene la limpieza visual y convierte instantáneamente el recorte en formato PNG universal de alta calidad.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-8">
              <div className="lg:col-span-2 flex flex-col items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                <div className="w-full flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Área de Trabajo
                  </span>
                  <span className="text-xs font-medium bg-white px-3 py-1 rounded-full text-indigo-600 shadow-sm border border-indigo-100">
                    Interactiva
                  </span>
                </div>
                <div className="relative w-full border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDQgNEw4IDBMMCAwaDR2NEgwdjRaIiBmaWxsPSIjZTllOWU5IiAvPgo8L3N2Zz4=')] flex items-center justify-center p-2 min-h-[400px]">
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    className="max-w-full max-h-[600px]"
                  >
                    <img 
                      ref={imgRef}
                      src={preview} 
                      alt="Para recortar" 
                      className="max-w-full max-h-[600px] object-contain shadow-lg"
                    />
                  </ReactCrop>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                {/* Crop Options Panel */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10">
                    <CropIcon className="w-5 h-5 text-indigo-600" />
                    Opciones de Recorte
                  </h3>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ancho (px)</label>
                        <input 
                          type="number" 
                          value={completedCrop?.width ? Math.round(completedCrop.width) : 0} 
                          onChange={(e) => handleManualCropChange('width', Number(e.target.value))}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Altura (px)</label>
                        <input 
                          type="number" 
                          value={completedCrop?.height ? Math.round(completedCrop.height) : 0} 
                          onChange={(e) => handleManualCropChange('height', Number(e.target.value))}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Posición X (px)</label>
                        <input 
                          type="number" 
                          value={completedCrop?.x ? Math.round(completedCrop.x) : 0} 
                          onChange={(e) => handleManualCropChange('x', Number(e.target.value))}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Posición Y (px)</label>
                        <input 
                          type="number" 
                          value={completedCrop?.y ? Math.round(completedCrop.y) : 0} 
                          onChange={(e) => handleManualCropChange('y', Number(e.target.value))}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-inner flex flex-col items-center justify-center flex-1 min-h-[250px] relative overflow-hidden">
                  <span className="absolute top-4 left-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Resultado Final
                  </span>
                  {croppedUrl ? (
                    <img src={croppedUrl} alt="Convertido" className="max-w-full max-h-[250px] object-contain p-2 drop-shadow-xl z-10 mt-6 rounded-md" />
                  ) : (
                    <div className="text-gray-400 text-sm flex flex-col items-center gap-3 text-center p-8 z-10">
                       <CropIcon className="w-10 h-10 opacity-20 mb-2" />
                       <p className="font-medium opacity-60">Realiza una selección para ver el resultado mágico</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 w-full max-w-6xl mx-auto">
              <button
                onClick={resetAll}
                className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
              >
                Subir otra imagen
              </button>
              
              {!croppedUrl ? (
                <button
                  onClick={processCrop}
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <CropIcon className="w-5 h-5" />
                  Recortar Imagen
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setCroppedUrl('')}
                    className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Ajustar recorte
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Descargar Recorte
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-5xl mx-auto">
        <article className="prose prose-indigo max-w-none text-gray-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recortar Imágenes Online Gratis</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">
            Nuestra herramienta gratuita para <strong>recortar imágenes</strong> te permite extraer la parte exacta que necesitas de cualquier fotografía. Ya sea para enfocar la atención en el sujeto principal, eliminar fondos no deseados o adaptar la imagen a las estrictas proporciones de las redes sociales, este recortador online te da una precisión de píxel invaluable.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">¿Por qué recortar una imagen?</h3>
          <p className="mb-4">
            El recorte no solo sirve para mejorar la composición estética (como aplicar la regla de los tercios). Algunos de los casos de uso más urgentes incluyen:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Fotos de Perfil y CV:</strong> Centrar la cara y eliminar distracciones para perfiles de LinkedIn o currículos profesionales.</li>
            <li><strong>Redes Sociales:</strong> Adaptar automáticamente tus fotos a los formatos cuadrados (1:1), verticales de Historias (9:16) o portadas (16:9) que exigen plataformas como Instagram o YouTube.</li>
            <li><strong>Eliminación de elementos o marcas de agua:</strong> Remover los bordes de la pantalla (si fue una captura de pantalla) accidentalmente incluidos en la foto.</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">¿Cómo usar la herramienta de recorte de Toolify?</h3>
          <p className="mb-4">
            A diferencia de complicados programas tradicionales como Photoshop, recortar una imagen en nuestra plataforma no tiene curva de aprendizaje:
          </p>
          <ol className="list-decimal pl-6 mb-8 space-y-2">
            <li>Sube tu imagen (JPG, PNG, WebP) desde tu dispositivo o simplemente arrástrala a la cuadricula principal.</li>
            <li>Con el ratón de tu ordenador o tu dedo (en móvil), usa la zona interactiva para <strong>trazar el rectángulo</strong> sobre el área que deseas conservar.</li>
            <li>Si requieres ajustes matemáticos precisos, utiliza nuestro panel de <em>Opciones de Recorte</em> (Modo Control Numérico) para especificar el ancho y alto en píxeles.</li>
            <li>Una vez conforme con la <em>Vista Previa</em>, haz clic en "Descargar Recorte" y obtendrás la nueva imagen en alta resolución de manera inmediata.</li>
          </ol>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Seguridad 100% Garantizada (Client-Side)</h3>
          <p>
            Al igual que el proceso de compresión, esta herramienta de recorte <strong>procesa tus fotos de forma local</strong> en el navegador de tu computadora o móvil. Tu imagen original y tu imagen recortada nunca son enviadas a la nube. Esto significa que puedes recortar documentos de identidad, información bancaria y fotos familiares con total tranquilidad y privacidad.
          </p>
        </article>
      </div>
    </ToolLayout>
    </>
  );
}
