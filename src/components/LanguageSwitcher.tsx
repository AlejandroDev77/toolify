import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    // Guardar preferencia
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-medium text-sm"
      title="Cambiar idioma / Change language"
    >
      <Globe className="w-4 h-4" />
      <span>{currentLang === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}</span>
    </button>
  );
}
