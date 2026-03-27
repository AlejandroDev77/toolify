import type { ComponentType } from 'react';

export type Tool = {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  category: 'image' | 'pdf' | 'generator' | 'calculator' | 'text' | 'developer';
  comingSoon?: boolean;
};

export type ToolCategory = {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
};
