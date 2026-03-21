# Arquitectura del Proyecto Toolify

## 📁 Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── layout/         # Componentes de layout (Header, Layout)
│   └── shared/         # Componentes compartidos (DownloadButton, FileUploader, ToolCard)
│
├── pages/              # Páginas y vistas
│   ├── tools/          # Herramientas organizadas por categoría
│   │   ├── image/      # Herramientas de imagen
│   │   └── calculators/ # Calculadoras
│   ├── Home.tsx        # Página principal
│   └── ToolLayout.tsx  # Layout compartido para herramientas
│
├── utils/              # Utilidades y lógica de negocio
│   ├── calculators/    # Lógica de cálculo separada
│   │   ├── age.ts
│   │   ├── bmi.ts
│   │   ├── loan.ts
│   │   ├── percentage.ts
│   │   ├── timeDifference.ts
│   │   ├── unitConverter.ts
│   │   └── index.ts    # Exportaciones centralizadas
│   └── seoConfig.ts    # Configuración SEO
│
├── i18n/               # Internacionalización
│   ├── config.ts
│   └── locales/
│       ├── en.json
│       └── es.json
│
└── types.ts            # Tipos TypeScript compartidos
```

## 🎯 Principios de Diseño

### 1. Separación de Responsabilidades

- **Componentes**: Solo presentación y UI
- **Utils**: Lógica de negocio pura (sin dependencias de React)
- **Pages**: Orquestación entre componentes y lógica

### 2. Organización por Categoría

Las herramientas están organizadas por tipo:
- `image/` - Herramientas de manipulación de imágenes
- `calculators/` - Calculadoras y conversores

### 3. Reutilización

- `ToolLayout`: Layout compartido para todas las herramientas
- `shared/`: Componentes reutilizables (FileUploader, DownloadButton, ToolCard)
- `utils/calculators/`: Lógica de cálculo reutilizable y testeable

## 🧮 Calculadoras Implementadas

### BMI Calculator
- **Archivo**: `src/pages/tools/calculators/BMICalculator.tsx`
- **Lógica**: `src/utils/calculators/bmi.ts`
- **Funcionalidad**: Calcula el Índice de Masa Corporal con soporte métrico e imperial

### Age Calculator
- **Archivo**: `src/pages/tools/calculators/AgeCalculator.tsx`
- **Lógica**: `src/utils/calculators/age.ts`
- **Funcionalidad**: Calcula edad exacta y días hasta el próximo cumpleaños

### Percentage Calculator
- **Archivo**: `src/pages/tools/calculators/PercentageCalculator.tsx`
- **Lógica**: `src/utils/calculators/percentage.ts`
- **Funcionalidad**: 5 modos de cálculo de porcentajes

### Loan Calculator
- **Archivo**: `src/pages/tools/calculators/LoanCalculator.tsx`
- **Lógica**: `src/utils/calculators/loan.ts`
- **Funcionalidad**: Calcula pagos de préstamos con tabla de amortización

### Time Difference
- **Archivo**: `src/pages/tools/calculators/TimeDifference.tsx`
- **Lógica**: `src/utils/calculators/timeDifference.ts`
- **Funcionalidad**: Calcula diferencias entre fechas y horas

### Unit Converter
- **Archivo**: `src/pages/tools/calculators/UnitConverter.tsx`
- **Lógica**: `src/utils/calculators/unitConverter.ts`
- **Funcionalidad**: Convierte entre 6 categorías de unidades

## 🔄 Flujo de Datos

```
Usuario → Componente (UI) → Lógica (utils) → Resultado → Componente (UI)
```

### Ejemplo: BMI Calculator

1. Usuario ingresa peso y altura en `BMICalculator.tsx`
2. Componente llama a `calculateBMI()` de `utils/calculators/bmi.ts`
3. Función retorna objeto con BMI, categoría y rango saludable
4. Componente renderiza el resultado

## 🎨 Patrones de Diseño

### 1. Componentes Controlados
Todos los inputs usan estado local de React

### 2. Funciones Puras
Las utilidades en `utils/` son funciones puras sin efectos secundarios

### 3. TypeScript Estricto
Todos los tipos están definidos para mayor seguridad

### 4. Responsive Design
Uso de Tailwind CSS con diseño mobile-first

## 📦 Agregar Nueva Herramienta

### Paso 1: Crear la lógica (si es necesario)
```typescript
// src/utils/calculators/myCalculator.ts
export function myCalculation(input: number): number {
  return input * 2;
}
```

### Paso 2: Crear el componente
```typescript
// src/pages/tools/calculators/MyCalculator.tsx
import { myCalculation } from '../../../utils/calculators/myCalculator';

export default function MyCalculator() {
  // Implementación
}
```

### Paso 3: Agregar ruta en App.tsx
```typescript
import MyCalculator from './pages/tools/calculators/MyCalculator';

<Route path="/tool/my-calculator" element={<MyCalculator />} />
```

### Paso 4: Agregar a Home.tsx
```typescript
{ id: "my-calculator", icon: Calculator, category: "calculator" }
```

### Paso 5: Agregar traducciones
```json
// src/i18n/locales/es.json
"mycalculator": {
  "name": "Mi Calculadora",
  "description": "Descripción de mi calculadora"
}
```

## 🧪 Testing

Las funciones en `utils/` son fáciles de testear porque son puras:

```typescript
import { calculateBMI } from './utils/calculators/bmi';

test('calculates BMI correctly', () => {
  const result = calculateBMI(70, 1.75, 'metric');
  expect(result.bmi).toBe(22.9);
});
```

## 🚀 Escalabilidad

Esta estructura permite:
- ✅ Agregar nuevas categorías fácilmente
- ✅ Reutilizar lógica entre componentes
- ✅ Testear lógica de negocio independientemente
- ✅ Mantener componentes simples y enfocados
- ✅ Escalar el equipo con responsabilidades claras
