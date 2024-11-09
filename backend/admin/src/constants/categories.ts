// Основни категории
export const PROMPT_CATEGORIES = {
  ART: 'Art & Illustration',
  LOGO: 'Logo & Icon',
  GRAPHIC: 'Graphic & Design',
  PRODUCTIVITY: 'Productivity & Writing',
  MARKETING: 'Marketing & Business',
  PHOTOGRAPHY: 'Photography',
  GAMES: 'Games & 3D',
} as const;

// AI Модели
export interface AIModel {
  name: string;
  type: 'text' | 'image';
  categories: string[];
  variants: string[];
  stats?: {
    categories: number;
    prompts: number;
    successRate: string;
    avgRating: string;
  };
}

export const AI_MODELS: Record<string, AIModel> = {
  GPT: {
    name: 'GPT',
    type: 'text',
    categories: ['Writing', 'Code', 'Business'],
    variants: ['GPT-4', 'GPT-3.5'],
    stats: {
      categories: 52,
      prompts: 850,
      successRate: '99%',
      avgRating: '4.9'
    }
  },
  DALLE: {
    name: 'DALL·E',
    type: 'image',
    categories: ['Art', 'Design', 'Photography'],
    variants: ['DALL·E 3', 'DALL·E 2'],
    stats: {
      categories: 45,
      prompts: 720,
      successRate: '98%',
      avgRating: '4.8'
    }
  },
  MIDJOURNEY: {
    name: 'Midjourney',
    type: 'image',
    categories: ['Art', 'Design', '3D'],
    variants: ['V6', 'V5.2', 'V5.1'],
    stats: {
      categories: 40,
      prompts: 680,
      successRate: '97%',
      avgRating: '4.7'
    }
  }
}; 