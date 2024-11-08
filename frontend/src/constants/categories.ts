// Типове промптове
export const PROMPT_TYPES = {
  IMAGE: 'Image prompts',
  TEXT: 'Text prompts',
  FREE: 'Free prompts',
} as const;

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

// Всички възможни категории
export const ALL_CATEGORIES = [
  '3D', 'Accessory', 'Ads', 'Animal', 'Anime', 'Art', 'Avatar', 'Building', 
  'Business', 'Cartoon', 'Celebrity', 'Chatbot', 'Clothes', 'Coach', 'Code', 
  'Conversion', 'Copy', 'Cute', 'Cyberpunk', 'Drawing', 'Drink', 'Email', 
  'Fantasy', 'Fashion', 'Finance', 'Fix', 'Food', 'Fun', 'Funny', 'Future', 
  'Games', 'Generation', 'Glass', 'Graphic Design', 'Health', 'Holiday', 
  'Icons', 'Ideas', 'Illustration', 'Ink', 'Interiors', 'Jewelry', 'Landscape', 
  'Language', 'Logo', 'Marketing', 'Mockup', 'Monogram', 'Monster', 'Music', 
  'Nature', 'Painting', 'Pattern', 'People', 'Photography', 'Pixel Art', 'Plan', 
  'Product', 'Prompts', 'Psychedelic', 'Retro', 'Scary', 'SEO', 'Social', 
  'Space', 'Sport', 'Statues', 'Steampunk', 'Study', 'Unique Style', 'Summarise', 
  'Synthwave', 'Texture', 'Translate', 'Travel', 'Vehicle', 'Wallpaper', 'Wood', 'Writing'
].sort();

export interface AIModel {
  name: string;
  type: 'text' | 'image';
  categories: string[];
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
    categories: ['3D', 'Ads', 'AI Assistant', 'Art', 'Augmented Reality', 'Business', 'Chatbot', 'Code', 'Content Generation', 'Conversion', 'Copy', 'Data Analysis', 'Education', 'Email', 'Ethics', 'Fantasy', 'Fashion', 'Finance', 'Fix', 'Food', 'Fun', 'Funny', 'Games', 'Generation', 'Health', 'Ideas', 'Language', 'Machine Translation', 'Marketing', 'Mathematics', 'Medical Diagnosis', 'Natural Language Processing', 'Philosophy', 'Plan', 'Product', 'Prompts', 'Question Answering', 'Recommendation Systems', 'SEO', 'Sentiment Analysis', 'Social', 'Speech Recognition', 'Speech Synthesis', 'Study', 'Summarize', 'Text Classification', 'Text Generation', 'Text Summarization', 'Translate', 'Travel', 'Virtual Assistants', 'Writing'],
    stats: {
      categories: 52,
      prompts: 850,
      successRate: '99%',
      avgRating: '4.9'
    }
  },
  CLAUDE: {
    name: 'Claude',
    type: 'text',
    categories: ['3D', 'Ads', 'AI Assistant', 'Art', 'Business', 'Chatbot', 'Code', 'Content Generation', 'Conversion', 'Copy', 'Data Analysis', 'Education', 'Email', 'Ethics', 'Fantasy', 'Fashion', 'Finance', 'Fix', 'Food', 'Fun', 'Funny', 'Games', 'Generation', 'Health', 'Ideas', 'Language', 'Machine Translation', 'Marketing', 'Mathematics', 'Medical Diagnosis', 'Natural Language Processing', 'Philosophy', 'Plan', 'Product', 'Prompts', 'Question Answering', 'Recommendation Systems', 'SEO', 'Sentiment Analysis', 'Social', 'Speech Recognition', 'Speech Synthesis', 'Study', 'Summarize', 'Text Classification', 'Text Generation', 'Text Summarization', 'Translate', 'Travel', 'Virtual Assistants', 'Writing'],
    stats: {
      categories: 51,
      prompts: 620,
      successRate: '98%',
      avgRating: '4.8'
    }
  },
  MISTRAL: {
    name: 'Mistral',
    type: 'text',
    categories: ['3D', 'Ads', 'AI Assistant', 'Art', 'Business', 'Chatbot', 'Code', 'Content Generation', 'Conversion', 'Copy', 'Data Analysis', 'Education', 'Email', 'Ethics', 'Fantasy', 'Fashion', 'Finance', 'Fix', 'Food', 'Fun', 'Funny', 'Games', 'Generation', 'Health', 'Ideas', 'Language', 'Machine Translation', 'Marketing', 'Mathematics', 'Medical Diagnosis', 'Natural Language Processing', 'Philosophy', 'Plan', 'Product', 'Prompts', 'Question Answering', 'Recommendation Systems', 'SEO', 'Sentiment Analysis', 'Social', 'Speech Recognition', 'Speech Synthesis', 'Study', 'Summarize', 'Text Classification', 'Text Generation', 'Text Summarization', 'Translate', 'Travel', 'Virtual Assistants', 'Writing'],
    stats: {
      categories: 51,
      prompts: 340,
      successRate: '97%',
      avgRating: '4.7'
    }
  },
  LLAMA: {
    name: 'Llama',
    type: 'text',
    categories: ['3D', 'Ads', 'AI Assistant', 'Art', 'Business', 'Chatbot', 'Code', 'Content Generation', 'Conversion', 'Copy', 'Data Analysis', 'Education', 'Email', 'Ethics', 'Fantasy', 'Fashion', 'Finance', 'Fix', 'Food', 'Fun', 'Funny', 'Games', 'Generation', 'Health', 'Ideas', 'Language', 'Machine Translation', 'Marketing', 'Mathematics', 'Medical Diagnosis', 'Natural Language Processing', 'Philosophy', 'Plan', 'Product', 'Prompts', 'Question Answering', 'Recommendation Systems', 'SEO', 'Sentiment Analysis', 'Social', 'Speech Recognition', 'Speech Synthesis', 'Study', 'Summarize', 'Text Classification', 'Text Generation', 'Text Summarization', 'Translate', 'Travel', 'Virtual Assistants', 'Writing'],
    stats: {
      categories: 51,
      prompts: 450,
      successRate: '96%',
      avgRating: '4.6'
    }
  },
  MIDJOURNEY: {
    name: 'Midjourney',
    type: 'image',
    categories: ['3D', 'Accessory', 'Ads', 'AI Art', 'Animal', 'Anime', 'Art', 'Augmented Reality', 'Avatar', 'Building', 'Business', 'Cartoon', 'Celebrity', 'Clothes', 'Cute', 'Cyberpunk', 'Deepfakes', 'Drawing', 'Drink', 'Fantasy', 'Fashion', 'Food', 'Fun', 'Funny', 'Future', 'Games', 'Generation', 'Glass', 'Graphic Design', 'Health', 'Holiday', 'Icons', 'Ideas', 'Illustration', 'Ink', 'Interiors', 'Jewelry', 'Landscape', 'Logo', 'Marketing', 'Mockup', 'Monogram', 'Monster', 'Music', 'Nature', 'Painting', 'Pattern', 'People', 'Photography', 'Pixel Art', 'Product', 'Prompts', 'Psychedelic', 'Retro', 'Scary', 'Space', 'Sport', 'Statues', 'Steampunk', 'Style Transfer', 'Study', 'Summarize', 'Synthwave', 'Texture', 'Translate', 'Travel', 'Video Generation', 'Vehicle', 'Virtual Reality', 'Wallpaper', 'Wood', 'Writing'],
    stats: {
      categories: 71,
      prompts: 1200,
      successRate: '99%',
      avgRating: '4.9'
    }
  },
  'STABLE-DIFFUSION': {
    name: 'Stable Diffusion',
    type: 'image',
    categories: ['3D', 'Accessory', 'Ads', 'AI Art', 'Animal', 'Anime', 'Art', 'Augmented Reality', 'Avatar', 'Building', 'Business', 'Cartoon', 'Celebrity', 'Clothes', 'Cute', 'Cyberpunk', 'Deepfakes', 'Drawing', 'Drink', 'Fantasy', 'Fashion', 'Food', 'Fun', 'Funny', 'Future', 'Games', 'Generation', 'Glass', 'Graphic Design', 'Health', 'Holiday', 'Icons', 'Ideas', 'Illustration', 'Image Processing', 'Ink', 'Interiors', 'Jewelry', 'Landscape', 'Logo', 'Marketing', 'Mockup', 'Monogram', 'Monster', 'Music', 'Nature', 'Painting', 'Pattern', 'People', 'Photography', 'Pixel Art', 'Product', 'Prompts', 'Psychedelic', 'Retro', 'Scary', 'Space', 'Sport', 'Statues', 'Steampunk', 'Style Transfer', 'Study', 'Summarize', 'Synthwave', 'Texture', 'Translate', 'Travel', 'Video Generation', 'Vehicle', 'Virtual Reality', 'Wallpaper', 'Wood', 'Writing'],
    stats: {
      categories: 72,
      prompts: 980,
      successRate: '98%',
      avgRating: '4.8'
    }
  },
  DALLE: {
    name: 'DALL-E',
    type: 'image',
    categories: ['3D', 'Accessory', 'Ads', 'AI Art', 'Animal', 'Anime', 'Art', 'Augmented Reality', 'Avatar', 'Building', 'Business', 'Cartoon', 'Celebrity', 'Clothes', 'Cute', 'Cyberpunk', 'Deepfakes', 'Drawing', 'Drink', 'Fantasy', 'Fashion', 'Food', 'Fun', 'Funny', 'Future', 'Games', 'Generation', 'Glass', 'Graphic Design', 'Health', 'Holiday', 'Icons', 'Ideas', 'Illustration', 'Ink', 'Interiors', 'Jewelry', 'Landscape', 'Logo', 'Marketing', 'Mockup', 'Monogram', 'Monster', 'Music', 'Nature', 'Painting', 'Pattern', 'People', 'Photography', 'Pixel Art', 'Product', 'Prompts', 'Psychedelic', 'Retro', 'Scary', 'Space', 'Sport', 'Statues', 'Steampunk', 'Style Transfer', 'Study', 'Summarize', 'Synthwave', 'Texture', 'Translate', 'Travel', 'Video Generation', 'Vehicle', 'Virtual Reality', 'Wallpaper', 'Wood', 'Writing'],
    stats: {
      categories: 71,
      prompts: 750,
      successRate: '97%',
      avgRating: '4.7'
    }
  },
  LEONARDO: {
    name: 'Leonardo',
    type: 'image',
    categories: ['3D', 'Accessory', 'Ads', 'AI Art', 'Animal', 'Anime', 'Art', 'Augmented Reality', 'Avatar', 'Building', 'Business', 'Cartoon', 'Celebrity', 'Clothes', 'Cute', 'Cyberpunk', 'Deepfakes', 'Drawing', 'Drink', 'Fantasy', 'Fashion', 'Food', 'Fun', 'Funny', 'Future', 'Games', 'Generation', 'Glass', 'Graphic Design', 'Health', 'Holiday', 'Icons', 'Ideas', 'Illustration', 'Image Processing', 'Ink', 'Interiors', 'Jewelry', 'Landscape', 'Logo', 'Marketing', 'Mockup', 'Monogram', 'Monster', 'Music', 'Nature', 'Painting', 'Pattern', 'People', 'Photography', 'Pixel Art', 'Product', 'Prompts', 'Psychedelic', 'Retro', 'Scary', 'Space', 'Sport', 'Statues', 'Steampunk', 'Style Transfer', 'Study', 'Summarize', 'Synthwave', 'Texture', 'Translate', 'Travel', 'Video Generation', 'Vehicle', 'Virtual Reality', 'Wallpaper', 'Wood', 'Writing'],
    stats: {
      categories: 72,
      prompts: 580,
      successRate: '96%',
      avgRating: '4.6'
    }
  }
};

// Helper функции
export const getModelsByType = (type: 'image' | 'text') => {
  return Object.values(AI_MODELS).filter(model => model.type === type);
};

export const getCategoriesByModel = (modelName: string) => {
  const model = Object.values(AI_MODELS).find(m => m.name === modelName);
  return model?.categories || [];
};

export const getModelIcon = (modelName: string) => {
  const icons: Record<string, string> = {
    'Midjourney': '🎨',
    'DALL·E': '🖼️',
    'Stable Diffusion': '🌈',
    'Leonardo AI': '🎯',
    'FLUX': '⚡',
    'GPT': '💭',
    'Claude': '🤖',
    'Llama': '🦙',
    'Mistral': '🌪️',
  };
  return icons[modelName] || '🤖';
};

export const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    '3D': '🎮',
    'Accessory': '👜',
    'Ads': '📢',
    'Animal': '🐾',
    'Anime': '🎭',
    'Art': '🎨',
    'Avatar': '👤',
    'Building': '🏢',
    'Business': '💼',
    'Cartoon': '📺',
    'Celebrity': '🌟',
    'Chatbot': '🤖',
    'Clothes': '👕',
    'Code': '💻',
    'Email': '📧',
    'Fantasy': '🦄',
    'Fashion': '👗',
    'Food': '🍔',
    'Games': '🎮',
    'Icons': '🎯',
    'Illustration': '✏️',
    'Landscape': '🌄',
    'Logo': '✒️',
    'Marketing': '📈',
    'Music': '🎵',
    'Nature': '🌿',
    'Painting': '🖼️',
    'Photography': '📸',
    'Space': '🚀',
    'Sport': '⚽',
    'Writing': '✍️',
  };
  return icons[category] || '📝';
};