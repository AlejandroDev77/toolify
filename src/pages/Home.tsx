import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import ToolCard from "../components/shared/ToolCard";
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
  FilePlus,
} from "lucide-react";
import type { Tool, ToolCategory } from "../types";

// Categorías - Solo IDs y config
const categoryConfig = [
  { id: "image", icon: ImageIcon, color: "from-purple-500 to-pink-500" },
  { id: "pdf", icon: FilePlus, color: "from-red-500 to-orange-500" },
  { id: "generator", icon: Lock, color: "from-blue-500 to-cyan-500" },
  { id: "calculator", icon: Calculator, color: "from-green-500 to-emerald-500" },
  { id: "text", icon: Type, color: "from-orange-500 to-red-500" },
  { id: "developer", icon: Code, color: "from-indigo-500 to-purple-500" },
];

// Herramientas - Solo IDs y config
const toolConfig = [
  // Image Tools
  { id: "compress-image", icon: FileImage, category: "image" },
  { id: "resize-image", icon: Maximize2, category: "image" },
  { id: "crop-image", icon: Crop, category: "image" },
  { id: "rotate-image", icon: RotateCw, category: "image" },
  { id: "flip-image", icon: RotateCw, category: "image" },
  { id: "png-to-jpg", icon: ImageIcon, category: "image" },
  { id: "jpg-to-png", icon: ImageIcon, category: "image" },
  { id: "image-to-webp", icon: ImageIcon, category: "image" },
  { id: "color-picker", icon: Palette, category: "image" },
  { id: "image-to-base64", icon: Code, category: "image" },
  // PDF Tools
  { id: "merge-pdf", icon: FilePlus, category: "pdf" },
  { id: "split-pdf", icon: Crop, category: "pdf" },
  { id: "compress-pdf", icon: FileImage, category: "pdf" },
  { id: "rotate-pdf", icon: RotateCw, category: "pdf" },
  { id: "jpg-to-pdf", icon: ImageIcon, category: "pdf" },
  { id: "protect-pdf", icon: Lock, category: "pdf" },
  { id: "add-page-numbers", icon: Hash, category: "pdf" },
  // Generators
  { id: "password-generator", icon: Lock, category: "generator" },
  { id: "uuid-generator", icon: Hash, category: "generator" },
  { id: "qr-generator", icon: Crop, category: "generator" },
  { id: "random-number", icon: Dices, category: "generator" },
  { id: "lorem-ipsum", icon: BookOpen, category: "generator" },
  { id: "fake-name", icon: Type, category: "generator" },
  { id: "username-generator", icon: Type, category: "generator" },
  { id: "hashtag-generator", icon: Hash, category: "generator" },
  { id: "slogan-generator", icon: BookOpen, category: "generator" },
  { id: "bio-generator", icon: Type, category: "generator" },
  // Calculators
  { id: "bmi-calculator", icon: Calculator, category: "calculator" },
  { id: "age-calculator", icon: Clock, category: "calculator" },
  { id: "percentage-calculator", icon: Calculator, category: "calculator" },
  { id: "loan-calculator", icon: CreditCard, category: "calculator" },
  { id: "time-difference", icon: Clock, category: "calculator" },
  { id: "unit-converter", icon: Ruler, category: "calculator" },
  { id: "fuel-calculator", icon: Calculator, category: "calculator" },
  { id: "tip-calculator", icon: Calculator, category: "calculator" },
  { id: "salary-calculator", icon: Calculator, category: "calculator" },
  { id: "mortgage-calculator", icon: CreditCard, category: "calculator" },
  { id: "calorie-calculator", icon: Calculator, category: "calculator" },
  { id: "gpa-calculator", icon: Calculator, category: "calculator" },
  { id: "discount-calculator", icon: Calculator, category: "calculator" },
  { id: "investment-calculator", icon: CreditCard, category: "calculator" },
  { id: "currency-converter", icon: Calculator, category: "calculator" },
  { id: "tax-calculator", icon: Calculator, category: "calculator" },
  { id: "roi-calculator", icon: CreditCard, category: "calculator" },
  { id: "profit-margin-calculator", icon: Calculator, category: "calculator" },
  { id: "break-even-calculator", icon: Calculator, category: "calculator" },
  { id: "body-fat-calculator", icon: Calculator, category: "calculator" },
  { id: "ideal-weight-calculator", icon: Calculator, category: "calculator" },
  { id: "water-intake-calculator", icon: Calculator, category: "calculator" },
  { id: "macro-calculator", icon: Calculator, category: "calculator" },
  { id: "retirement-calculator", icon: CreditCard, category: "calculator" },
  // Text Tools
  { id: "word-counter", icon: FileText, category: "text" },
  { id: "character-counter", icon: Type, category: "text" },
  { id: "remove-spaces", icon: Copy, category: "text" },
  { id: "text-case", icon: Type, category: "text" },
  { id: "reverse-text", icon: RotateCw, category: "text" },
  { id: "reading-time", icon: Clock, category: "text" },
  { id: "text-diff", icon: FileText, category: "text" },
  { id: "keyword-density", icon: Search, category: "text" },
  { id: "text-sorter", icon: LayoutGrid, category: "text" },
  { id: "remove-duplicates", icon: Copy, category: "text" },
  { id: "line-numbering", icon: Hash, category: "text" },
  { id: "email-extractor", icon: Network, category: "text" },
  { id: "find-replace", icon: Search, category: "text" },
  // Developer Tools
  { id: "json-formatter", icon: FileJson, category: "developer" },
  { id: "base64-encode", icon: Code, category: "developer" },
  { id: "url-encoder", icon: Network, category: "developer" },
  { id: "xml-formatter", icon: FileJson, category: "developer" },
  { id: "sql-formatter", icon: Code, category: "developer" },
  { id: "css-minifier", icon: Code, category: "developer" },
  { id: "js-minifier", icon: Code, category: "developer" },
  { id: "html-minifier", icon: Code, category: "developer" },
  { id: "hash-generator", icon: Hash, category: "developer" },
  { id: "jwt-decoder", icon: Lock, category: "developer" },
  { id: "csv-to-json", icon: FileJson, category: "developer" },
  { id: "json-to-csv", icon: FileText, category: "developer" },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Construir categorías dinámicamente desde la traducción
  const categories: ToolCategory[] = useMemo(() => {
    return categoryConfig.map((cat) => ({
      id: cat.id,
      name: t(`categories.${cat.id}`),
      icon: cat.icon,
      color: cat.color,
    }));
  }, [t, i18n.language]);

  // Construir herramientas dinámicamente desde la traducción
  const tools: Tool[] = useMemo(() => {
    return toolConfig.map((tool) => ({
      id: tool.id,
      name: t(`tools.${tool.id.replace(/-/g, '')}.name`),
      description: t(`tools.${tool.id.replace(/-/g, '')}.description`),
      icon: tool.icon,
      category: tool.category as "image" | "pdf" | "generator" | "calculator" | "text" | "developer",
      comingSoon: ('comingSoon' in tool ? tool.comingSoon : false) as boolean | undefined,
    }));
  }, [t, i18n.language]);

  const filteredCategories = useMemo(() => {
    return categories
      .map((category) => {
        let categoryTools = tools.filter(
          (tool) => tool.category === category.id,
        );

        if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          categoryTools = categoryTools.filter(
            (tool) =>
              tool.name.toLowerCase().includes(lowerQuery) ||
              tool.description.toLowerCase().includes(lowerQuery),
          );
        }

        return {
          ...category,
          tools: categoryTools,
        };
      })
      .filter((category) => category.tools.length > 0)
      .filter((category) =>
        selectedCategory ? category.id === selectedCategory : true,
      );
  }, [searchQuery, selectedCategory, categories, tools]); // ⚡ Agregar categories y tools como dependencias

  return (
    <>
      <SEO title={t('home.title')} description={t('home.description')} keywords={t('home.keywords')} />
      <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {t('home.hero.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('home.hero.subtitle')}
        </p>

        {/* Buscador de Herramientas */}
        <div className="max-w-3xl mx-auto relative mb-8 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 md:text-lg border-2 border-gray-100 bg-white/50 backdrop-blur-md rounded-2xl leading-5 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white placeholder-gray-400 font-medium shadow-sm transition-all"
            placeholder={t('common.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Selector de Categorías */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              selectedCategory === null
                ? "bg-gray-900 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {t('common.all')}
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
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : ""}`} />
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
            <div
              key={category.id}
              className="mb-16 animate-in slide-in-from-bottom-4 fade-in duration-500"
            >
              {/* Encabezado de la categoría */}
              <div
                className={`flex items-center gap-4 mb-8 pb-4 border-b border-gray-100 relative`}
              >
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-xl shadow-${category.color.split("-")[1]}-500/20 ring-1 ring-white/20`}
                >
                  <CategoryIcon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {category.name}
                  </h2>
                  <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                    {category.tools.length} {category.tools.length !== 1 ? t('common.tools') : t('common.tool')}
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('common.noResults')}
          </h3>
          <p className="text-gray-500">
            {t('common.tryOtherTerms')}
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            {t('common.clearSearch')}
          </button>
        </div>
      )}
      </div>
    </>
  );
}
