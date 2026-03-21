import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, Download, Lock, CheckCircle2, Loader2, Shield, Eye, EyeOff, FileText } from 'lucide-react';
import { protectPDF } from '../../../utils/pdf/pdfOperations';
import ToolLayout from '../../ToolLayout';
import SEO from '../../../components/SEO';

export default function ProtectPDF() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [protectedPdf, setProtectedPdf] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const pdfFile = e.dataTransfer.files[0];
      if (pdfFile.type === 'application/pdf') {
        setFile(pdfFile);
        setProtectedPdf(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setProtectedPdf(null);
    }
  };

  const handleProtect = async () => {
    if (!file || !password) return;
    
    if (password !== confirmPassword) {
      alert(t('pdf.passwordMismatch'));
      return;
    }

    if (password.length < 6) {
      alert(t('pdf.passwordTooShort'));
      return;
    }
    
    setLoading(true);
    try {
      const protected_pdf = await protectPDF(file, password);
      setProtectedPdf(protected_pdf);
    } catch (error) {
      console.error('Error protecting PDF:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const downloadProtected = () => {
    if (!protectedPdf) return;
    
    const blob = new Blob([protectedPdf as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'protected.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isPasswordValid = password.length >= 6;

  return (
    <>
      <SEO 
        title={t('tools.protectpdf.title')}
        description={t('tools.protectpdf.longDescription')}
        keywords={t('tools.protectpdf.keywords')}
      />
      <ToolLayout
        title={t('tools.protectpdf.name')}
        description={t('tools.protectpdf.description')}
        icon={Lock}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Zona de carga */}
            <div className="mb-8">
              <label 
                className="block w-full"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  dragActive 
                    ? 'border-indigo-500 bg-indigo-50 scale-105' 
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                }`}>
                  <div className={`transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
                    <FileUp className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      {dragActive ? t('pdf.dropHere') : t('pdf.dragOrClick')}
                    </p>
                    <p className="text-sm text-gray-500">{t('pdf.selectPDFToProtect')}</p>
                    <div className="mt-4 inline-block bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition">
                      {t('common.selectFile')}
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Archivo seleccionado y configuración */}
            {file && !protectedPdf && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                      <FileText className="w-12 h-12 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                {/* Configuración de contraseña */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-800">{t('pdf.securitySettings')}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('pdf.password')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t('pdf.enterPassword')}
                          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {password.length > 0 && !isPasswordValid && (
                        <p className="text-sm text-red-600 mt-1">{t('pdf.passwordTooShort')}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('pdf.confirmPassword')}
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={t('pdf.confirmPasswordPlaceholder')}
                          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {confirmPassword.length > 0 && !passwordsMatch && (
                        <p className="text-sm text-red-600 mt-1">{t('pdf.passwordMismatch')}</p>
                      )}
                      {passwordsMatch && isPasswordValid && (
                        <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          {t('pdf.passwordsMatch')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>{t('common.note')}:</strong> {t('pdf.protectionNote')}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleProtect}
                  disabled={!passwordsMatch || !isPasswordValid || loading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {t('common.processing')}
                    </>
                  ) : (
                    <>
                      <Lock className="w-6 h-6" />
                      {t('pdf.protectPDF')}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Resultado */}
            {protectedPdf && (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-500 p-3 rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800">{t('pdf.protectionComplete')}</h3>
                      <p className="text-green-600">{t('pdf.protectionSuccess')}</p>
                    </div>
                  </div>

                  <button
                    onClick={downloadProtected}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <Download className="w-6 h-6" />
                    {t('common.download')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
