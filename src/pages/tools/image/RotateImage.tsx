import { useState } from 'react';
import SEO from '../../../components/SEO';
import { seoConfig } from '../../../utils/seoConfig';
import FileUploader from '../../../components/shared/FileUploader';
import DownloadButton from '../../../components/shared/DownloadButton';
import ToolLayout from '../../ToolLayout';
import { RotateCw, Settings2, Image as ImageIcon } from 'lucide-react';

export default function RotateImage() {
  const [preview, setPreview] = useState<string>('');
  const [rotation, setRotation] = useState(0);
  const [rotatedUrl, setRotatedUrl] = useState<string>('');
  const [isRotating, setIsRotating] = useState(false);

  const handleFileSelect = (file: File) => {
    setRotation(0);
    setRotatedUrl('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const rotateImage = async () => {
    if (!preview) return;

    setIsRotating(true);

    try {
      const img = new Image();
      img.src = preview;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const radians = (rotation * Math.PI) / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        const newWidth = Math.abs(img.width * cos) + Math.abs(img.height * sin);
        const newHeight = Math.abs(img.width * sin) + Math.abs(img.height * cos);

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(radians);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setRotatedUrl(url);
            }
            setIsRotating(false);
          },
          'image/png'
        );
      };
    } catch (error) {
      console.error('Error:', error);
      setIsRotating(false);
    }
  };

  const quickRotate = (angle: number) => {
    setRotation((r) => (r + angle) % 360);
  };

  return (
    <>
      <SEO {...seoConfig.rotateImage} />
      <ToolLayout
        title="Rotar Imagen"
        description="Gira y reorienta tus fotografías e imágenes en cualquier ángulo exacto."
        icon={RotateCw}
      >
      <div className="space-y-8">
        {!preview ? (
          <div className="space-y-12">
            <FileUploader 
              onFileSelect={handleFileSelect} 
              accept="image/*" 
              title="Sube una imagen para rotar"
            />
            
            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-orange-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-600">
                   <RotateCw className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Rotación Dinámica</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Libertad total de 360 grados usando nuestro control deslizante numérico avanzado.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-blue-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                   <Settings2 className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Atajos de 90°</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Ajustes preconfigurados que permiten corregir posiciones horizontales o verticales al instante.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-emerald-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                   <ImageIcon className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Adaptación Automática</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">El contenedor final recalculado respeta los límites sin cortar las esquinas de tu imagen.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Original</h3>
                <img src={preview} alt="Original" className="w-full rounded-lg border border-gray-200 max-h-96" />
              </div>

              <div>
                <h3 className="font-semibold mb-3">Vista previa ({rotation}°)</h3>
                <div className="flex justify-center items-center bg-gray-50 rounded-lg border border-gray-200 min-h-96">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-96 max-w-full rounded"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rotación: {rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[90, 180, 270, 45].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => quickRotate(angle)}
                    className="py-2 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
                  >
                    +{angle}°
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={rotateImage}
                disabled={isRotating}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isRotating ? 'Rotando...' : 'Aplicar Rotación'}
              </button>
              <button
                onClick={() => {
                  setPreview('');
                  setRotation(0);
                  setRotatedUrl('');
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Nueva imagen
              </button>
            </div>

            {rotatedUrl && (
              <DownloadButton
                fileName={`rotated-${rotation}deg-${Date.now()}.png`}
                fileUrl={rotatedUrl}
              />
            )}
          </div>
        )}
      </div>
    </ToolLayout>
    </>
  );
}
