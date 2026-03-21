import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configurar worker de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFPreviewProps {
  file: File | Uint8Array;
  pageNumber?: number;
  width?: number;
  height?: number;
  className?: string;
}

export default function PDFPreview({ file, pageNumber = 1, width = 150, height = 200, className = '' }: PDFPreviewProps) {
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const generatePreview = async () => {
      try {
        setLoading(true);
        setError(false);

        let arrayBuffer: ArrayBuffer;
        
        if (file instanceof File) {
          arrayBuffer = await file.arrayBuffer();
        } else {
          // Convert Uint8Array to ArrayBuffer
          arrayBuffer = file.buffer.slice(0) as ArrayBuffer;
        }

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(Math.min(pageNumber, pdf.numPages));
        
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error('Could not get canvas context');
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        }).promise;

        if (isMounted) {
          setPreview(canvas.toDataURL());
          setLoading(false);
        }
      } catch (err) {
        console.error('Error generating PDF preview:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    generatePreview();

    return () => {
      isMounted = false;
    };
  }, [file, pageNumber]);

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !preview) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <FileText className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-xs text-gray-500">PDF</span>
      </div>
    );
  }

  return (
    <img
      src={preview}
      alt={`PDF page ${pageNumber}`}
      className={`rounded-lg object-cover border-2 border-gray-200 ${className}`}
      style={{ width, height }}
    />
  );
}
