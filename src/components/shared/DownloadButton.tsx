import { Download } from 'lucide-react';

interface DownloadButtonProps {
  fileName: string;
  fileUrl: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function DownloadButton({ fileName, fileUrl, onClick, disabled = false }: DownloadButtonProps) {
  const handleDownload = () => {
    onClick?.();
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={disabled}
      className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="w-5 h-5" />
      Descargar
    </button>
  );
}
