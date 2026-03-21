import { useState, useRef } from "react";
import SEO from "../../../components/SEO";
import { seoConfig } from "../../../utils/seoConfig";
import FileUploader from "../../../components/shared/FileUploader";
import ToolLayout from "../../ToolLayout";
import {
  Lock,
  Unlock,
  Maximize2,
  Layers,
  Download,
  Image as Hash,
} from "lucide-react";

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isResizing, setIsResizing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = e.target?.result as string;
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspect && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspect && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const applyPercentage = (percent: number) => {
    const newWidth = Math.round(originalDimensions.width * (percent / 100));
    const newHeight = Math.round(originalDimensions.height * (percent / 100));
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const resizeAndDownload = async () => {
    if (!preview || !originalDimensions.width) return;
    setIsResizing(true);

    try {
      const img = new Image();
      img.src = preview;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure transparent backgrounds are retained for PNGs, white for others if needed.
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `redimensionado-${width}x${height}-${file?.name || "imagen.png"}`;
            link.click();
          }
          setIsResizing(false);
        }, file?.type || "image/png");
      };
    } catch (error) {
      console.error("Error al redimensionar:", error);
      setIsResizing(false);
    }
  };

  return (
    <>
      <SEO {...seoConfig.resizeImage} />
      <ToolLayout
        title="Redimensionar Imagen"
        description="Cambia las dimensiones de tus imágenes fácil y rápido. Adapta para diferentes plataformas o propósitos específicos sin perder calida visual."
        icon={Maximize2}
      >
      <div className="space-y-8">
        {!preview ? (
          <div className="space-y-12">
            <FileUploader
              onFileSelect={handleFileSelect}
              accept="image/*"
              title="Sube una imagen para cambiar su tamaño"
            />

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-indigo-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                  <Maximize2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Redimensionado Preciso
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Especifica explícitamente el ancho o el alto usando píxeles
                  para resultados matemáticamente exactos en tus fotos.
                </p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-sky-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-sky-600">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Bloqueo de Proporción
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Mantén automáticamente el aspecto sin deformar ni distorsionar
                  tu imagen usando nuestro candado inteligente.
                </p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-amber-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600">
                  <Layers className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Escalado Dinámico
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Aplica porcentajes rápidos (25%, 50%, 200%) para redimensionar
                  al instante con un solo clic.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
              {/* Interactive Preview Panel */}
              <div className="lg:col-span-2 flex flex-col bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden shadow-inner relative min-h-[500px]">
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-gray-100/80 to-transparent pointer-events-none z-10"></div>

                {/* Visual Feedback Header */}
                <div className="relative z-20 p-6">
                  <div className="flex bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden items-center justify-between">
                    <div className="flex flex-col flex-1 items-center px-4 py-2 border-r border-gray-100 border-dashed">
                      <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Tamaño Original
                      </span>
                      <span className="text-base sm:text-xl font-black text-gray-700">
                        {originalDimensions.width}{" "}
                        <span className="text-gray-300 font-normal px-1">
                          ×
                        </span>{" "}
                        {originalDimensions.height}
                      </span>
                    </div>
                    <div className="px-3 sm:px-6">
                      <div className="bg-indigo-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-indigo-600">
                        <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 items-center px-4 py-2 border-l border-gray-100 border-dashed">
                      <span className="text-[10px] sm:text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
                        Nuevo Tamaño
                      </span>
                      <span className="text-base sm:text-xl font-black text-indigo-600">
                        {width}{" "}
                        <span className="text-indigo-300 font-normal px-1">
                          ×
                        </span>{" "}
                        {height}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preview Image Box */}
                <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDQgNEw4IDBMMCAwaDR2NEgwdjRaIiBmaWxsPSIjZTllOWU5IiAvPgo8L3N2Zz4=')]">
                  <div className="relative group transition-all duration-300">
                    <img
                      ref={imgRef}
                      src={preview}
                      alt="Visualización"
                      className="max-w-full max-h-[400px] object-contain drop-shadow-2xl transition-transform duration-500 ease-out z-10 relative"
                      style={{
                        transform: `scale(${Math.min(1.2, Math.max(0.5, (width / originalDimensions.width) * 0.9 + 0.1))})`,
                      }}
                    />
                    {/* Visual scale indicator glow */}
                    <div className="absolute inset-0 bg-indigo-400 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0"></div>
                  </div>
                </div>
              </div>

              {/* Tools Column */}
              <div className="flex flex-col gap-6">
                {/* Dimensions Editor */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-600" />
                    Ajuste Fino
                  </h3>

                  <div className="space-y-6">
                    {/* Width Input */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Ancho (px)
                        </label>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={width}
                        onChange={(e) =>
                          handleWidthChange(Number(e.target.value))
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-center"
                      />
                    </div>

                    {/* Aspect Ratio Lock Button - Centered */}
                    <div className="flex justify-center -my-3 relative z-10">
                      <button
                        onClick={() => setMaintainAspect(!maintainAspect)}
                        className={`p-3 rounded-full border-4 border-white transition-all shadow-sm ${
                          maintainAspect
                            ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:scale-110"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:scale-110"
                        }`}
                        title={
                          maintainAspect
                            ? "Proporción bloqueada"
                            : "Proporción libre"
                        }
                      >
                        {maintainAspect ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          <Unlock className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Height Input */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Altura (px)
                        </label>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={height}
                        onChange={(e) =>
                          handleHeightChange(Number(e.target.value))
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Percentage Presets */}
                <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200 shadow-inner">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-emerald-500" />
                    Atajos de Escala
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 75, 200].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => applyPercentage(pct)}
                        className="py-2 px-1 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm transition-all shadow-sm"
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center p-6 bg-gray-50 rounded-3xl border border-gray-100 w-full max-w-6xl mx-auto">
              <button
                onClick={() => {
                  setFile(null);
                  setPreview("");
                  setOriginalDimensions({ width: 0, height: 0 });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-300 text-gray-600 hover:bg-white hover:shadow-sm font-bold flex items-center justify-center gap-2 transition-all group"
              >
                Nueva Imagen
              </button>

              <button
                onClick={resizeAndDownload}
                disabled={isResizing || !width || !height}
                className="w-full sm:flex-1 max-w-md px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:hover:scale-100 focus:ring-4 focus:ring-indigo-500/50"
              >
                {isResizing ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando...
                  </div>
                ) : (
                  <>
                    <Download className="w-6 h-6 animate-bounce" />
                    Descargar Redimensionada
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
    </>
  );
}
