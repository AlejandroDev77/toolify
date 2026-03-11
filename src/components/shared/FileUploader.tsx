import { useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  title?: string;
  subtitle?: string;
}

export default function FileUploader({ 
  onFileSelect, 
  accept = 'image/*', 
  maxSize = 50000000, 
  title = 'Sube tu archivo',
  subtitle = 'Arrastra y suelta tu archivo aquí, o haz clic para explorar'
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxSize,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative group border-2 border-dashed rounded-3xl p-12 overflow-hidden text-center cursor-pointer transition-all duration-300 w-full max-w-2xl mx-auto
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50/50 scale-[1.02] shadow-xl shadow-blue-900/5' 
          : isDragReject 
            ? 'border-red-400 bg-red-50/50' 
            : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/50 hover:shadow-lg'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDragActive ? 'opacity-100' : ''}`}></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className={`p-4 rounded-full mb-4 transition-all duration-300 ${isDragActive ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
          <UploadCloud className="w-10 h-10" />
        </div>
        
        <h3 className={`text-xl font-bold mb-2 transition-colors ${isDragActive ? 'text-blue-600' : 'text-slate-700'}`}>
          {isDragActive ? '¡Suéltalo ahora!' : title}
        </h3>
        
        <p className="text-slate-500 text-sm mb-4 max-w-sm">
          {subtitle}
        </p>
        
        <div className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-500 shadow-sm group-hover:border-blue-200 transition-colors">
          Tamaño máximo: {(maxSize / 1000000).toFixed(0)}MB
        </div>
      </div>
    </div>
  );
}
