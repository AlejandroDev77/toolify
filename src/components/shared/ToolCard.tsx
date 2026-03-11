import { Link } from 'react-router-dom';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';

interface ToolCardProps {
  id: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  comingSoon?: boolean;
}

export default function ToolCard({ id, icon: Icon, title, description, comingSoon }: ToolCardProps) {
  const content = (
    <div className={`group block bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6 border border-gray-100 relative overflow-hidden ${comingSoon ? 'opacity-80 saturate-50' : ''}`}>
      {comingSoon && (
        <div className="absolute top-3 right-3 bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">
          Próximamente
        </div>
      )}
      <div className={`flex items-center justify-center w-14 h-14 rounded-lg mb-4 transition ${comingSoon ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 group-hover:bg-blue-600 group-hover:text-white'}`}>
        <Icon className={`w-7 h-7 transition ${comingSoon ? 'text-gray-400' : 'text-blue-600 group-hover:text-white'}`} />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 pr-16">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  return (
    <motion.div
      whileHover={comingSoon ? {} : { y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {comingSoon ? (
        <div className="cursor-not-allowed">
          {content}
        </div>
      ) : (
        <Link to={`/tool/${id}`}>
          {content}
        </Link>
      )}
    </motion.div>
  );
}
