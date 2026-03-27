import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode, ComponentType } from 'react';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
}

export default function ToolLayout({ title, description, icon: Icon, children }: ToolLayoutProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="py-8 px-4 w-full max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        {t('common.backToTools')}
      </button>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 p-8 md:p-12 border-b border-gray-100 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
            {Icon && (
              <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-600 border border-blue-100/50 hidden sm:block pointer-events-none">
                <Icon className="w-10 h-10" />
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{description}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
