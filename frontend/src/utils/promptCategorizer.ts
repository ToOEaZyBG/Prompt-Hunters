import { Prompt, PromptCategory } from '../types/prompt';

// Ключови думи за всяка категория
const categoryKeywords: Record<PromptCategory, string[]> = {
  [PromptCategory.WRITING]: ['write', 'essay', 'story', 'article', 'blog', 'post', 'content'],
  [PromptCategory.BUSINESS]: ['business', 'company', 'corporate', 'professional', 'email', 'meeting'],
  [PromptCategory.ACADEMIC]: ['research', 'study', 'academic', 'paper', 'thesis', 'scientific'],
  [PromptCategory.CREATIVE]: ['creative', 'story', 'fiction', 'character', 'plot', 'imagine'],
  [PromptCategory.PROGRAMMING]: ['code', 'program', 'debug', 'function', 'algorithm', 'development'],
  [PromptCategory.MARKETING]: ['marketing', 'advertise', 'promotion', 'brand', 'social media', 'seo'],
  [PromptCategory.PERSONAL]: ['personal', 'self', 'life', 'motivation', 'habit', 'improvement'],
  [PromptCategory.EDUCATION]: ['teach', 'learn', 'education', 'student', 'school', 'course'],
  [PromptCategory.PRODUCTIVITY]: ['productivity', 'efficient', 'organize', 'plan', 'schedule', 'task'],
  [PromptCategory.OTHER]: []
};

export function categorizePrompt(content: string): PromptCategory {
  const lowercaseContent = content.toLowerCase();
  let maxScore = 0;
  let selectedCategory = PromptCategory.OTHER;

  // Проверяваме за всяка категория
  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (lowercaseContent.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);

    if (score > maxScore) {
      maxScore = score;
      selectedCategory = category as PromptCategory;
    }
  });

  return selectedCategory;
}

export function parsePromptFromText(text: string): Partial<Prompt> {
  const category = categorizePrompt(text);
  
  // Опит за извличане на заглавие (първият ред или първите няколко думи)
  const title = text.split('\n')[0]?.trim().slice(0, 100) || text.slice(0, 100).trim();
  
  return {
    title,
    content: text,
    category,
    price: 4.99, // Базова цена
    rating: 0,
    usageCount: 0,
    tags: extractTags(text),
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

function extractTags(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const commonTags = new Set(['ai', 'prompt', 'chatgpt', 'gpt', 'writing', 'business']);
  
  return Array.from(new Set(
    words.filter(word => 
      word.length > 3 && 
      !word.includes('http') && 
      !['the', 'and', 'for', 'that', 'with'].includes(word)
    )
  )).slice(0, 5);
} 