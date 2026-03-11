import { useState, useRef, useEffect } from 'react';
import type { MouseEvent } from 'react';
import FileUploader from '../../components/shared/FileUploader';
import ToolLayout from '../ToolLayout';
import { Copy, Check, MousePointer2, AlertCircle } from 'lucide-react';

export default function ColorPicker() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverColor, setHoverColor] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setError('');
    if (!selectedFile.type.includes('image')) {
      setError('Por favor sube un archivo de imagen válido.');
      return;
    }
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  useEffect(() => {
    if (preview && imgRef.current && canvasRef.current) {
      const img = imgRef.current;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
      };
    }
  }, [preview]);

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  };

  const getColorAtEvent = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    if (pixel[3] === 0) return null; // transparent
    return rgbToHex(pixel[0], pixel[1], pixel[2]);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    setIsHovering(true);
    const hex = getColorAtEvent(e);
    if (hex) setHoverColor(hex);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const hex = getColorAtEvent(e);
    if (hex) setSelectedColor(hex);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setFile(null);
    setPreview('');
    setSelectedColor('#FFFFFF');
    setError('');
    setCopied(false);
  };

  return (
    <ToolLayout
      title="Selector de Color"
      description="Extrae colores de tus imágenes. Sube una imagen y haz clic en cualquier parte para obtener el código de color HEX."
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
            title="Sube una imagen para extraer colores"
            onFileSelect={handleFileSelect}
          />
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8">
              <div className="md:col-span-2 flex flex-col">
                <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <MousePointer2 className="w-4 h-4" />
                  Haz Clic para Extraer Color
                </span>
                <div className="relative w-full border-2 border-slate-200 overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDQgNEw4IDBMMCAwaDR2NEgwdjRaIiBmaWxsPSIjZTllOWU5IiAvPgo8L3N2Zz4=')] flex items-center justify-center cursor-crosshair group rounded-xl">
                  {/* Hidden image to load the data */}
                  <img 
                    ref={imgRef}
                    src={preview} 
                    alt="Original hidden" 
                    className="hidden" 
                    crossOrigin="anonymous"
                  />
                  {/* The interactive canvas */}
                  <canvas 
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    className="max-w-full max-h-[500px] object-contain transition-opacity hover:opacity-95"
                  />
                  
                  {isHovering && hoverColor && (
                   <div 
                      className="absolute pointer-events-none w-16 h-16 rounded-full border-[3px] border-white shadow-lg z-10 block"
                      style={{ 
                        backgroundColor: hoverColor,
                        top: '1rem',
                        right: '1rem',
                      }}
                    >
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-xs font-mono font-bold bg-gray-900 text-white px-2 py-1 rounded shadow-md mt-1">
                        {hoverColor}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider block">
                    Color Seleccionado
                  </span>
                  <div className="w-full aspect-video rounded-xl shadow-inner border border-gray-200 mb-4 transition-colors duration-300" style={{ backgroundColor: selectedColor }}></div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-sm text-gray-500 font-medium">HEX</span>
                       <button
                         onClick={handleCopy}
                         className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition"
                       >
                         {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                         {copied ? 'Copiado' : 'Copiar'}
                       </button>
                     </div>
                     <span className="text-2xl font-mono text-gray-800 font-bold block">{selectedColor}</span>
                  </div>
                </div>
                
                <button
                  onClick={resetAll}
                  className="w-full px-6 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors mt-auto"
                >
                  Subir otra imagen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
