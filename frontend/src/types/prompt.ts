export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  subcategory?: string;
  price: number;
  rating: number;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  tags: string[];
}

export enum PromptCategory {
  WRITING = 'Writing',
  BUSINESS = 'Business',
  ACADEMIC = 'Academic',
  CREATIVE = 'Creative',
  PROGRAMMING = 'Programming',
  MARKETING = 'Marketing',
  PERSONAL = 'Personal',
  EDUCATION = 'Education',
  PRODUCTIVITY = 'Productivity',
  OTHER = 'Other'
}

export interface PromptSubcategory {
  category: PromptCategory;
  subcategories: string[];
}

// Подкатегории за всяка основна категория
export const promptSubcategories: PromptSubcategory[] = [
  {
    category: PromptCategory.WRITING,
    subcategories: ['Essays', 'Stories', 'Articles', 'Blog Posts', 'Poetry', 'Scripts']
  },
  {
    category: PromptCategory.BUSINESS,
    subcategories: ['Emails', 'Proposals', 'Reports', 'Presentations', 'Marketing Copy']
  },
  {
    category: PromptCategory.ACADEMIC,
    subcategories: ['Research Papers', 'Thesis', 'Study Notes', 'Summaries']
  },
  {
    category: PromptCategory.CREATIVE,
    subcategories: ['Fiction', 'Character Development', 'Plot Ideas', 'World Building']
  },
  {
    category: PromptCategory.PROGRAMMING,
    subcategories: ['Code Generation', 'Debugging', 'Documentation', 'Algorithms']
  },
  {
    category: PromptCategory.MARKETING,
    subcategories: ['Social Media', 'Ad Copy', 'SEO Content', 'Email Marketing']
  },
  {
    category: PromptCategory.PERSONAL,
    subcategories: ['Self-improvement', 'Motivation', 'Life Advice', 'Health']
  },
  {
    category: PromptCategory.EDUCATION,
    subcategories: ['Teaching', 'Learning Materials', 'Exercises', 'Quizzes']
  },
  {
    category: PromptCategory.PRODUCTIVITY,
    subcategories: ['Task Management', 'Time Management', 'Organization', 'Planning']
  }
]; 