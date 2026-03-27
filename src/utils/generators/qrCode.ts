// QR Code Generator Logic
export interface QRCodeOptions {
  text: string;
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
}

export function generateQRCodeURL(options: QRCodeOptions): string {
  const { text, size, errorCorrection } = options;
  const encodedText = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&ecc=${errorCorrection}`;
}

export function downloadQRCode(url: string, filename: string = 'qrcode.png') {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
