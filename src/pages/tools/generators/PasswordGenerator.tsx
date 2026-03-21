import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Lock, Copy, Check, RefreshCw } from 'lucide-react';
import { generatePassword, calculatePasswordStrength, type PasswordOptions } from '../../../utils/generators/password';

export default function PasswordGenerator() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const handleGenerate = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = password ? calculatePasswordStrength(password) : null;

  const strengthColors = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  };

  return (
    <>
      <SEO
        title={t('tools.passwordgenerator.name')}
        description={t('tools.passwordgenerator.description')}
        keywords="password generator, secure password, contraseña segura"
      />
      <ToolLayout
        title={t('tools.passwordgenerator.name')}
        description={t('tools.passwordgenerator.description')}
        icon={Lock}
      >
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              {password && (
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-600">Contraseña Generada</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? t('common.copied') : t('common.copy')}
                    </button>
                  </div>
                  <div className="font-mono text-2xl font-bold text-gray-900 break-all mb-4">
                    {password}
                  </div>
                  {strength && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600">Fortaleza</span>
                        <span className="text-sm font-bold">{strength.label}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${strengthColors[strength.color as keyof typeof strengthColors]}`}
                          style={{ width: `${(strength.score / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('common.length')}: {options.length}
                </label>
                <input
                  type="range"
                  min="4"
                  max="64"
                  value={options.length}
                  onChange={(e) => setOptions({ ...options, length: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4</span>
                  <span>64</span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'includeUppercase', label: t('common.uppercase') },
                  { key: 'includeLowercase', label: t('common.lowercase') },
                  { key: 'includeNumbers', label: t('common.numbers') },
                  { key: 'includeSymbols', label: t('common.symbols') },
                ].map((option) => (
                  <label key={option.key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options[option.key as keyof PasswordOptions] as boolean}
                      onChange={(e) => setOptions({ ...options, [option.key]: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {t('common.generatePassword')}
              </button>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
