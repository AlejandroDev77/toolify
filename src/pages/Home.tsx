import { useState, useMemo } from 'react';
import ToolCard from '../components/shared/ToolCard';
import {
  Image as ImageIcon,
  Calculator,
  FileText,
  Code,
  FileImage,
  Maximize2,
  Crop,
  RotateCw,
  FileJson,
  Hash,
  Lock,
  Dices,
  Type,
  Copy,
  BookOpen,
  Network,
  CreditCard,
  Clock,
  Ruler,
  Palette,
  Search,
  LayoutGrid,
} from 'lucide-react';
import type { Tool, ToolCategory } from '../types';

const categories: ToolCategory[] = [
  { id: 'image', name: 'Herramientas de Imagen', icon: ImageIcon, color: 'from-purple-500 to-pink-500' },
  { id: 'generator', name: 'Generadores', icon: Lock, color: 'from-blue-500 to-cyan-500' },
  { id: 'calculator', name: 'Calculadoras', icon: Calculator, color: 'from-green-500 to-emerald-500' },
  { id: 'text', name: 'Herramientas de Texto', icon: Type, color: 'from-orange-500 to-red-500' },
  { id: 'developer', name: 'Herramientas para Desarrolladores', icon: Code, color: 'from-indigo-500 to-purple-500' },
];

const tools: Tool[] = [
  // Image Tools
  { id: 'compress-image', name: 'Comprimir Imagen', description: 'Reduce el tamaño de imágenes sin perder mucha calidad', icon: FileImage, category: 'image' },
  { id: 'resize-image', name: 'Redimensionar Imagen', description: 'Cambia el tamaño de tus imágenes fácilmente', icon: Maximize2, category: 'image' },
  { id: 'crop-image', name: 'Recortar Imagen', description: 'Recorta partes específicas de tus imágenes', icon: Crop, category: 'image' },
  { id: 'rotate-image', name: 'Rotar Imagen', description: 'Gira tus imágenes en cualquier ángulo', icon: RotateCw, category: 'image' },
  { id: 'flip-image', name: 'Voltear Imagen', description: 'Voltea imágenes horizontal o verticalmente', icon: RotateCw, category: 'image' },
  { id: 'png-to-jpg', name: 'PNG → JPG', description: 'Convierte PNG a JPG automáticamente', icon: ImageIcon, category: 'image' },
  { id: 'jpg-to-png', name: 'JPG → PNG', description: 'Convierte JPG a PNG automáticamente', icon: ImageIcon, category: 'image' },
  { id: 'image-to-webp', name: 'Image → WebP', description: 'Convierte imágenes a formato WebP', icon: ImageIcon, category: 'image' },
  { id: 'color-picker', name: 'Selector de Color', description: 'Extrae colores de tus imágenes', icon: Palette, category: 'image' },
  { id: 'image-to-base64', name: 'Image → Base64', description: 'Convierte imágenes a Base64', icon: Code, category: 'image' },

  // Generators
  { id: 'password-generator', name: 'Generador de Contraseñas', description: 'Crea contraseñas seguras y aleatorias', icon: Lock, category: 'generator', comingSoon: true },
  { id: 'uuid-generator', name: 'Generador UUID', description: 'Genera UUIDs únicos al instante', icon: Hash, category: 'generator', comingSoon: true },
  { id: 'qr-generator', name: 'Generador QR', description: 'Crea códigos QR desde texto o URLs', icon: Crop, category: 'generator', comingSoon: true },
  { id: 'random-number', name: 'Número Aleatorio', description: 'Genera números aleatorios', icon: Dices, category: 'generator', comingSoon: true },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum', description: 'Genera texto ficticio', icon: BookOpen, category: 'generator', comingSoon: true },
  { id: 'fake-name', name: 'Nombre Falso', description: 'Genera nombres ficticios', icon: Type, category: 'generator', comingSoon: true },

  // Calculators
  { id: 'bmi-calculator', name: 'Calculadora IMC', description: 'Calcula tu Índice de Masa Corporal', icon: Calculator, category: 'calculator', comingSoon: true },
  { id: 'age-calculator', name: 'Calculadora de Edad', description: 'Calcula tu edad exacta', icon: Clock, category: 'calculator', comingSoon: true },
  { id: 'percentage-calculator', name: 'Calculadora de Porcentaje', description: 'Calcula porcentajes fácilmente', icon: Calculator, category: 'calculator', comingSoon: true },
  { id: 'loan-calculator', name: 'Calculadora de Crédito', description: 'Calcula pagos y tasas de crédito', icon: CreditCard, category: 'calculator', comingSoon: true },
  { id: 'time-difference', name: 'Diferencia de Tiempo', description: 'Calcula la diferencia entre fechas', icon: Clock, category: 'calculator', comingSoon: true },
  { id: 'unit-converter', name: 'Convertidor de Unidades', description: 'Convierte entre diferentes unidades', icon: Ruler, category: 'calculator', comingSoon: true },

  // Text Tools
  { id: 'word-counter', name: 'Contador de Palabras', description: 'Cuenta palabras y caracteres', icon: FileText, category: 'text', comingSoon: true },
  { id: 'character-counter', name: 'Contador de Caracteres', description: 'Cuenta caracteres con exactitud', icon: Type, category: 'text', comingSoon: true },
  { id: 'remove-spaces', name: 'Eliminar Espacios', description: 'Quita espacios extra del texto', icon: Copy, category: 'text', comingSoon: true },
  { id: 'text-case', name: 'Convertidor de Mayúsculas', description: 'MAYÚSCULAS, minúsculas, Capitalizar', icon: Type, category: 'text', comingSoon: true },
  { id: 'reverse-text', name: 'Invertir Texto', description: 'Invierte el orden del texto', icon: RotateCw, category: 'text', comingSoon: true },

  // Developer Tools
  { id: 'json-formatter', name: 'Formateador JSON', description: 'Formatea y valida JSON', icon: FileJson, category: 'developer', comingSoon: true },
  { id: 'base64-encode', name: 'Base64 Encode/Decode', description: 'Codifica y decodifica Base64', icon: Code, category: 'developer', comingSoon: true },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Codifica y decodifica URLs', icon: Network, category: 'developer', comingSoon: true },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    return categories
      .map((category) => {
        let categoryTools = tools.filter((tool) => tool.category === category.id);

        if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          categoryTools = categoryTools.filter(
            (tool) =>
              tool.name.toLowerCase().includes(lowerQuery) ||
              tool.description.toLowerCase().includes(lowerQuery)
          );
        }

        return {
          ...category,
          tools: categoryTools,
        };
      })
      .filter((category) => category.tools.length > 0)
      .filter((category) => (selectedCategory ? category.id === selectedCategory : true));
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Todas las herramientas que necesitas
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Una colección premium de herramientas gratuitas para transformar imágenes, manipular datos y optimizar tu tiempo.
        </p>

        {/* 1️⃣ Buscador de Herramientas */}
        <div className="max-w-3xl mx-auto relative mb-8 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 md:text-lg border-2 border-gray-100 bg-white/50 backdrop-blur-md rounded-2xl leading-5 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white placeholder-gray-400 font-medium shadow-sm transition-all"
            placeholder="Buscar por nombre o descripción (ej. Comprimir, Generador...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 2️⃣ Selector de Categorías */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              selectedCategory === null
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Todas
          </button>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                  isSelected
                    ? `bg-gray-900 text-white shadow-md`
                    : `bg-white text-gray-600 hover:bg-gray-100 border border-gray-200`
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : ''}`} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3️⃣ Grid de Herramientas Filtradas */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.id} className="mb-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
              {/* Encabezado de la categoría */}
              <div className={`flex items-center gap-4 mb-8 pb-4 border-b border-gray-100 relative`}>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-xl shadow-${category.color.split('-')[1]}-500/20 ring-1 ring-white/20`}>
                  <CategoryIcon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {category.name}
                  </h2>
                  <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                    {category.tools.length} herramienta{category.tools.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Grid 4 columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.tools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    id={tool.id}
                    icon={tool.icon}
                    title={tool.name}
                    description={tool.description}
                    comingSoon={tool.comingSoon}
                  />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 animate-in fade-in duration-300">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron herramientas</h3>
          <p className="text-gray-500">Intenta utilizar otros términos de búsqueda.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </div>
  );
}
