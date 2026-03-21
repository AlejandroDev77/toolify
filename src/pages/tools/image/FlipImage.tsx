import { useState } from 'react';
import SEO from '../../../components/SEO';
import { seoConfig } from '../../../utils/seoConfig';
import FileUploader from '../../../components/shared/FileUploader';
import DownloadButton from '../../../components/shared/DownloadButton';
import ToolLayout from '../../ToolLayout';
import { FlipHorizontal as FlipHorIcon, ArrowLeftRight, ArrowUpDown } from 'lucide-react';

export default function FlipImage() {
  const [preview, setPreview] = useState<string>('');
  const [flippedUrl, setFlippedUrl] = useState<string>('');
  const [flipped, setFlipped] = useState<{ horizontal: boolean; vertical: boolean }>({
    horizontal: false,
    vertical: false,
  });
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFileSelect = (file: File) => {
    setFlipped({ horizontal: false, vertical: false });
    setFlippedUrl('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const flipImage = async () => {
    if (!preview) return;

    setIsFlipping(true);

    try {
      const img = new Image();
      img.src = preview;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.translate(
          flipped.horizontal ? img.width : 0,
          flipped.vertical ? img.height : 0
        );

        ctx.scale(
          flipped.horizontal ? -1 : 1,
          flipped.vertical ? -1 : 1
        );

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setFlippedUrl(url);
            }
            setIsFlipping(false);
          },
          'image/png'
        );
      };
    } catch (error) {
      console.error('Error:', error);
      setIsFlipping(false);
    }
  };

  return (
    <>
      <SEO {...seoConfig.flipImage} />
      <ToolLayout
        title="Voltear Imagen"
        description="Refleja horizontal o verticalmente tus imágenes para lograr el aspecto de espejo deseado."
        icon={FlipHorIcon}
      >
      <div className="space-y-8">
        {!preview ? (
          <div className="space-y-12">
            <FileUploader 
              onFileSelect={handleFileSelect} 
              accept="image/*" 
              title="Sube una imagen para voltear"
            />
            
            {/* Features Section */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-pink-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-600">
                   <ArrowLeftRight className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Efecto Espejo Horizontal</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Invierte la imagen de lado a lado. Ideal para selfies frontales o cambios de perspectiva dramáticos.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                 <div className="bg-teal-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-600">
                   <ArrowUpDown className="w-8 h-8" />
                 </div>
                 <h4 className="text-lg font-bold text-gray-900 mb-3">Efecto Espejo Vertical</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">Da la vuelta a la imagen de arriba hacia abajo para reflejos acuáticos o correcciones rápidas.</p>
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
                <h3 className="font-semibold mb-3">Vista previa</h3>
                <div className="flex justify-center items-center bg-gray-50 rounded-lg border border-gray-200 min-h-96">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-96 max-w-full rounded"
                    style={{
                      transform: `${flipped.horizontal ? 'scaleX(-1)' : ''} ${flipped.vertical ? 'scaleY(-1)' : ''}`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flipped.horizontal}
                    onChange={(e) =>
                      setFlipped({ ...flipped, horizontal: e.target.checked })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="font-medium text-gray-700">Voltear horizontalmente (↔️)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flipped.vertical}
                    onChange={(e) =>
                      setFlipped({ ...flipped, vertical: e.target.checked })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="font-medium text-gray-700">Voltear verticalmente (↕️)</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={flipImage}
                disabled={isFlipping}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isFlipping ? 'Volteando...' : 'Aplicar Volteo'}
              </button>
              <button
                onClick={() => {
                  setPreview('');
                  setFlipped({ horizontal: false, vertical: false });
                  setFlippedUrl('');
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Nueva imagen
              </button>
            </div>

            {flippedUrl && (
              <DownloadButton
                fileName={`flipped-${Date.now()}.png`}
                fileUrl={flippedUrl}
              />
            )}
          </div>
        )}
      </div>
    </ToolLayout>
    </>
  );
}
