import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configurar worker desde node_modules
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PDFPagePreviewProps {
  pageData: Uint8Array;
  pageNumber: number;
  width?: number;
  height?: number;
}

export default function PDFPagePreview({ pageData, pageNumber, width = 120, height = 160 }: PDFPagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const renderPage = async () => {
      try {
        setLoading(true);
        setError(false);

        // Crear una copia del Uint8Array para evitar el error de ArrayBuffer detached
        const dataCopy = new Uint8Array(pageData);
        
        // Cargar el PDF desde Uint8Array
        const loadingTask = pdfjsLib.getDocument({ data: dataCopy });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Siempre página 1 porque cada Uint8Array es una página individual

        // Calcular escala para ajustar al tamaño deseado
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min(width / viewport.width, height / viewport.height);
        const scaledViewport = page.getViewport({ scale });

        // Crear canvas temporal
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error('No se pudo obtener el contexto del canvas');
        }

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        // Renderizar la página
        await page.render({
          canvasContext: context,
          viewport: scaledViewport,
          canvas: canvas,
        }).promise;

        if (mounted) {
          // Convertir canvas a imagen
          const dataUrl = canvas.toDataURL('image/png');
          setImageUrl(dataUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error renderizando página PDF:', err);
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      mounted = false;
    };
  }, [pageData, width, height]);

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ width, height }}
      >
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div 
        className="flex flex-col items-center justify-center bg-gray-100 rounded-lg"
        style={{ width, height }}
      >
        <FileText className="w-10 h-10 text-gray-400 mb-1" />
        <span className="text-xs text-gray-500">PDF</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={`Página ${pageNumber}`}
      className="rounded-lg object-contain bg-white shadow-sm"
      style={{ width, height }}
    />
  );
}
